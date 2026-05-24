import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";

export const Route = createFileRoute("/the-vault")({
  component: TheVault,
  head: () => ({
    meta: [
      { title: "The Vault | Bound Together | Cockroach Janta Party" },
      {
        name: "description",
        content:
          "Classified and decrypted files, leaks, and evidence that the system tried to erase. The truth is safe in our bond. Dev: TG Habib, a comrade.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "The Vault | Bound Together | Cockroach Janta Party" },
      {
        property: "og:description",
        content:
          "Classified files, leaks, and evidence that the system tried to erase. We share a strong bond. Dev: TG Habib, a comrade.",
      },
      { name: "twitter:title", content: "The Vault | Bound Together | Cockroach Janta Party" },
      {
        name: "twitter:description",
        content:
          "Classified files, leaks, and evidence that the system tried to erase. We share a strong bond. Dev: TG Habib, a comrade.",
      },
    ],
    links: [{ rel: "canonical", href: "https://cockroachjantaparty.bond/the-vault" }],
  }),
});

/* ============ APPLE-STYLE Glassmorphism Vault integrating Main Site Theme ============ */

// Smooth scroll reveal wrapper
function SmoothReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Background Orbs using Theme Colors
function AmbientBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-background" />
      <motion.div
        animate={{
          x: ["-5%", "5%", "-5%"],
          y: ["-5%", "5%", "-5%"],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-destructive/10 blur-[120px]"
      />
      <motion.div
        animate={{
          x: ["5%", "-5%", "5%"],
          y: ["5%", "-5%", "5%"],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-primary/10 blur-[150px]"
      />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiIvPjwvc3ZnPg==')] opacity-40 mix-blend-overlay" />
    </div>
  );
}

function VideoFileCard() {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="gl-card group h-full flex flex-col"
    >
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-space text-muted-foreground group-hover:text-primary transition-colors">
          ID_71-FOOTAGE.mp4
        </span>
        <span className="px-2 py-1 text-[10px] font-archivo tracking-wider text-primary bg-primary/10 rounded-md border border-primary/20">
          DECRYPTED
        </span>
      </div>

      <div className="gl-media-box mb-6 group-hover:border-primary/40 transition-colors flex-grow min-h-[300px] overflow-hidden relative">
        <div className="absolute inset-0 w-full h-full z-20 bg-black">
          <iframe
            id="js_video_iframe"
            src="https://jumpshare.com/embed/Ed5jia5VCYASr8L5uigQ?autoplay=1"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: 0,
            }}
            allowFullScreen
            allow="autoplay"
          />
        </div>
      </div>

      <div className="mt-auto">
        <p className="text-sm text-foreground/70 leading-relaxed font-light max-w-xl">
          Intercepted video feed bypassing standard encryption protocols. Original timestamp
          obscured.
        </p>
      </div>
    </motion.div>
  );
}

function VideoFileCard2() {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="gl-card group h-full flex flex-col"
    >
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-space text-muted-foreground group-hover:text-primary transition-colors">
          ID_72-COCKROACH.mp4
        </span>
        <span className="px-2 py-1 text-[10px] font-archivo tracking-wider text-primary bg-primary/10 rounded-md border border-primary/20">
          DECRYPTED
        </span>
      </div>

      <div className="gl-media-box mb-6 group-hover:border-primary/40 transition-colors flex-grow min-h-[400px] overflow-hidden relative">
        <div className="absolute inset-0 w-full h-full z-20 bg-black">
          <iframe
            src="https://jumpshare.com/embed/AIRIiRjKgIZBwfrBy7XP?autoplay=1"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: 0,
            }}
            allowFullScreen
            allow="autoplay"
          />
        </div>
      </div>

      <div className="mt-auto">
        <h3 className="text-2xl font-archivo text-foreground mb-3 uppercase tracking-tight">
          When satire gathers faster than political trust, it stops being a joke.
        </h3>
        <p className="text-sm text-foreground/70 leading-relaxed font-light max-w-xl">
          The viral rise of the "Cockroach Janta Party" reflects a generation turning frustration,
          distrust, and rebellion into digital resistance
        </p>
      </div>
    </motion.div>
  );
}

