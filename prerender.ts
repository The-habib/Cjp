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
  let ogType = "website";

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
      ogType = "article";

      jsonLd = `
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "${video.title.replace(/"/g, '\\"')}",
          "description": "${(video.description || "").replace(/\n/g, " ").replace(/"/g, '\\"').substring(0, 160)}",
          "image": "${imageUrl}",
          "datePublished": "${video.date || new Date().toISOString().split("T")[0]}T00:00:00Z",
          "dateModified": "${video.date || new Date().toISOString().split("T")[0]}T00:00:00Z",
          "author": {
            "@type": "Organization",
            "name": "Cockroach Janta Party"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Cockroach Janta Party",
            "logo": {
              "@type": "ImageObject",
              "url": "${siteUrl}/og-image.jpg"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "${ogUrl}"
          },
          "video": {
            "@type": "VideoObject",
            "name": "${video.title.replace(/"/g, '\\"')}",
            "description": "${(video.description || "").replace(/\n/g, " ").replace(/"/g, '\\"').substring(0, 160)}",
            "thumbnailUrl": "${imageUrl}",
            "uploadDate": "${video.date || new Date().toISOString().split("T")[0]}T00:00:00Z",
            "contentUrl": "${video.embedUrl}"
          }
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
        "description": "Voice of the Lazy & Unemployed. We share a strong bond. Five demands. Zero sponsors.",
        "sameAs": [
          "https://www.youtube.com/@cjp2029",
          "https://twitter.com/cjp2029",
          "https://www.instagram.com/cockroachjantaparty"
        ]
      }
      </script>
    `;
  }

  if (!jsonLd && (url === "/cockroach" || url === "/cockroach/")) {
    jsonLd = `
      <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Cockroach Media | Uncensored Truth",
        "url": "https://cockroachjantaparty.bond/cockroach",
        "description": "Raw, uncut truth the media won't show you. Watch the videos they tried to hide."
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
    <meta property="og:type" content="${ogType}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${desc}" />
    <meta name="twitter:image" content="${imageUrl}" />
    <link rel="canonical" href="${ogUrl}" />
    <link rel="alternate" hreflang="en" href="${ogUrl}" />
    <link rel="alternate" hreflang="x-default" href="${ogUrl}" />
    <link rel="preconnect" href="https://res.cloudinary.com" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
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
    let html = cleanTemplate.replace("</head>", `${meta}\n</head>`);

    // Inject SEO-visible Static Previews for bots (React will replace this on hydration)
    let staticContent = "";
    if (route === "/cockroach" || route === "/cockroach/") {
      staticContent = `
        <main>
          <h1>Cockroach Media | Uncensored Truth</h1>
          <p>Raw, uncut truth the media won't show you. Watch the videos they tried to hide.</p>
          <div class="video-feed">
            ${allVideos
              .map(
                (v) => `
              <article>
                <h2>${v.title}</h2>
                <a href="/cockroach/${v.id}">
                  <img src="${v.thumbnailUrl || `${siteUrl}/og-${v.id}.jpg`}" alt="${v.title}" width="1280" height="720" loading="lazy" />
                </a>
                <p>${v.description}</p>
                <time datetime="${v.date || new Date().toISOString().split("T")[0]}">${v.date}</time>
              </article>
            `,
              )
              .join("")}
          </div>
        </main>
      `;
    } else if (route.startsWith("/cockroach/")) {
      const videoId = route.split("/")[2];
      const video = allVideos.find((v) => v.id === videoId);
      if (video) {
        staticContent = `
          <main>
            <article>
              <header>
                <h1>${video.title}</h1>
                <time datetime="${video.date || new Date().toISOString().split("T")[0]}">${video.date}</time>
              </header>
              <figure>
                <img src="${video.thumbnailUrl || `${siteUrl}/og-${video.id}.jpg`}" alt="Video thumbnail for ${video.title}" width="1280" height="720" />
              </figure>
              <section>
                <p>${video.description}</p>
              </section>
            </article>
          </main>
        `;
      }
    } else if (route === "/") {
      staticContent = `
         <main>
           <h1>Cockroach Janta Party</h1>
           <p>Voice of the Lazy & Unemployed. We share a strong bond. Five demands. Zero sponsors.</p>
           <nav>
             <a href="/cockroach">Enter Cockroach Media</a>
           </nav>
         </main>
       `;
    }

    if (staticContent) {
      html = html.replace(
        '<div id="root"></div>',
        `<div id="root">\n<!-- SEO STATIC PREVIEW -->\n<div class="seo-preview">${staticContent}</div>\n</div>`,
      );
    }

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
    `User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: ${siteUrl}/sitemap.xml\n`,
  );
  console.log("✓ Generated robots.txt");

  // Generate sitemap.xml
  const now = new Date().toISOString().split("T")[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
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
    const videoThumbnail = video.thumbnailUrl || `${siteUrl}/og-${video.id}.jpg`;
    xml += `
  <url>
    <loc>${siteUrl}/cockroach/${video.id}</loc>
    <lastmod>${video.date || now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <image:image>
      <image:loc>${videoThumbnail}</image:loc>
      <image:title><![CDATA[${video.title}]]></image:title>
    </image:image>
    <video:video>
      <video:thumbnail_loc>${videoThumbnail}</video:thumbnail_loc>
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

  // Generate RSS Feed (feed.xml)
  let rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
<channel>
  <title>Cockroach Janta Party Feed</title>
  <link>${siteUrl}</link>
  <description>Voice of the Lazy &amp; Unemployed. Raw, uncut truth.</description>
  <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
  <language>en-us</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`;

  allVideos.slice(0, 20).forEach((video) => {
    const videoDate = video.date ? new Date(video.date).toUTCString() : new Date().toUTCString();
    rss += `
  <item>
    <title><![CDATA[${video.title}]]></title>
    <link>${siteUrl}/cockroach/${video.id}</link>
    <guid isPermaLink="true">${siteUrl}/cockroach/${video.id}</guid>
    <pubDate>${videoDate}</pubDate>
    <description><![CDATA[${(video.description || "").replace(/\n/g, "<br>")}]]></description>
    <media:content url="${video.embedUrl}" medium="video">
      <media:title><![CDATA[${video.title}]]></media:title>
      <media:description><![CDATA[${(video.description || "").substring(0, 200)}]]></media:description>
      <media:thumbnail url="${video.thumbnailUrl || `${siteUrl}/og-${video.id}.jpg`}" />
    </media:content>
  </item>`;
  });

  rss += `
</channel>
</rss>`;
  fs.writeFileSync(path.join(distPath, "feed.xml"), rss);
  console.log("✓ Generated feed.xml (RSS)");

  // Generate a dedicated 404.html page for Vercel/Netlify fallbacks
  fs.writeFileSync(
    path.join(distPath, "404.html"),
    template.replace(
      '<div id="root"></div>',
      `<div id="root">\n<!-- SEO 404 -->\n<div class="seo-preview"><main><h1>404 - Not Found</h1><p>The requested transmission does not exist.</p></main></div>\n</div>`,
    ),
  );
  console.log("✓ Generated 404.html");

  process.exit(0);
}

generateStatic();
