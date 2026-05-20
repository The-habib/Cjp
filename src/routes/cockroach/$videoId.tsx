import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { cjpVideos } from "../../data/videos";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowLeft, Share2, Info } from "lucide-react";
import React from "react";

export const Route = createFileRoute("/cockroach/$videoId")({
  loader: ({ params }) => {
    return cjpVideos.find((v) => v.id === params.videoId) || null;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Not Found | CJP" },
          { name: "description", content: "Transmission not found." }
        ]
      };
    }
    const video = loaderData;
    return {
      meta: [
        { title: `${video.title} | Cockroach Media` },
        { name: "description", content: video.description.substring(0, 150) },
        { property: "og:title", content: `${video.title} | Cockroach Media` },
        { property: "og:description", content: video.description.substring(0, 150) },
        { property: "og:type", content: "video.other" },
        { property: "og:site_name", content: "Cockroach Janta Party" },
        { property: "og:url", content: `https://cockroachjantaparty.bond/cockroach/${video.id}` },
        { property: "og:image", content: `https://cockroachjantaparty.bond/og-${video.id}.jpg` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${video.title} | Cockroach Media` },
        { name: "twitter:description", content: video.description.substring(0, 150) },
        { name: "twitter:image", content: `https://cockroachjantaparty.bond/og-${video.id}.jpg` },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": video.title,
            "description": video.description.replace(/\n/g, " "),
            "thumbnailUrl": `https://cockroachjantaparty.bond/og-${video.id}.jpg`,
            "uploadDate": `${video.date}T00:00:00Z`,
            "embedUrl": video.embedUrl,
            "url": `https://cockroachjantaparty.bond/cockroach/${video.id}`
          }),
        },
      ]
    };
  },
  component: CockroachDeepDive,
});

function CockroachDeepDive() {
  const { videoId } = Route.useParams();
  const video = cjpVideos.find((v) => v.id === videoId);

  const { scrollYProgress } = useScroll();
  const yOff = useTransform(scrollYProgress, [0, 1], [0, 200]);

  if (!video) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono">
        <h1>404 | TRANSMISSION NOT FOUND</h1>
      </div>
    );
  }

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${video.title} | Cockroach Media`,
          text: video.description.replace(/\\n/g, " ").substring(0, 100) + "...",
          url: url,
        });
      } catch (err: any) {
        if (err.name !== "AbortError") console.error("Error sharing", err);
      }
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="cr-dive-page min-h-screen relative overflow-hidden selection:bg-lime-500 selection:text-black">
      <div className="cr-dive-grain"></div>

      <nav className="cr-dive-nav">
        <Link to="/cockroach" className="cr-dive-back">
          <ArrowLeft size={18} />
          <span>BACK TO ALL VIDEOS</span>
        </Link>
        <div className="cr-dive-badge">{video.id.toUpperCase()}</div>
      </nav>

      <main className="cr-dive-container max-w-[1200px] mx-auto px-6 pt-24 md:pt-32 pb-24 relative z-10">
        <header className="mb-8 md:mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="cr-dive-tag">{video.source}</span>
            <span className="cr-dive-date text-sm font-mono text-gray-500">{video.date}</span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="cr-dive-title"
          >
            {video.title}
          </motion.h1>
        </header>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="cr-dive-media-wrapper mb-12"
        >
          <div className="cr-dive-media">
            <iframe
              src={video.embedUrl}
              frameBorder="0"
              allowFullScreen
              allow="webkitallowfullscreen mozallowfullscreen allowfullscreen"
            ></iframe>
          </div>
          <div className="cr-dive-media-footer">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span>UNCENSORED FOOTAGE</span>
            </div>
            <button className="cr-dive-action-btn" onClick={handleShare}>
              <Share2 size={16} /> SHARE
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-8">
            <div className="cr-dive-content-card">
              <h3 className="cr-dive-h3 flex items-center gap-2">
                <Info size={20} style={{ color: "var(--lime)" }} />
                The Real Story
              </h3>
              <div className="cr-dive-prose">
                <p>
                  {video.description.split("\\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
                <p>
                  We are sharing this uncut video to show the gap between the rich leaders and the struggling people. 
                  Every clip here proves the power of the people they step on.
                </p>
                <blockquote>
                  "When you live in the dirt, you see exactly how dirty the system is."
                </blockquote>
                <p>
                  Share this video. The paid media tries to hide this truth. We rely on the swarm to spread the word.
                </p>
              </div>
            </div>
          </div>
          <div className="md:col-span-4">
            <div className="cr-dive-sidebar">
              <h3 className="cr-dive-h3">Video Details</h3>
              <ul className="cr-dive-meta-list">
                <li>
                  <strong>Topic:</strong> Accountability
                </li>
                <li>
                  <strong>Location:</strong> Classified
                </li>
                <li>
                  <strong>Status:</strong> Exposed
                </li>
                <li>
                  <strong>Censorship:</strong> Broken
                </li>
              </ul>

              <hr className="my-8 border-white/10" />

              <h3 className="cr-dive-h3">What You Can Do</h3>
              <div className="flex flex-col gap-4">
                <Link to="/cockroach" className="cr-dive-sidebar-link">
                  Watch More Truth →
                </Link>
                <Link to="/#join" className="cr-dive-sidebar-link">
                  Join The Swarm →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style>{crDiveCss}</style>
    </div>
  );
}

const crDiveCss = `
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;700;900&family=Space+Mono:wght@400;700&display=swap');