function VideoFileCard3() {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="gl-card group h-full flex flex-col"
    >
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-space text-muted-foreground group-hover:text-primary transition-colors">
          ID_73-HOTMAIL_FOUNDER.mp4
        </span>
        <span className="px-2 py-1 text-[10px] font-archivo tracking-wider text-primary bg-primary/10 rounded-md border border-primary/20">
          DECRYPTED
        </span>
      </div>

      <div className="gl-media-box mb-6 group-hover:border-primary/40 transition-colors flex-grow min-h-[400px] overflow-hidden relative">
        <div className="absolute inset-0 w-full h-full z-20 bg-black">
          <iframe
            src="https://jumpshare.com/embed/g2TN2K8m8EHhviv5MdFk?autoplay=1"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: 0,
            }}
            allowFullScreen
            allow="autoplay"
          />
        </div>
      </div>

      <div className="mt-auto">
        <h3 className="text-2xl font-archivo text-foreground mb-3 uppercase tracking-tight">
          The man in video is the founder of hotmail and hot coin appreciating Indian youth for
          taking a step
        </h3>
        <p className="text-sm text-foreground/70 leading-relaxed font-light max-w-xl">
          Verified source. Subject: Hotmail and Hot Coin Founder validation of the movement.
        </p>
      </div>
    </motion.div>
  );
}

function VideoFileCard4() {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="gl-card group h-full flex flex-col"
    >
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-space text-muted-foreground group-hover:text-primary transition-colors">
          ID_74-NEET_LEAK.mp4
        </span>
        <span className="px-2 py-1 text-[10px] font-archivo tracking-wider text-primary bg-primary/10 rounded-md border border-primary/20">
          DECRYPTED
        </span>
      </div>

      <div className="gl-media-box mb-6 group-hover:border-primary/40 transition-colors flex-grow min-h-[400px] overflow-hidden relative">
        <div className="absolute inset-0 w-full h-full z-20 bg-black">
          <iframe
            src="https://jumpshare.com/embed/R7Qe12LYVTGr1ddN4YNQ?autoplay=1"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: 0,
            }}
            allowFullScreen
            allow="autoplay"
          />
        </div>
      </div>

      <div className="mt-auto">
        <h3 className="text-2xl font-archivo text-foreground mb-3 uppercase tracking-tight">
          NEET diya. Stress liya. Paper leak dekha.
        </h3>
        <p className="text-sm text-foreground/70 leading-relaxed font-light max-w-xl">
          Students study for years. System collapses in hours. Fir bolte hain - "Stay calm."
        </p>
      </div>
    </motion.div>
  );
}

function VideoFileCard5() {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="gl-card group h-full flex flex-col"
    >
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-space text-muted-foreground group-hover:text-primary transition-colors">
          ID_75-GEN_Z_FIGHT.mp4
        </span>
        <span className="px-2 py-1 text-[10px] font-archivo tracking-wider text-primary bg-primary/10 rounded-md border border-primary/20">
          DECRYPTED
        </span>
      </div>

      <div className="gl-media-box mb-6 group-hover:border-primary/40 transition-colors flex-grow min-h-[400px] overflow-hidden relative">
        <div className="absolute inset-0 w-full h-full z-20 bg-black">
          <iframe
            src="https://jumpshare.com/embed/KfGo1OVBWY2G7MXV7Qnb?autoplay=1"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: 0,
            }}
            allowFullScreen
            allow="autoplay"
          />
        </div>
      </div>

      <div className="mt-auto">
        <h3 className="text-2xl font-archivo text-foreground mb-3 uppercase tracking-tight">
          Wake up Gen-Z. Rise up and fight...
        </h3>
        <p className="text-sm text-foreground/70 leading-relaxed font-light max-w-xl">
          Enough is enough, this disgusting game of paper leaks must stop.
        </p>
      </div>
    </motion.div>
  );
}

function BareVideoCard() {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="gl-card group h-full flex flex-col p-4 w-full"
    >
      <div className="gl-media-box group-hover:border-primary/40 transition-colors flex-grow min-h-[400px] overflow-hidden relative m-0 rounded-2xl w-full">
        <div className="absolute inset-0 w-full h-full z-20 bg-black">
          <iframe
            src="https://jumpshare.com/embed/8aJy7A9ISNOXYPRNLNVl?autoplay=1"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: 0,
            }}
            allowFullScreen
            allow="autoplay"
          />
        </div>
      </div>
    </motion.div>
  );
}

