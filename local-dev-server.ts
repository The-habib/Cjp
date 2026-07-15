import express from "express";
import path from "path";
import fs from "fs";
import { cjpVideos } from "./src/data/videos";
import helmet from "helmet";
import compression from "compression";

async function startServer() {
  const app = express();
  const PORT = 3000;

  const isProd = process.env.NODE_ENV === "production";

  app.use(compression());
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    }),
  );

  let vite: import("vite").ViteDevServer | undefined;
  if (!isProd) {
    const { createServer: createViteServer } = await import("vite");
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
  }

  app.get("/robots.txt", (req, res) => {
    res.type("text/plain");
    res.send(`User-agent: *
Allow: /
Sitemap: https://cockroachjantaparty.bond/sitemap.xml`);
  });

  app.get("/sitemap.xml", (req, res) => {
    const siteUrl = "https://cockroachjantaparty.bond";

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>${siteUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteUrl}/the-vault</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${siteUrl}/cockroach</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`;

    cjpVideos.forEach((video) => {
      xml += `
  <url>
    <loc>${siteUrl}/cockroach/${video.id}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <video:video>
      <video:thumbnail_loc>${siteUrl}/og-${video.id}.jpg</video:thumbnail_loc>
      <video:title><![CDATA[${video.title}]]></video:title>
      <video:description><![CDATA[${video.description}]]></video:description>
      <video:content_loc>${video.embedUrl}</video:content_loc>
      <video:publication_date>${video.date}T00:00:00Z</video:publication_date>
    </video:video>
  </url>`;
    });

    xml += `\n</urlset>`;

    res.type("application/xml");
    res.send(xml);
  });

  app.use(async (req, res, next) => {
    if (req.method !== "GET") return next();
    try {
      const url = req.originalUrl;
      if (isProd) {
        return res.sendFile(path.resolve(process.cwd(), "dist", "index.html"));
      }

      let template = fs.readFileSync(path.resolve(process.cwd(), "index.html"), "utf-8");
      template = await vite.transformIndexHtml(url, template);

      const siteUrl = "https://cockroachjantaparty.bond";

      let title = "Cockroach Janta Party | We Are Bound";
      let desc =
        "Voice of the Lazy & Unemployed. We share a strong bond. Five demands. Zero sponsors.";
      let imageUrl = `${siteUrl}/og-image.jpg`;
      let ogUrl = `${siteUrl}/`;

      let jsonLd = "";

      if (url === "/cockroach" || url === "/cockroach/") {
        title = "Cockroach Media | Uncensored Truth - CJP";
        desc = "Raw, uncut truth the media won't show you. Watch the videos they tried to hide.";
        imageUrl = `${siteUrl}/og-image.jpg`;
        ogUrl = `${siteUrl}/cockroach`;
      } else if (url.startsWith("/cockroach/")) {
        const videoId = url.split("/")[2];
        const video = cjpVideos.find((v) => v.id === videoId);
        if (video) {
          title = `${video.title} | Cockroach Media`;
          desc = video.description.replace(/\n/g, " ").substring(0, 150);
          imageUrl = `${siteUrl}/og-${video.id}.jpg`;
          ogUrl = `${siteUrl}/cockroach/${video.id}`;

          jsonLd = `
            <script type="application/ld+json">
            {
              "@context": "https://schema.org",
              "@type": "VideoObject",
              "name": "${video.title}",
              "description": "${video.description.replace(/\n/g, " ")}",
              "thumbnailUrl": "${imageUrl}",
              "uploadDate": "${video.date}T00:00:00Z",
              "embedUrl": "${video.embedUrl}",
              "url": "${ogUrl}"
            }
            </script>
          `;
        }
      }

      if (!jsonLd && url === "/") {
        jsonLd = `
          <script type="application/ld+json">
          {
            "@context": "https://schema.org",
            "@type": "PoliticalParty",
            "name": "Cockroach Janta Party",
            "url": "https://cockroachjantaparty.bond",
            "logo": "https://cockroachjantaparty.bond/og-image.jpg",
            "description": "Voice of the Lazy & Unemployed. We share a strong bond. Five demands. Zero sponsors."
          }
          </script>
        `;
      }

      const metaInjection = `
        <title>${title}</title>
        <meta name="description" content="${desc}" />
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${desc}" />
        <meta property="og:url" content="${ogUrl}" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="${imageUrl}" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${title}" />
        <meta name="twitter:description" content="${desc}" />
        <meta name="twitter:image" content="${imageUrl}" />
        ${jsonLd}
      `;

      let html = template
        .replace(/<title>.*?<\/title>/g, "")
        .replace(/<meta property="og:[^>]*>/g, "")
        .replace(/<meta name="twitter:[^>]*>/g, "")
        .replace(/<meta name="description"[^>]*>/g, "");

      html = html.replace("</head>", `${metaInjection}</head>`);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e: unknown) {
      if (!isProd && vite && e instanceof Error) {
        vite.ssrFixStacktrace(e);
      }
      console.error(e instanceof Error ? e.stack : e);
      res.status(500).end("Internal Server Error");
    }
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
