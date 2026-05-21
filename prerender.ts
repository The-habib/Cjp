import fs from "fs";
import path from "path";
import { cjpVideos, VideoData } from "./src/data/videos.js";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./src/firebase.js";

const siteUrl = "https://cockroachjantaparty.bond";

function getMetaTags(url: string, allVideos: VideoData[]) {
  let title = "Cockroach Janta Party | We Are Bound";
  let desc = "Voice of the Lazy & Unemployed. We share a strong bond. Five demands. Zero sponsors.";
  let imageUrl = `${siteUrl}/og-image.jpg`;
  let ogUrl = `${siteUrl}${url}`;
  let jsonLd = "";

  if (url === "/cockroach" || url === "/cockroach/") {
    title = "Cockroach Media | Uncensored Truth - CJP";
    desc = "Raw, uncut truth the media won't show you. Watch the videos they tried to hide.";
    imageUrl = `${siteUrl}/og-image.jpg`;
    ogUrl = `${siteUrl}/cockroach`;
  } else if (url.startsWith("/cockroach/")) {
    const videoId = url.split("/")[2];
    const video = allVideos.find((v) => v.id === videoId);
    if (video) {
      title = `${video.title} | Cockroach Media`;
      desc = (video.description || "").replace(/\n/g, " ").substring(0, 150);
      imageUrl = video.thumbnailUrl || `${siteUrl}/og-${video.id}.jpg`;
      ogUrl = `${siteUrl}/cockroach/${video.id}`;

      jsonLd = `
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          "name": "${video.title}",
          "description": "${(video.description || "").replace(/\n/g, " ").replace(/"/g, '\\"')}",
          "thumbnailUrl": "${imageUrl}",
          "uploadDate": "${video.date}T00:00:00Z",
          "embedUrl": "${video.embedUrl}",
          "url": "${ogUrl}"
        }
        </script>
      `;
    }
  }

  if (!jsonLd && (url === "/" || url === "")) {
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

  return `
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
}

async function generateStatic() {
  console.log("Generating static files for SEO...");

  let dynamicVideos: VideoData[] = [];
  try {
    const snap = await getDocs(collection(db, "videos"));
    dynamicVideos = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as VideoData[];
  } catch (err) {
    console.error("Failed to load dynamic media during prerender", err);
  }

  const allVideos = [...cjpVideos, ...dynamicVideos];

  const distPath = path.join(process.cwd(), "dist");
  const templatePath = path.join(distPath, "index.html");

  if (!fs.existsSync(templatePath)) {
    console.error("No index.html found in dist. Run vite build first.");
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, "utf-8");

  const cleanTemplate = template
    .replace(/<title>.*?<\/title>/g, "")
    .replace(/<meta property="og:[^>]*>/g, "")
    .replace(/<meta name="twitter:[^>]*>/g, "")
    .replace(/<meta name="description"[^>]*>/g, "");

  const routes = ["/", "/the-vault", "/cockroach", ...allVideos.map((v) => `/cockroach/${v.id}`)];

  routes.forEach((route) => {
    const meta = getMetaTags(route, allVideos);
    const html = cleanTemplate.replace("</head>", `${meta}\n</head>`);

    // Create directory for route if it's not root
    if (route !== "/") {
      const routeDir = path.join(distPath, route.substring(1));
      if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
      }
      fs.writeFileSync(path.join(routeDir, "index.html"), html);
      console.log(`✓ Generated ${route}/index.html`);
    } else {
      // Overwrite main dist/index.html
      fs.writeFileSync(templatePath, html);
      console.log(`✓ Generated /index.html`);
    }
  });

  // Generate robots.txt
  fs.writeFileSync(
    path.join(distPath, "robots.txt"),
    `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`,
  );
  console.log("✓ Generated robots.txt");

  // Generate sitemap.xml
  const now = new Date().toISOString().split("T")[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteUrl}/the-vault</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${siteUrl}/cockroach</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`;

  allVideos.forEach((video) => {
    xml += `
  <url>
    <loc>${siteUrl}/cockroach/${video.id}</loc>
    <lastmod>${video.date || now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <video:video>
      <video:thumbnail_loc>${video.thumbnailUrl || `${siteUrl}/og-${video.id}.jpg`}</video:thumbnail_loc>
      <video:title><![CDATA[${video.title}]]></video:title>
      <video:description><![CDATA[${(video.description || "").substring(0, 200)}]]></video:description>
      <video:content_loc>${video.embedUrl}</video:content_loc>
      <video:publication_date>${video.date || now}T00:00:00Z</video:publication_date>
    </video:video>
  </url>`;
  });

  xml += `\n</urlset>`;
  fs.writeFileSync(path.join(distPath, "sitemap.xml"), xml);
  console.log("✓ Generated sitemap.xml");
  process.exit(0);
}

generateStatic();