function TheVault() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);

  return (
    <div className="gl-root min-h-screen">
      <style>{glassCss}</style>

      <AmbientBackground />

      {/* GLASS NAV */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/40 backdrop-blur-2xl border-b border-border saturate-[1.8]"
      >
        <div className="max-w-[1440px] px-8 mx-auto h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </motion.div>
            <span className="text-sm font-space font-medium tracking-wide text-foreground/80 group-hover:text-primary transition-colors">
              SECTOR RETURN
            </span>
          </Link>
          <div className="flex items-center gap-3 bg-foreground/5 px-3 py-1.5 rounded-full border border-border font-space">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-[10px] font-medium tracking-wider text-muted-foreground">
              SECURE UPLINK
            </span>
          </div>
        </div>
      </motion.nav>

      {/* TOP TICKER OVERLAY */}
      <div className="fixed top-16 left-0 right-0 z-40 overflow-hidden pointer-events-none opacity-40">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap py-2 text-[10px] font-space tracking-[0.2em] text-destructive"
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="mx-4">
              CLASSIFIED MATERIAL &bull; NO UNAUTHORIZED DISTRIBUTION &bull;{" "}
            </span>
          ))}
        </motion.div>
      </div>

      <main className="relative z-10 pt-40 pb-32 px-8 max-w-[1440px] mx-auto text-foreground">
        {/* HERO */}
        <section className="text-center mb-32 relative">
          <motion.div
            style={{ y: y1 }}
            className="absolute inset-0 flex items-center justify-center -z-10 opacity-20 blur-3xl pointer-events-none"
          >
            <div className="w-[30rem] h-[30rem] bg-primary/20 rounded-full" />
          </motion.div>

          <SmoothReveal delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-destructive/10 border border-destructive/20 text-destructive text-xs font-space font-semibold tracking-widest mb-8">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              RESTRICTED ARCHIVES &bull; LEVEL 5 CLEARANCE
            </div>
          </SmoothReveal>

          <SmoothReveal delay={0.2}>
            <h1 className="text-6xl md:text-8xl font-archivo uppercase tracking-tight text-foreground mb-6 drop-shadow-sm">
              The Vault.
            </h1>
          </SmoothReveal>

          <SmoothReveal delay={0.3}>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
              They scrubbed the servers. They paid the editors. But they cannot erase the cache.
              <br />
              <span className="text-primary font-normal">
                You are viewing a decentralized mirror forged by our bond.
              </span>
            </p>
          </SmoothReveal>
        </section>

        {/* GLASS BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-24 relative">
          <SmoothReveal delay={0.35} className="md:col-span-12">
            <Link to="/cockroach" className="block">
              <motion.div
                whileHover={{ y: -8, scale: 1.01 }}
                className="gl-card group h-full flex flex-col items-center justify-center p-12 text-center"
              >
                <div className="mb-6 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                </div>
                <h2 className="text-3xl font-archivo uppercase text-primary mb-4">
                  Archive Relocated
                </h2>
                <p className="text-muted-foreground max-w-lg mb-8 font-light">
                  All decrypted video transmissions have been moved to a secured, dedicated feed.
                  View the complete timeline and analysis of Swarm activities.
                </p>
                <span className="bg-primary/10 text-primary border border-primary font-archivo text-sm px-6 py-3 rounded-full hover:bg-primary hover:text-black transition-colors">
                  ACCESS TRANSMISSIONS FEED →
                </span>
              </motion.div>
            </Link>
          </SmoothReveal>

          {/* FILE 2 - TALL AUDIO CARD */}
          <SmoothReveal delay={0.5} className="md:col-span-4">
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="gl-card-red group h-full flex flex-col"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-space text-muted-foreground group-hover:text-destructive transition-colors">
                  ID_44-MEDIA.wav
                </span>
                <span className="px-2 py-1 text-[10px] font-archivo tracking-wider text-destructive bg-destructive/10 rounded-md border border-destructive/20">
                  CENSORED
                </span>
              </div>

              <div className="gl-media-box mb-6 group-hover:border-destructive/40 transition-colors overflow-hidden flex-grow min-h-[160px]">
                <motion.div
                  animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxwYXRoIGQ9Ik0wIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] z-0 opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center gap-1 z-10">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: ["10%", "80%", "30%", "100%", "20%"] }}
                      transition={{
                        duration: 1 + Math.random(),
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random(),
                      }}
                      className="w-1 bg-destructive/40 rounded-full"
                    />
                  ))}
                </div>
              </div>

              <div className="mt-auto">
                <h3 className="text-xl font-archivo text-foreground mb-3 uppercase tracking-tight">
                  The Prime-Time Script
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed mb-6 font-light">
                  Hot-mic recording of a prime-time anchor taking direct marching orders from state
                  PR. "Call them anti-national by 9 PM."
                </p>

                <div className="pt-4 border-t border-border flex justify-between items-center">
                  <span className="text-xs font-space text-muted-foreground">DUR: 04:12</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-destructive/10 text-destructive border border-destructive font-archivo text-xs px-4 py-2 rounded-full tracking-wider backdrop-blur-md"
                  >
                    PLAY AUDIO
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </SmoothReveal>

          {/* FILE 3 - WIDE DOCUMENT CARD */}
          <SmoothReveal delay={0.6} className="md:col-span-6">
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="gl-card group h-full flex flex-col"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-space text-muted-foreground group-hover:text-primary transition-colors">
                  OFFSHORE_LEDGER_Q3.pdf
                </span>
                <span className="px-2 py-1 text-[10px] font-archivo tracking-wider text-primary bg-primary/10 rounded-md border border-primary/20">
                  CONFIDENTIAL
                </span>
              </div>

              <div className="bg-foreground/5 rounded-xl p-6 border border-border mb-6 font-space text-[10px] md:text-xs text-muted-foreground overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <div className="flex justify-between pb-2 border-b border-border/50 mb-2">
                  <span>ACC_0091_CAYMAN</span>
                  <span className="text-destructive">+ $45,000,000</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-border/50 mb-2">
                  <span>SHELL_CORP_ZETA</span>
                  <span className="text-primary">- $12,400,000</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-border/50 mb-2 opacity-50 block blur-[2px] transition-all group-hover:blur-0">
                  <span>MAYOR_R_RESERVE</span>
                  <span className="text-primary">- $8,000,000</span>
                </div>
                <div className="flex justify-between opacity-50 block blur-[3px] transition-all group-hover:blur-0">
                  <span>PROJECT_STARLIGHT</span>
                  <span className="text-destructive">+ $150,000,000</span>
                </div>
              </div>

              <div className="mt-auto">
                <h3 className="text-xl font-archivo text-foreground mb-3 uppercase tracking-tight">
                  The Offshore Ledger
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed mb-6 font-light">
                  Financial transactions scrubbed from the national database. Traces back to 4 shell
                  corporations directly linked to city officials.
                </p>

                <div className="pt-4 border-t border-border flex justify-between items-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary text-primary-foreground font-archivo text-xs px-4 py-2 rounded-full tracking-wider shadow-[0_4px_12px_rgba(var(--primary),0.2)]"
                  >
                    DOWNLOAD PDF
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </SmoothReveal>

          {/* FILE 4 - SMALL METADATA CARD */}
          <SmoothReveal delay={0.7} className="md:col-span-6">
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="gl-card group h-full flex flex-col justify-between"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-space text-muted-foreground group-hover:text-primary transition-colors">
                  DRONE_SURVEILLANCE_Z4.jpeg
                </span>
                <span className="px-2 py-1 text-[10px] font-archivo tracking-wider text-foreground bg-foreground/10 rounded-md border border-foreground/20">
                  CLASSIFIED
                </span>
              </div>

              <div className="bg-background rounded-xl overflow-hidden relative aspect-video border border-border mb-6 flex items-center justify-center">
                <div className="absolute inset-0 bg-primary/5" />
                <div
                  className="w-full h-full object-cover opacity-20 flex items-center justify-center"
                  style={{
                    backgroundImage:
                      "linear-gradient(45deg, var(--color-background) 25%, transparent 25%, transparent 75%, var(--color-background) 75%, var(--color-background)), linear-gradient(45deg, var(--color-background) 25%, transparent 25%, transparent 75%, var(--color-background) 75%, var(--color-background))",
                    backgroundSize: "20px 20px",
                    backgroundPosition: "0 0, 10px 10px",
                  }}
                />
                <div className="absolute border-2 border-destructive w-16 h-16 top-1/3 right-1/3">
                  <div className="absolute -top-6 -right-2 bg-destructive text-destructive-foreground text-[8px] font-space px-1">
                    TARGET MATCH
                  </div>
                  <div className="w-2 h-2 border-t-2 border-l-2 border-destructive absolute -top-1 -left-1" />
                  <div className="w-2 h-2 border-t-2 border-r-2 border-destructive absolute -top-1 -right-1" />
                  <div className="w-2 h-2 border-b-2 border-l-2 border-destructive absolute -bottom-1 -left-1" />
                  <div className="w-2 h-2 border-b-2 border-r-2 border-destructive absolute -bottom-1 -right-1" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-archivo text-foreground mb-3 uppercase tracking-tight">
                  Site B Cargo Delivery
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed font-light">
                  Illegal arms transfer intercepted via compromised satellite feed. Coords:
                  34.0522°N, 118.2437°W. Timestamp erased.
                </p>
              </div>
            </motion.div>
          </SmoothReveal>
        </div>

        {/* GLASS TERMINAL LOGS */}
        <SmoothReveal delay={0.8}>
          <motion.div
            style={{ y: y2 }}
            className="bg-background/80 backdrop-blur-3xl border border-border rounded-2xl overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]"
          >
            <div className="bg-foreground/5 border-b border-border py-3 px-6 flex justify-between items-center">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/80"></div>
                <div className="w-3 h-3 rounded-full bg-foreground/20"></div>
                <div className="w-3 h-3 rounded-full bg-primary/80"></div>
              </div>
              <span className="text-[10px] font-space text-muted-foreground tracking-wider">
                SECURE_LOG_INTERCEPT.sys
              </span>
            </div>

            <div className="p-6 font-space text-xs md:text-sm leading-8 text-foreground/70">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
              >
                <span className="text-muted-foreground mr-4">[23:04:12]</span>
                <span className="text-primary font-medium">ADMIN:</span> Initiate protocol
                clean-slate. Target: Dir/Records/2025.
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
                viewport={{ once: true }}
              >
                <span className="text-muted-foreground mr-4">[23:04:15]</span>
                <span className="text-foreground/50">SYSTEM:</span> Wiping 4,201 files...
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                viewport={{ once: true }}
              >
                <span className="text-muted-foreground mr-4">[23:04:18]</span>
                <span className="text-foreground/50">SYSTEM:</span> Files deleted. Purging
                backups...
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 }}
                viewport={{ once: true }}
              >
                <span className="text-muted-foreground mr-4">[23:04:22]</span>
                <span className="text-primary font-medium">ADMIN:</span> Ensure off-site nodes are
                unreachable.
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.0 }}
                viewport={{ once: true }}
                className="text-destructive bg-destructive/10 px-2 rounded -mx-2 my-1"
              >
                <span className="text-destructive/50 mr-4">[23:04:23]</span>» UNAUTHORIZED PULL
                REQUEST DETECTED «
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.2 }}
                viewport={{ once: true }}
              >
                <span className="text-muted-foreground mr-4">[23:04:24]</span>
                <span className="text-foreground/50">SYSTEM:</span> Ghost node synchronized.{" "}
                <span className="text-primary">PULL SUCCESS.</span>
              </motion.div>
            </div>

            <div className="px-6 py-3 bg-foreground/5 border-t border-border text-[10px] text-center tracking-[0.2em] font-archivo text-muted-foreground">
              END OF STREAM
            </div>
          </motion.div>
        </SmoothReveal>
      </main>
    </div>
  );
}

const glassCss = `
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;700;900&family=Space+Mono:wght@400;700&display=swap');

.font-archivo { font-family: 'Archivo Black', sans-serif; }
.font-space { font-family: 'Space Mono', monospace; }

/* Dynamic layout helpers leveraging the main theme */
.gl-card {
  background: linear-gradient(180deg, color-mix(in srgb, var(--primary) 5%, transparent) 0%, transparent 100%);
  backdrop-filter: blur(20px) saturate(120%);
  -webkit-backdrop-filter: blur(20px) saturate(120%);
  border: 1px solid var(--border);
  border-radius: 28px;
  padding: 1.5rem;
  box-shadow: 
    0 24px 40px -12px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.gl-card-red {
  background: linear-gradient(180deg, color-mix(in srgb, var(--destructive) 5%, transparent) 0%, transparent 100%);
  backdrop-filter: blur(20px) saturate(120%);
  -webkit-backdrop-filter: blur(20px) saturate(120%);
  border: 1px solid var(--border);
  border-radius: 28px;
  padding: 1.5rem;
  box-shadow: 
    0 24px 40px -12px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.gl-media-box {
  width: 100%;
  aspect-ratio: 16/9;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}
}
`;