.cr-dive-page {
  --ink: #050505;
  --paper: #f5f5f5;
  --lime: #c8ff00;
  --grey: #1a1a1a;
  --border: rgba(255, 255, 255, 0.1);
  background: var(--ink);
  color: var(--paper);
  font-family: 'Inter', sans-serif;
}

.cr-dive-grain {
  position: fixed; inset: 0; pointer-events: none; z-index: 1; opacity: 0.08;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.35'/></svg>");
}

.cr-dive-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 50;
  display: flex; justify-content: space-between; align-items: center;
  padding: 1.5rem 2rem;
  background: linear-gradient(to bottom, rgba(5,5,5,0.9), transparent);
  backdrop-filter: blur(8px);
}

.cr-dive-back {
  display: flex; align-items: center; gap: 0.5rem;
  font-family: 'Space Mono', monospace; font-size: 0.8rem; font-weight: bold;
  color: var(--lime);
  text-transform: uppercase; letter-spacing: 0.05em;
  transition: transform 0.2s, opacity 0.2s;
}
.cr-dive-back:hover { opacity: 0.8; transform: translateX(-4px); }

.cr-dive-badge {
  background: rgba(255,255,255,0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
}

.cr-dive-tag {
  background: var(--lime);
  color: var(--ink);
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.cr-dive-title {
  font-family: 'Archivo Black', sans-serif;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  line-height: 1.05;
  text-transform: uppercase;
  letter-spacing: -0.02em;
}

.cr-dive-media-wrapper {
  background: #0a0a0a;
  border: 4px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
}

.cr-dive-media {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  background: #000;
}

.cr-dive-media iframe {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
}

.cr-dive-media-footer {
  display: flex; justify-content: space-between; align-items: center;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--border);
  font-family: 'Space Mono', monospace;
  font-size: 0.85rem;
  background: #111;
}

.cr-dive-action-btn {
  display: flex; align-items: center; gap: 0.5rem;
  background: transparent;
  color: white;
  border: 1px solid var(--border);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.2s;
  cursor: pointer;
}
.cr-dive-action-btn:hover {
  background: white; color: black;
}

.cr-dive-h3 {
  font-family: 'Space Mono', monospace;
  font-weight: bold;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.75rem;
}

.cr-dive-content-card {
  background: #0a0a0a;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 2.5rem;
}

.cr-dive-prose {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #ddd;
}
.cr-dive-prose p { margin-bottom: 1.5rem; }
.cr-dive-prose blockquote {
  border-left: 4px solid var(--lime);
  padding-left: 1.5rem;
  margin: 2rem 0;
  font-family: 'Space Mono', monospace;
  font-style: italic;
  font-size: 1.2rem;
  color: white;
}

.cr-dive-sidebar {
  background: #0a0a0a;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 2rem;
}

.cr-dive-meta-list {
  list-style: none; padding: 0; margin: 0;
  font-family: 'Space Mono', monospace;
  font-size: 0.9rem;
}
.cr-dive-meta-list li {
  margin-bottom: 1rem;
  display: flex; justify-content: space-between;
  border-bottom: 1px dashed var(--border);
  padding-bottom: 0.5rem;
}
.cr-dive-meta-list strong { color: #888; }

.cr-dive-sidebar-link {
  display: block;
  padding: 1rem;
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--border);
  border-radius: 4px;
  font-family: 'Space Mono', monospace;
  font-size: 0.9rem;
  text-transform: uppercase;
  transition: all 0.2s;
}
.cr-dive-sidebar-link:hover {
  background: var(--lime);
  color: black;
  border-color: var(--lime);
}

@media (max-width: 768px) {
  .cr-dive-content-card, .cr-dive-sidebar { padding: 1.5rem; }
  .cr-dive-nav { padding: 1rem; }
}
`;
