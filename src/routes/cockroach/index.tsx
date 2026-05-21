import { createFileRoute, Link } from "@tanstack/react-router";
import { cjpVideos, VideoData } from "../../data/videos";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowLeft, PlayCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";

export const Route = createFileRoute("/cockroach/")({
  component: CockroachFeed,
  head: () => ({
    meta: [
      { title: "Cockroach Media | Uncensored Truth - CJP" },
      {
        name: "description",
        content: "Raw, uncut truth the media won't show you. Watch the videos they tried to hide.",
      },
      { property: "og:title", content: "Cockroach Media | Uncensored Truth - CJP" },
      {
        property: "og:description",
        content: "Raw, uncut truth the media won't show you. Watch the videos they tried to hide.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Cockroach Janta Party" },
      { property: "og:url", content: "https://cockroachjantaparty.bond/cockroach" },
      { property: "og:image", content: "https://cockroachjantaparty.bond/og-media.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Cockroach Media | Uncensored Truth" },
      {
        name: "twitter:description",
        content: "Raw, uncut truth the media won't show you. Watch the videos they tried to hide.",
      },
      { name: "twitter:image", content: "https://cockroachjantaparty.bond/og-media.jpg" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Cockroach Media | Uncensored Truth",
          description:
            "Raw, uncut truth the media won't show you. Watch the videos they tried to hide.",
          url: "https://cockroachjantaparty.bond/cockroach",
        }),
      },
    ],
  }),
});

function CockroachFeed() {
  const { scrollYProgress } = useScroll();
  const yOff = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const [dynamicVideos, setDynamicVideos] = useState<VideoData[]>([]);

  useEffect(() => {
    const fetchDynamicVideos = async () => {
      try {
        const colRef = collection(db, "videos");
        const q = query(colRef, orderBy("date", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as VideoData[];
        setDynamicVideos(data);
      } catch (e) {
        console.error("Failed to load dynamic media", e);
      }
    };
    fetchDynamicVideos();
  }, []);

  const allVideos = [...dynamicVideos, ...cjpVideos];

  return (
    <div className="cr-feed-page min-h-screen relative overflow-hidden">
      <div className="cr-feed-bg" style={{ y: yOff as any }}></div>
      <div className="cr-feed-grain"></div>

      <nav className="cr-feed-nav">
        <Link to="/" className="cr-feed-back">
          <ArrowLeft size={18} />
          <span>BACK HOME</span>
        </Link>
        <div className="cr-feed-nav-brand">COCKROACH MEDIA</div>
      </nav>

      <main className="cr-feed-container max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10">
        <header className="mb-16 md:mb-24">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="cr-feed-title"
          >
            VOICES
            <br />
            <span className="cr-text-lime tracking-tighter">OF THE SWARM</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="cr-feed-subtitle"
          >
            Raw, uncut truth the paid media refuses to show. Pick a video to see what really
            happened.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allVideos.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link to={`/cockroach/${video.id}`} className="cr-video-card group">
                <div className="cr-video-card-inner">
                  <div className="cr-video-card-media font-mono">
                    <iframe
                      src={video.embedUrl}
                      className="cr-iframe"
                      frameBorder="0"
                      allowFullScreen
                      allow="webkitallowfullscreen mozallowfullscreen allowfullscreen"
                    />
                    <div className="cr-video-overlay absolute inset-0 z-10 hidden md:flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm pointer-events-none">
                      <div className="cr-video-play flex flex-col items-center gap-2 cr-text-lime">
                        <PlayCircle size={48} />
                        <span className="font-bold tracking-widest text-xs uppercase">
                          WATCH FULL PIECE
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="cr-video-card-body">
                    <div className="cr-video-meta">
                      <span>{video.date}</span>
                      <span className="cr-video-badge">{video.source}</span>
                    </div>
                    <h2 className="cr-video-title">{video.title}</h2>
                    <p className="cr-video-desc line-clamp-2">{video.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>

      <style>{crFeedCss}</style>
    </div>
  );
}

const crFeedCss = `
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;700;900&family=Space+Mono:wght@400;700&display=swap');

.cr-text-lime { color: var(--lime); }

.cr-feed-page {
  --ink: #050505;
  --paper: #f5f5f5;
  --lime: #c8ff00;
  --grey: #1a1a1a;
  --border: rgba(255, 255, 255, 0.1);
  background: var(--ink);
  color: var(--paper);
  font-family: 'Inter', sans-serif;
}

.cr-feed-grain {
  position: fixed; inset: 0; pointer-events: none; z-index: 1; opacity: 0.08;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.35'/></svg>");
}

.cr-feed-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 50;
  display: flex; justify-content: space-between; align-items: center;
  padding: 1.5rem 2rem;
  background: linear-gradient(to bottom, rgba(5,5,5,0.9), transparent);
}

.cr-feed-back {
  display: flex; align-items: center; gap: 0.5rem;
  font-family: 'Space Mono', monospace; font-size: 0.8rem; font-weight: bold;
  color: var(--lime);
  text-transform: uppercase; letter-spacing: 0.05em;
  transition: transform 0.2s, opacity 0.2s;
}
.cr-feed-back:hover { opacity: 0.8; transform: translateX(-4px); }

.cr-feed-nav-brand {
  font-family: 'Space Mono', monospace; font-size: 0.75rem; 
  letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.4);
}

.cr-feed-title {
  font-family: 'Archivo Black', sans-serif;
  font-size: clamp(3rem, 8vw, 6rem);
  line-height: 0.85;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
}

.cr-feed-subtitle {
  font-family: 'Space Mono', monospace;
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  color: #888;
  max-width: 600px;
  border-left: 3px solid var(--lime);
  padding-left: 1rem;
}

.cr-video-card {
  display: block;
}

.cr-video-card-inner {
  background: #0a0a0a;
  border: 2px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  height: 100%;
  display: flex; flex-direction: column;
}

.cr-video-card-inner:hover {
  border-color: var(--lime);
  transform: translateY(-8px);
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.8), 0 0 20px rgba(200, 255, 0, 0.1);
}

.cr-video-card-media {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  background: #000;
  border-bottom: 1px solid var(--border);
}

.cr-video-card-media .cr-iframe {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: auto; /* allow clicking on iframe if they want */
}

/* Intercept pointer events on md screens so they click the card to go to deep dive */
@media (min-width: 768px) {
  .cr-video-card { cursor: pointer; }
}

.cr-video-card-body {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex; flex-direction: column;
}

.cr-video-meta {
  display: flex; justify-content: space-between; align-items: center;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: #666;
  margin-bottom: 1rem;
}

.cr-video-badge {
  background: rgba(200, 255, 0, 0.1);
  color: var(--lime);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
}

.cr-video-title {
  font-family: 'Archivo Black', sans-serif;
  font-size: 1.4rem;
  line-height: 1.1;
  margin: 0 0 0.75rem;
  text-transform: uppercase;
  color: var(--paper);
}

.cr-video-desc {
  font-size: 0.95rem;
  color: #aaa;
  line-height: 1.5;
  margin-top: auto;
}
`;
