import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, MotionStyle } from "motion/react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Cockroach Janta Party | We Are Bound — Voice of the Lazy & Unemployed" },
      {
        name: "description",
        content:
          "A political party for the people the system forgot to count. We share a strong bond. Five demands. Zero sponsors. We are bound to the truth. Founder: Abhijeet Dipke. Dev: TG Habib, a comrade.",
      },
      {
        name: "keywords",
        content:
          "Cockroach Janta Party, CJP, Indian political party, satirical political party India, Voice of the Lazy and Unemployed, TG Habib, bond, bound to CJP, cockroachjantaparty.bond",
      },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { name: "author", content: "Cockroach Janta Party" },
      { name: "theme-color", content: "#0d1a12" },
      { property: "og:title", content: "Cockroach Janta Party (CJP) | Bound Together" },
      {
        property: "og:description",
        content:
          "Voice of the Lazy & Unemployed. We share a strong bond. Five demands. Zero sponsors. They tried to step on us — we came back.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Cockroach Janta Party" },
      { property: "og:url", content: "https://cockroachjantaparty.bond/" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Cockroach Janta Party (CJP) | Bound Together",
      },
      {
        name: "twitter:description",
        content:
          "Voice of the Lazy & Unemployed. We share a strong bond. Five demands. Zero sponsors.",
      },
    ],
    links: [{ rel: "canonical", href: "https://cockroachjantaparty.bond/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://cockroachjantaparty.bond/#org",
              name: "Cockroach Janta Party",
              alternateName: ["CJP", "Cockroach Janta Party (CJP)"],
              url: "https://cockroachjantaparty.bond/",
              email: "contact@cockroachjantaparty.org",
              slogan: "Voice of the Lazy & Unemployed",
              description:
                "Cockroach Janta Party (CJP) is a movement for the lazy, the unemployed, and the chronically online. Bound to the truth, governed by Abhijeet Dipke.",
              founder: { "@type": "Person", name: "Abhijeet Dipke" },
              areaServed: "IN",
            },
            {
              "@type": "WebSite",
              "@id": "https://cockroachjantaparty.bond/#website",
              url: "https://cockroachjantaparty.bond/",
              name: "Cockroach Janta Party",
              inLanguage: "en-IN",
              publisher: { "@id": "https://cockroachjantaparty.bond/#org" },
            },
            {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is the Cockroach Janta Party?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Cockroach Janta Party (CJP) is a movement for the lazy, the unemployed and the chronically online. We share a strong bond. Five demands, zero corporate sponsors.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Who founded the Cockroach Janta Party?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "The Cockroach Janta Party is owned and founded by Abhijeet Dipke, who serves as Founder & Convenor. We are all bound to it. Developed by comrade TG Habib.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How do I join the Cockroach Janta Party?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Membership is free and lifelong. Fill in the membership form linked on the homepage. No fees, no selfies with the leader, no missed call to register.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What are the five demands of the CJP?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No Rajya Sabha for retired CJIs; vote tampering treated under UAPA; 50% reservation for women without expanding Parliament; cancellation of Ambani and Adani media licences; and a 20-year ban on political defectors.",
                  },
                },
              ],
            },
          ],
        }),
      },
    ],
  }),
});

/* ============ MASCOT — hand-drawn cockroach ============ */
function Roach({ size = 280 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 320 320"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="CJP cockroach mascot"
      className="cjp-roach"
    >
      <g>
        {/* antennae */}
        <g className="cjp-antenna a-l" style={{ transformOrigin: "135px 95px" }}>
          <path
            d="M135 95 Q95 55 55 30"
            stroke="#0a0a0a"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="55" cy="30" r="6" fill="#c8ff00" stroke="#0a0a0a" strokeWidth="3" />
        </g>
        <g className="cjp-antenna a-r" style={{ transformOrigin: "185px 95px" }}>
          <path
            d="M185 95 Q225 55 265 30"
            stroke="#0a0a0a"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="265" cy="30" r="6" fill="#c8ff00" stroke="#0a0a0a" strokeWidth="3" />
        </g>
        {/* legs */}
        {[0, 1, 2].map((i) => (
          <g
            key={`L${i}`}
            className={`cjp-leg L${i}`}
            style={{ transformOrigin: `120px ${165 + i * 28}px` }}
          >
            <path
              d={`M120 ${165 + i * 28} L${50 - i * 8} ${150 + i * 36}`}
              stroke="#0a0a0a"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </g>
        ))}
        {[0, 1, 2].map((i) => (
          <g
            key={`R${i}`}
            className={`cjp-leg R${i}`}
            style={{ transformOrigin: `200px ${165 + i * 28}px` }}
          >
            <path
              d={`M200 ${165 + i * 28} L${270 + i * 8} ${150 + i * 36}`}
              stroke="#0a0a0a"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </g>
        ))}
        {/* head */}
        <ellipse cx="160" cy="105" rx="42" ry="32" fill="#0a0a0a" />
        {/* body */}
        <path d="M85 175 Q160 110 235 175 Q260 240 160 280 Q60 240 85 175 Z" fill="#0a0a0a" />
        {/* shell highlight */}
        <path
          d="M120 165 Q160 200 200 165"
          stroke="#c8ff00"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M115 200 Q160 235 205 200"
          stroke="#c8ff00"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />
        {/* center seam */}
        <path d="M160 130 L160 270" stroke="#1a1a1a" strokeWidth="2" />
        {/* eyes */}
        <circle cx="146" cy="100" r="7" fill="#f5f5f0" />
        <circle cx="174" cy="100" r="7" fill="#f5f5f0" />
        <circle cx="146" cy="102" r="3.5" fill="#0a0a0a" />
        <circle cx="174" cy="102" r="3.5" fill="#0a0a0a" />
        {/* angry brow */}
        <path d="M138 88 L154 94" stroke="#c8ff00" strokeWidth="3" strokeLinecap="round" />
        <path d="M182 88 L166 94" stroke="#c8ff00" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/* ============ DATA ============ */
const manifesto = [
  {
    t: "No Rajya Sabha for retired CJIs",
    b: "If CJP comes to power, no Chief Justice gets a Rajya Sabha seat as a post-retirement reward. Period.",
  },
  {
    t: "Vote tampering = UAPA",
    b: "If a legitimate vote is deleted — anywhere — the CEC gets arrested under UAPA. Taking voting rights from citizens is terrorism.",
  },
  {
    t: "50% reservation for women",
    b: "Women get 50%, not 33%, without inflating Parliament. 50% of all Cabinet positions reserved for women.",
  },
  {
    t: "Cancel Ambani & Adani media licences",
    b: "All media houses owned by them lose licences. Independent media gets oxygen. Godi anchors' bank accounts get a deep audit.",
  },
  {
    t: "20-year ban on defectors",
    b: "Any MLA or MP who jumps party is barred from contesting or holding public office for 20 years.",
  },
];

const eligibility = [
  { id: "01", t: "Unemployed", b: "By force, by choice, or by principle. We don't ask which." },
  { id: "02", t: "Lazy", b: "Physically only. The brain may continue to spiral at 3am." },
  { id: "03", t: "Chronically online", b: "Minimum 11 hours / day. Bathroom scrolling counts." },
  {
    id: "04",
    t: "Can rant professionally",
    b: "Sharp, honest, and pointed at something that actually matters.",
  },
];

const tickerWords = [
  "हम ज़िंदा हैं",
  "WE SURVIVE",
  "तेज़ धूप में भी",
  "STEP ON US, WE COME BACK",
  "जनता का जवाब",
  "5 DEMANDS · 0 SPONSORS",
  "बेरोज़गारों की पार्टी",
  "VOICE OF THE LAZY & UNEMPLOYED",
  "🪳 ZINDABAD 🪳",
];

import { RegistrationForm } from "../components/RegistrationForm";

const WA_URL =
  "https://wa.me/?text=" +
  encodeURIComponent(
    "Join the Cockroach Janta Party — Voice of the Lazy & Unemployed. https://cockroachjantaparty.bond/",
  );

/* ============ HOOKS & ANIMATION ============ */
function useCursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0,
      x = -100,
      y = -100,
      tx = -100,
      ty = -100;
    const move = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const loop = () => {
      if (Math.abs(tx - x) > 0.1 || Math.abs(ty - y) > 0.1) {
        x += (tx - x) * 0.18;
        y += (ty - y) * 0.18;
        el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);
  return ref;
}

function Reveal({
  children,
  className,
  delay = 0,
  y = 40,
  style,
  as = "div",
  href,
  target,
  rel,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  style?: React.CSSProperties | MotionStyle;
  as?: keyof typeof motion | "a" | "div";
  href?: string;
  target?: string;
  rel?: string;
}) {
  const Component: any = motion[as as keyof typeof motion] || motion.div;
  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.8, 0.2, 1] }}
      className={className}
      style={style}
      href={href}
      target={target}
      rel={rel}
    >
      {children}
    </Component>
  );
}

/* ============ LIVE ELECTION BOARD ============ */
function LiveCounter() {
  const [count, setCount] = useState(15300000);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const docRef = doc(db, "settings", "stats");
        const snap = await getDoc(docRef);
        if (snap.exists() && snap.data().baseMemberCount !== undefined) {
          setCount(snap.data().baseMemberCount);
        }
      } catch (err) {
        console.warn(err);
      }
      setIsReady(true);
    };
    fetchCount();
  }, []);

  useEffect(() => {
    if (!isReady) return;
    const interval = setInterval(() => {
      const newJoins = Math.floor(Math.random() * 45) + 12;
      setCount((c) => c + newJoins);
    }, 2500);
    return () => clearInterval(interval);
  }, [isReady]);

  const formatted = count.toLocaleString();

  return (
    <div className="cr-election-board">
      <div className="cr-eb-header">
        <div className="cr-eb-live-badge">
          <span className="cr-eb-dot" />
          LIVE
        </div>
        <div className="cr-eb-title">YOUTH STORMING IN</div>
      </div>

      <div className="cr-eb-grid">
        <div className="cr-eb-main-count">
          <span className="cr-eb-label">TOTAL JOINED SO FAR</span>
          <div className="cr-live-number">
            {formatted.split("").map((char, i) => {
              const isNum = !isNaN(parseInt(char));
              return (
                <div key={i} className={`cr-digit-wrap ${isNum ? "num" : "comma"}`}>
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={`${i}-${char}`}
                      initial={{ y: "100%", filter: "blur(8px)", opacity: 0 }}
                      animate={{ y: "0%", filter: "blur(0px)", opacity: 1 }}
                      exit={{ y: "-100%", filter: "blur(8px)", opacity: 0 }}
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      className="cr-digit"
                    >
                      {char}
                    </motion.span>
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="cr-eb-footer">
        Real-time count of young people who are tired of the old system and want real change.
      </div>
    </div>
  );
}

/* ============ PAGE ============ */
function Index() {
  const cursorRef = useCursor();

  return (
    <div className="cjp">
      <style>{cjpCss}</style>

      {/* grain + cursor */}
      <div className="cjp-grain" aria-hidden />
      <div className="cjp-cursor" ref={cursorRef} aria-hidden />

      {/* TOP TICKER */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "auto" }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        className="cjp-ticker cjp-ticker-top"
        aria-hidden
      >
        <div className="cjp-ticker-track">
          {Array.from({ length: 4 }).flatMap((_, k) =>
            tickerWords.map((w, i) => (
              <span key={`${k}-${i}`} className="cjp-ticker-item">
                {w} <em>🪳</em>
              </span>
            )),
          )}
        </div>
      </motion.div>

      {/* NAV */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: 0.2 }}
        className="cjp-nav"
      >
        <div className="cjp-nav-bg" aria-hidden>
          <img
            src="https://static.toiimg.com/thumb/msid-131177259,width-1280,height-720,imgsize-48962,resizemode-6,overlay-toi_sw,pt-32,y_pad-600,x_pad-1200/photo.jpg"
            alt="Cockroach Janta Party Media Background"
            width={1280}
            height={720}
            loading="lazy"
          />
        </div>
        <a href="#top" className="cjp-brand">
          <span className="cjp-brand-roach">🪳</span>
          <span className="cjp-brand-text">
            <b>CJP</b>
            <i>est. now</i>
          </span>
        </a>
        <div className="cjp-nav-pill">
          <Link to="/cockroach">Transmissions</Link>
          <a href="#manifesto">Manifesto</a>
          <a href="#join">The Bond</a>
          <a href="#contact">Contact</a>
        </div>
        <Link to="/cockroach" className="cjp-nav-cta">
          <span>Cockroach Media</span>
          <em>→</em>
        </Link>
      </motion.nav>

      {/* HERO */}
      <header id="top" className="cjp-hero">
        <div className="cjp-hero-grid">
          {/* left: massive headline */}
          <Reveal className="cjp-hero-headline" y={50}>
            <div className="cjp-hero-tag">
              <span className="cjp-dot" /> Volume 1 · Edition 1 · Filed under General Disgruntlement
            </div>
            <h1 className="cjp-h1">
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                className="cjp-word l1"
              >
                COCK<span className="cjp-accent">·</span>ROACH
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="cjp-word l2"
              >
                <i>janta</i> party
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                className="cjp-word l3"
              >
                <span className="cjp-strike">वो</span> हम।
              </motion.span>
            </h1>
            <p className="cjp-sub">
              <b>
                A political party for the people the system forgot to count. We are bound to the
                truth.
              </b>
              <br />
              <span>
                We share a strong bond. Five demands. Zero sponsors. One large, stubborn swarm.
              </span>
            </p>
            <div className="cjp-hero-ctas">
              <a href="#join" className="cjp-btn cjp-btn-primary">
                The Bond <em>→</em>
              </a>
              <Link to="/cockroach" className="cjp-btn cjp-glitch-btn">
                <span>Cockroach Media</span>
              </Link>
            </div>

            <Reveal delay={0.4}>
              <LiveCounter />
            </Reveal>
          </Reveal>

          {/* right: mascot stage */}
          <Reveal className="cjp-hero-stage" y={50} delay={0.2}>
            <div className="cjp-stage-bg" aria-hidden>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="cjp-blob b1"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                className="cjp-blob b2"
              />
              <div className="cjp-cross-grid" />
            </div>
            <div className="cjp-roach-wrap">
              <Roach size={340} />
              <div className="cjp-roach-shadow" />
            </div>
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 15 }}
              transition={{ type: "spring", delay: 0.4 }}
              className="cjp-stamp cjp-stamp-1"
            >
              <span>
                NOT
                <br />
                SQUASHABLE
              </span>
            </motion.div>
            <motion.div
              initial={{ scale: 0, rotate: 30 }}
              animate={{ scale: 1, rotate: -12 }}
              transition={{ type: "spring", delay: 0.5 }}
              className="cjp-stamp cjp-stamp-2"
            >
              <span>
                EST.
                <br />
                NOW
              </span>
            </motion.div>
            <motion.div
              initial={{ scale: 0, rotate: 30 }}
              animate={{ scale: 1, rotate: -10 }}
              transition={{ type: "spring", delay: 0.6 }}
              className="cjp-stamp cjp-stamp-3"
            >
              <span>
                0<br />
                FUNDING
              </span>
            </motion.div>
          </Reveal>
        </div>

        {/* metrics ribbon */}
        <Reveal y={30} delay={0.4} className="cjp-ribbon">
          <div>
            <b>05</b>
            <span>Demands</span>
          </div>
          <div>
            <b>00</b>
            <span>Corporate Donors</span>
          </div>
          <div>
            <b>∞</b>
            <span>Patience</span>
          </div>
          <div>
            <b>01</b>
            <span>Founder, no PA</span>
          </div>
        </Reveal>
      </header>

      {/* BIG MARQUEE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="cjp-bigmarquee"
        aria-hidden
      >
        <div className="cjp-bigmarquee-track">
          {Array.from({ length: 3 }).map((_, k) => (
            <span key={k}>
              They tried to step on us. <em>★</em> We came back. <em>★</em> We came back angrier.{" "}
              <em>★</em> हम ज़िंदा हैं <em>★</em>
            </span>
          ))}
        </div>
      </motion.div>

      {/* VISION — broken grid */}
      <section id="vision" className="cjp-section">
        <div className="cjp-container">
          <Reveal className="cjp-h2-row">
            <span className="cjp-eyebrow">Chapter 01 — The Why</span>
            <h2 className="cjp-h2">
              We are not
              <br />
              here to <em>fix</em>
              <br />
              the chair.
            </h2>
            <p className="cjp-lede">
              We are here to ask — loudly, repeatedly, in writing — where the money went. Then ask
              again next week. And the week after.
            </p>
          </Reveal>

          <div className="cjp-bento">
            <Reveal as="article" delay={0.1} className="cjp-tile cjp-tile-1">
              <span className="cjp-tile-num">01</span>
              <h3>The Mission</h3>
              <p>
                Build a party for the people who keep getting called lazy, chronically online, and —
                most recently — cockroaches. That's it. The rest is satire.
              </p>
            </Reveal>
            <Reveal as="article" delay={0.2} className="cjp-tile cjp-tile-2 cjp-tile-lime">
              <span className="cjp-tile-num">02</span>
              <h3>The Method</h3>
              <p>
                Ask, in writing. File RTIs. Print receipts. Refuse to forget. The internet has
                memory. So do we.
              </p>
            </Reveal>
            <Reveal as="article" delay={0.3} className="cjp-tile cjp-tile-3 cjp-tile-red">
              <span className="cjp-tile-num">03</span>
              <h3>The Symbol</h3>
              <p>
                They called us cockroaches. We made it the logo. You cannot squash a movement that
                already lives behind the fridge.
              </p>
            </Reveal>
            <Reveal as="article" delay={0.4} className="cjp-tile cjp-tile-4">
              <span className="cjp-tile-num">04</span>
              <h3>The Mood</h3>
              <p>Sharp. Petty. Specific. Funny. Refuses to be polite about it.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section id="manifesto" className="cjp-section cjp-section-dark">
        <div className="cjp-container">
          <Reveal className="cjp-h2-row">
            <span className="cjp-eyebrow cjp-eyebrow-light">Chapter 02 — The Demands</span>
            <h2 className="cjp-h2 cjp-h2-light">
              Five demands.
              <br />
              <em>No</em> negotiation.
            </h2>
          </Reveal>
          <ol className="cjp-demands">
            {manifesto.map((m, i) => (
              <Reveal as="li" delay={i * 0.15} key={i} className="cjp-demand">
                <div className="cjp-demand-num">{String(i + 1).padStart(2, "0")}</div>
                <div className="cjp-demand-body">
                  <h3>{m.t}</h3>
                  <p>{m.b}</p>
                </div>
                <div className="cjp-demand-arrow">↗</div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ELIGIBILITY */}
      <section id="eligibility" className="cjp-section">
        <div className="cjp-container">
          <Reveal className="cjp-h2-row">
            <span className="cjp-eyebrow">Chapter 03 — Eligibility</span>
            <h2 className="cjp-h2">
              Are you
              <br />
              <em>cockroach</em> enough?
            </h2>
            <p className="cjp-lede">
              We do not check religion, caste, or gender. We do check these four (4) things.
            </p>
          </Reveal>
          <div className="cjp-elig">
            {eligibility.map((e, i) => (
              <Reveal delay={i * 0.1} key={e.id} className={`cjp-elig-card e-${i}`}>
                <div className="cjp-elig-head">
                  <span className="cjp-elig-id">REQ / {e.id}</span>
                  <span className="cjp-check">✓</span>
                </div>
                <h3>{e.t}</h3>
                <p>{e.b}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.4}>
            <p className="cjp-fineprint">
              Membership is free, lifelong, and revocable only by you. No fees. No selfies with the
              leader. No "missed call to register."
            </p>
          </Reveal>
        </div>
      </section>

      {/* THE BOND / CTA */}
      <section id="join" className="cjp-section cjp-section-lime">
        <div className="cjp-container cjp-join">
          <Reveal className="cjp-join-left">
            <span className="cjp-eyebrow cjp-eyebrow-dark">Chapter 04 — Enlist</span>
            <h2 className="cjp-h2 cjp-h2-dark">
              Forge the
              <br />
              bond.
            </h2>
            <p className="cjp-lede cjp-lede-dark">
              Two clicks. One form. A lifelong bond. Bring your rage, your memes, your receipts.
            </p>
            <div className="cjp-hero-ctas">
              <a href="#join" className="cjp-btn cjp-btn-lime-alt">
                Open the form <em>→</em>
              </a>
              <a
                href={WA_URL}
                target="_blank"
                rel="noreferrer"
                className="cjp-btn cjp-btn-lime-ghost"
              >
                <span>📱</span> Share on WhatsApp
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.2} className="cjp-join-card">
            <div className="cjp-join-head">
              <b>Membership Form</b>
              <small>Cockroach Janta Party · v1</small>
            </div>
            <RegistrationForm />
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="cjp-section cjp-section-dark">
        <div className="cjp-container">
          <Reveal className="cjp-h2-row">
            <span className="cjp-eyebrow cjp-eyebrow-light">Chapter 05 — Contact</span>
            <h2 className="cjp-h2 cjp-h2-light">
              Yell at us
              <br />
              (politely).
            </h2>
          </Reveal>
          <div className="cjp-contact-grid">
            <Reveal
              as={"a" as any}
              delay={0.1}
              href="mailto:contact@cockroachjantaparty.org"
              className="cjp-contact"
            >
              <small>Email</small>
              <span>contact@cockroachjantaparty.org</span>
              <em>↗</em>
            </Reveal>
            <Reveal
              as={"a" as any}
              delay={0.2}
              href="mailto:contact@cockroachjantaparty.org"
              className="cjp-contact"
            >
              <small>Press</small>
              <span>contact@cockroachjantaparty.org</span>
              <em>↗</em>
            </Reveal>
            <Reveal delay={0.3} className="cjp-contact">
              <small>HQ</small>
              <span>Wherever the wifi works.</span>
              <em>📍</em>
            </Reveal>
            <Reveal delay={0.4} className="cjp-contact">
              <small>Founder &amp; Convenor</small>
              <span>Abhijeet Dipke</span>
              <em>🪳</em>
            </Reveal>
            <Reveal delay={0.5} className="cjp-contact">
              <small>Developer / Comrade</small>
              <span>TG Habib</span>
              <em>🪳</em>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="cjp-footer">
        <Reveal y={100} delay={0.2}>
          <div className="cjp-footer-marquee">
            <div className="cjp-footer-mega">
              COCKROACH · JANTA · PARTY · COCKROACH · JANTA · PARTY · COCKROACH · JANTA · PARTY ·
              COCKROACH · JANTA · PARTY ·
            </div>
          </div>
        </Reveal>
        <div className="cjp-container cjp-footer-grid">
          <Reveal delay={0.1}>
            <div className="cjp-brand cjp-brand-foot">
              <span className="cjp-brand-roach">🪳</span>
              <span className="cjp-brand-text">
                <b>CJP</b>
                <i>since now</i>
              </span>
            </div>
            <p>Sponsored by no one. Funded by nothing. HQ: wherever the wifi works.</p>
          </Reveal>
          <Reveal delay={0.2}>
            <small>Sitemap</small>
            <ul>
              <li>
                <a href="#vision">Vision</a>
              </li>
              <li>
                <a href="#manifesto">Manifesto</a>
              </li>
              <li>
                <a href="#eligibility">Eligibility</a>
              </li>
              <li>
                <a href="#join">Join</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </Reveal>
          <Reveal delay={0.3}>
            <small>Channels</small>
            <ul>
              <li>
                <a href={WA_URL} target="_blank" rel="noreferrer">
                  WhatsApp ↗
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noreferrer">
                  Twitter / X ↗
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noreferrer">
                  Instagram ↗
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noreferrer">
                  YouTube ↗
                </a>
              </li>
            </ul>
          </Reveal>
          <Reveal delay={0.4}>
            <small>Legal-ish</small>
            <p className="cjp-disclaimer">
              Satire, dissent, and chitin. Filed under General Disgruntlement. Now accepting rants,
              retweets, and resentment.
            </p>
          </Reveal>
        </div>
        <div className="cjp-footer-bottom">
          <span>© {new Date().getFullYear()} CJP</span>
          <span>Made with ❤️ and chitin by a proud Cockroach Janta Party member</span>
        </div>
      </footer>
    </div>
  );
}

/* ============ CSS ============ */
const cjpCss = `
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;700;900&family=Space+Mono:wght@400;700&family=Hind:wght@400;700&display=swap');

.cjp {
  --ink: #0a0a0a;
  --paper: #f5f5f0;
  --lime: #c8ff00;
  --red: #ff3d00;
  --grey: #1a1a1a;
  --muted: #6b6b6b;
  background: var(--paper);
  color: var(--ink);
  font-family: 'Inter', system-ui, 'Hind', sans-serif;
  min-height: 100vh;
  overflow-x: clip;
  position: relative;
  -webkit-font-smoothing: antialiased;
}
.cjp * { box-sizing: border-box; }
.cjp a { color: inherit; text-decoration: none; }
.cjp-container { max-width: 1440px; margin: 0 auto; padding: 0 4rem; position: relative; }
@media (max-width: 820px) { .cjp-container { padding: 0 1.5rem; } }

/* GRAIN */
.cjp-grain {
  position: fixed; inset: 0; pointer-events: none; z-index: 1; opacity: 0.15;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.35'/></svg>");
}

/* CURSOR */
.cjp-cursor {
  position: fixed; left: 0; top: 0; width: 28px; height: 28px; border-radius: 50%;
  background: var(--lime); mix-blend-mode: difference; z-index: 9999; pointer-events: none;
  box-shadow: 0 0 0 2px var(--ink); transition: width .2s, height .2s;
}
@media (hover: none) { .cjp-cursor { display: none; } }

/* TICKER */
.cjp-ticker { background: var(--ink); color: var(--paper); border-bottom: 2px solid var(--ink); overflow: hidden; position: relative; z-index: 3; }
.cjp-ticker-track {
  display: inline-flex; gap: 2.5rem; padding: 0.6rem 0; white-space: nowrap;
  animation: cjp-marquee 38s linear infinite; font-family: 'Space Mono', monospace; font-size: 0.78rem; letter-spacing: 0.1em;
}
.cjp-ticker-item em { color: var(--lime); font-style: normal; margin-left: 0.4rem; }
@keyframes cjp-marquee { from { transform: translate3d(0,0,0); } to { transform: translate3d(-50%,0,0); } }

/* NAV */
.cjp-nav {
  position: sticky; top: 0; z-index: 20;
  display: flex; align-items: center; justify-content: space-between; gap: 1rem;
  padding: 1.25rem 4rem; background: var(--paper);
  border-bottom: 4px solid var(--ink); box-shadow: 0 8px 0 rgba(10,10,10,0.1);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  overflow: hidden;
}
.cjp-nav-bg {
  position: absolute; inset: 0; z-index: 0; pointer-events: none;
  opacity: 0.2; mix-blend-mode: luminosity;
}
.cjp-nav-bg img { width: 100%; height: 100%; object-fit: cover; object-position: center 25%; }
.cjp-nav > *:not(.cjp-nav-bg) { position: relative; z-index: 1; text-shadow: 0 0 10px var(--paper), 0 0 5px var(--paper); }
.cjp-brand { display: flex; align-items: center; gap: 0.8rem; }
.cjp-brand-roach { font-size: 2rem; display: inline-block; animation: cjp-wiggle 3s ease-in-out infinite; filter: drop-shadow(2px 2px 0 var(--ink)); }
.cjp-brand-text b { font-family: 'Archivo Black', sans-serif; font-size: 1.2rem; letter-spacing: 0.02em; line-height: 1; display: block; text-transform: uppercase; }
.cjp-brand-text i { font-family: 'Space Mono', monospace; font-style: normal; font-size: 0.7rem; color: var(--ink); display: block; margin-top: 3px; text-transform: uppercase; letter-spacing: 0.15em; font-weight: bold; }
.cjp-nav-pill { display: flex; gap: 0.25rem; padding: 0.4rem; border: 3px solid var(--ink); border-radius: 999px; background: var(--paper); box-shadow: 4px 4px 0 var(--ink); }
.cjp-nav-pill a { font-family: 'Space Mono', monospace; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; padding: 0.6rem 1.2rem; border-radius: 999px; transition: all .2s; font-weight: bold; }
.cjp-nav-pill a:hover { background: var(--lime); color: var(--ink); transform: scale(1.05); }
.cjp-nav-cta {
  display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.8rem 1.4rem;
  background: var(--lime); color: var(--ink) !important; border: 3px solid var(--ink);
  font-family: 'Archivo Black', sans-serif; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.06em;
  border-radius: 999px; box-shadow: 5px 5px 0 var(--ink); transition: transform .15s, box-shadow .15s;
}
.cjp-nav-cta:hover { transform: translate(-3px, -3px); box-shadow: 8px 8px 0 var(--ink); background: var(--red); color: var(--paper) !important; }
.cjp-nav-cta em { font-style: normal; font-size: 1.2em; transition: transform .2s; }
.cjp-nav-cta:hover em { transform: translateX(4px); }
@media (max-width: 820px) { .cjp-nav-pill { display: none; } }
@media (max-width: 600px) {
  .cjp-nav { padding: 0.75rem 1rem; border-bottom: 3px solid var(--ink); gap: 0.5rem; }
  .cjp-brand { gap: 0.5rem; }
  .cjp-brand-roach { font-size: 1.6rem; }
  .cjp-brand-text b { font-size: 1rem; }
  .cjp-brand-text i { font-size: 0.6rem; display: none; }
  .cjp-nav-cta { padding: 0.6rem 1rem; font-size: 0.75rem; border-width: 2px; box-shadow: 3px 3px 0 var(--ink); gap: 0.4rem; }
  .cjp-nav-cta span { display: none; }
  .cjp-nav-cta::before { content: 'Media'; }
}

/* HERO */
.cjp-hero { position: relative; padding: 6rem 4rem 4rem; z-index: 2; overflow: hidden; }
.cjp-hero-grid { max-width: 1440px; margin: 0 auto; display: grid; grid-template-columns: 1.2fr 1fr; gap: 6rem; align-items: center; }
@media (max-width: 900px) { .cjp-hero-grid { grid-template-columns: 1fr; gap: 3rem; } }
@media (max-width: 600px) { .cjp-hero { padding: 2rem 1.25rem 2rem; } }
.cjp-hero-tag {
  display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.5rem 1rem;
  background: var(--ink); color: var(--paper);
  font-family: 'Space Mono', monospace; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.12em;
  border-radius: 999px; box-shadow: 4px 4px 0 var(--lime); transform: rotate(-2deg); margin-bottom: 0.5rem;
}
@media (max-width: 600px) { .cjp-hero-tag { font-size: 0.65rem; padding: 0.4rem 0.8rem; } }
.cjp-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--lime); animation: cjp-pulse 1.4s ease-in-out infinite; }
@keyframes cjp-pulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.3); } }

/* LIVE ELECTION BOARD */
.cr-election-board {
  margin-top: 3.5rem;
  background: var(--ink);
  border-radius: 8px;
  border: 4px solid var(--ink);
  box-shadow: 10px 10px 0 var(--lime);
  overflow: hidden;
  max-width: 100%;
  width: 100%;
  position: relative;
  text-align: left;
}
@media (max-width: 600px) {
  .cr-election-board { box-shadow: 6px 6px 0 var(--lime); border-width: 3px; }
}
.cr-eb-header {
  background: var(--red);
  color: var(--paper);
  padding: 0.6rem 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
}
.cr-eb-live-badge {
  background: var(--paper);
  color: var(--red);
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.cr-eb-dot {
  width: 8px;
  height: 8px;
  background: var(--red);
  border-radius: 50%;
  animation: cjp-pulse 1s infinite;
}
.cr-eb-title {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.cr-eb-grid {
  padding: 1.5rem 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
@media (min-width: 600px) {
  .cr-eb-grid {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}
.cr-eb-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: block;
  margin-bottom: 0.8rem;
}
.cr-live-number {
  display: flex;
  font-family: 'Archivo Black', sans-serif;
  font-size: clamp(3rem, 10vw, 5.5rem);
  color: var(--lime);
  line-height: 1;
  font-weight: 900;
  letter-spacing: -0.02em;
}
.cr-digit-wrap {
  position: relative;
  display: inline-flex;
  justify-content: center;
  overflow: hidden;
  height: 1.1em;
}
.cr-digit-wrap.num { width: 0.65em; }
.cr-digit-wrap.comma { width: 0.35em; color: #555; }
.cr-digit { position: absolute; }

.cr-eb-footer {
  padding: 1.25rem 1.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: #888;
  border-top: 1px solid #1a1a1a;
  margin-top: 1.5rem;
  line-height: 1.4;
}

.cjp-h1 {
  margin: 1.25rem 0 1.5rem;
  font-family: 'Archivo Black', sans-serif;
  font-size: clamp(2.5rem, 9vw, 9rem); line-height: 0.82; letter-spacing: -0.05em;
  text-transform: uppercase; position: relative;
}
@media (max-width: 600px) {
  .cjp-h1 {
    line-height: 1;
    word-break: break-word;
  }
}
@media (min-width: 1200px) {
  .cjp-h1 { font-size: 11.5rem; letter-spacing: -0.055em; line-height: 0.82; }
  .cjp-hero { padding: 8rem 4rem 6rem; }
  .cjp-hero-grid { grid-template-columns: 1.25fr 1fr; gap: 6rem; align-items: center; max-width: 1600px;}
  .cr-election-board { transform: rotate(-2deg); margin-top: 5rem; }
  .cr-election-board:hover { transform: rotate(0deg) scale(1.02); transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
  .cjp-bento { gap: 2.5rem; }
  .cjp-tile { padding: 4rem; min-height: 380px; border-width: 5px; box-shadow: 12px 12px 0 var(--ink); border-radius: 40px; }
  .cjp-tile:hover { transform: translate(-10px, -10px); box-shadow: 22px 22px 0 var(--ink); }
  .cjp-h2 { font-size: clamp(5rem, 7vw, 8rem); letter-spacing: -0.04em; }
  .cjp-demand-num { font-size: 8rem; }
  .cjp-demand-body h3 { font-size: 3.2rem; }
  .cjp-demand { padding: 4rem 1rem; gap: 4rem; }
  .cjp-elig-card { padding: 3rem; border-radius: 40px; border-width: 4px; box-shadow: 10px 10px 0 var(--ink); }
  .cjp-join-card { padding: 5rem; border-width: 5px; box-shadow: 20px 20px 0 var(--ink); border-radius: 48px; }
  .cr-eb-grid { padding: 2.5rem; }
  .cr-live-number { font-size: 5.5rem; }
}
.cjp-word { display: block; filter: drop-shadow(4px 4px 0 rgba(0,0,0,0.1)); }
.cjp-word.l1 { color: var(--ink); transform: translateX(-10px); }
.cjp-word.l2 { color: var(--ink); padding-left: 0.5em; z-index: 2; position: relative; }
.cjp-word.l2 i { font-style: italic; font-family: 'Inter', serif; font-weight: 900; background: var(--lime); padding: 0.05em 0.3em; transform: rotate(-3deg) translateY(-8px); display: inline-block; border: 3px solid var(--ink); box-shadow: 4px 4px 0 var(--ink); }
.cjp-word.l3 { font-family: 'Hind', sans-serif; font-weight: 700; color: var(--paper); -webkit-text-stroke: 2px var(--ink); font-size: 0.7em; padding-left: 0.6em; margin-top: -10px; position: relative; z-index: 1;}
.cjp-accent { color: var(--red); }
.cjp-strike { position: relative; opacity: 0.7; color: var(--ink); -webkit-text-stroke: 0; }
.cjp-strike::after { content: ''; position: absolute; left: -10%; right: -10%; top: 50%; height: 8px; background: var(--red); transform: rotate(-8deg); }

.cjp-sub { font-size: clamp(1.2rem, 1.8vw, 1.5rem); max-width: 680px; line-height: 1.6; color: var(--grey); border-left: 4px solid var(--lime); padding-left: 1.5rem; margin-bottom: 2.5rem; }
.cjp-sub b { color: var(--ink); font-weight: 900; font-size: 1.1em;}
.cjp-sub span { color: var(--ink); opacity: 0.8; font-family: 'Space Mono', monospace; font-size: 0.85em; text-transform: uppercase; display: inline-block; margin-top: 0.5rem; font-weight: bold;}

.cjp-hero-ctas { display: flex; gap: 1rem; margin-top: 2rem; flex-wrap: wrap; }
.cjp-btn {
  display: inline-flex; align-items: center; gap: 0.6rem;
  padding: 1.1rem 1.6rem; border: 3px solid var(--ink);
  font-family: 'Archivo Black', sans-serif; font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.04em;
  border-radius: 999px; transition: transform .2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow .2s;
  cursor: pointer; position: relative; overflow: hidden;
}
@media (max-width: 600px) { .cjp-btn { padding: 0.9rem 1.25rem; font-size: 0.85rem; border-width: 2px; text-align: center; justify-content: center; width: 100%; max-width: 320px;} .cjp-hero-ctas { flex-direction: column; width: 100%; align-items: flex-start; } }
.cjp-btn em { font-style: normal; transition: transform .2s; font-size: 1.2em; }
.cjp-btn:hover em { transform: translateX(6px); }
.cjp-btn-primary { background: var(--lime); color: var(--ink); box-shadow: 6px 6px 0 var(--ink); }
.cjp-btn-primary:active { transform: translate(2px,2px); box-shadow: 4px 4px 0 var(--ink); }
.cjp-btn-primary:hover { transform: translate(-2px,-2px); box-shadow: 8px 8px 0 var(--ink); background: var(--red); color: var(--paper); }
.cjp-glitch-btn {
  background: #111; color: var(--lime) !important; border-color: var(--lime);
  position: relative; overflow: hidden;
  box-shadow: 6px 6px 0 var(--lime);
}
.cjp-glitch-btn span {
  position: relative;
  z-index: 2;
}
.cjp-glitch-btn::before {
  content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
  background: linear-gradient(to right, transparent, rgba(200, 255, 0, 0.4), transparent);
  transform: skewX(-20deg);
  animation: cjp-glitch-swipe 3s infinite;
}
.cjp-glitch-btn:hover {
  background: var(--lime); color: var(--ink) !important; box-shadow: 8px 8px 0 var(--red); border-color: var(--ink);
  transform: translate(-2px, -2px);
}
@keyframes cjp-glitch-swipe {
  0% { left: -100%; }
  20% { left: 200%; }
  100% { left: 200%; }
}
.cjp-btn-ghost { background: var(--paper); color: var(--ink); box-shadow: 6px 6px 0 rgba(0,0,0,0.1); }
.cjp-btn-ghost:hover { background: var(--ink); color: var(--paper); box-shadow: 8px 8px 0 var(--lime); }
.cjp-btn-num { background: var(--red); color: var(--paper); padding: 0.2rem 0.6rem; border-radius: 6px; font-size: 0.85rem; transform: rotate(-5deg); display: inline-block;}
.cjp-btn-dark { background: var(--ink); color: var(--paper) !important; box-shadow: 6px 6px 0 var(--lime); }
.cjp-btn-dark:hover { transform: translate(-2px,-2px); box-shadow: 8px 8px 0 var(--lime); background: var(--red); color: var(--paper) !important; }
.cjp-btn-ghost-dark { background: transparent; color: var(--paper) !important; border-color: var(--paper); box-shadow: 6px 6px 0 rgba(255,255,255,0.2); }
.cjp-btn-ghost-dark:hover { background: var(--paper); color: var(--ink) !important; border-color: var(--paper); box-shadow: 8px 8px 0 var(--lime); }
.cjp-btn-lime-alt { background: var(--ink); color: var(--paper) !important; box-shadow: 6px 6px 0 var(--paper); }
.cjp-btn-lime-alt:hover { transform: translate(-2px,-2px); box-shadow: 8px 8px 0 var(--paper); background: var(--red); color: var(--paper) !important; }
.cjp-btn-lime-ghost { background: transparent; color: var(--ink); border-color: var(--ink); box-shadow: 6px 6px 0 rgba(0,0,0,0.1); }
.cjp-btn-lime-ghost:hover { background: var(--paper); color: var(--ink); border-color: var(--ink); box-shadow: 8px 8px 0 var(--ink); }
.cjp-btn-block { display: flex; justify-content: center; width: 100%; margin-top: 1rem; }

/* HERO STAGE */
.cjp-hero-stage { position: relative; aspect-ratio: 1/1; max-width: 540px; margin: 0 auto; perspective: 1000px; }
.cjp-stage-bg { position: absolute; inset: 0; border: 4px solid var(--ink); border-radius: 40px; overflow: hidden; background: var(--lime); box-shadow: 16px 16px 0 var(--ink); transform: rotateZ(1deg); transition: transform 0.4s ease; }
.cjp-hero-stage:hover .cjp-stage-bg { transform: rotateZ(-1deg) scale(1.02); }
@media (max-width: 600px) {
  .cjp-hero-stage { max-width: 380px; margin-top: 1rem; width: 100%; }
  .cjp-stage-bg { box-shadow: 8px 8px 0 var(--ink); border-width: 3px; border-radius: 24px; }
}
.cjp-blob { position: absolute; border-radius: 50%; filter: blur(30px); opacity: 0.6; transform: translateZ(0); will-change: transform; }
.cjp-blob.b1 { width: 60%; height: 60%; background: var(--red); top: -10%; right: -10%; animation: cjp-float 9s ease-in-out infinite; }
.cjp-blob.b2 { width: 50%; height: 50%; background: #00d4ff; bottom: -15%; left: -10%; animation: cjp-float 11s ease-in-out infinite reverse; }
.cjp-cross-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(var(--ink) 1px, transparent 1px),
    linear-gradient(90deg, var(--ink) 1px, transparent 1px);
  background-size: 40px 40px; opacity: 0.08;
}
.cjp-roach-wrap { position: absolute; inset: 0; display: grid; place-items: center; }
.cjp-roach { animation: cjp-bob 3.5s ease-in-out infinite; filter: drop-shadow(8px 8px 0 var(--ink)); position: relative; z-index: 2; }
.cjp-roach-shadow { position: absolute; bottom: 12%; left: 50%; width: 60%; height: 12px; background: var(--ink); opacity: 0.35; border-radius: 50%; filter: blur(6px); transform: translateX(-50%); animation: cjp-shadow 3.5s ease-in-out infinite; }
@keyframes cjp-bob { 0%,100% { transform: translateY(-6px) rotate(-1deg); } 50% { transform: translateY(6px) rotate(2deg); } }
@keyframes cjp-shadow { 0%,100% { transform: translateX(-50%) scale(1); opacity: 0.35; } 50% { transform: translateX(-50%) scale(0.7); opacity: 0.55; } }
@keyframes cjp-wiggle { 0%,100% { transform: rotate(-12deg); } 50% { transform: rotate(15deg); } }
@keyframes cjp-float { 0%,100% { transform: translate(0,0); } 50% { transform: translate(20px,-20px); } }
.cjp-antenna { animation: cjp-antenna 1.6s ease-in-out infinite; }
.cjp-antenna.a-r { animation-delay: -0.8s; }
@keyframes cjp-antenna { 0%,100% { transform: rotate(-10deg); } 50% { transform: rotate(10deg); } }
.cjp-leg { animation: cjp-leg 0.55s ease-in-out infinite; }
.cjp-leg.L0, .cjp-leg.R1 { animation-delay: -0.15s; }
.cjp-leg.L1, .cjp-leg.R2 { animation-delay: -0.3s; }
.cjp-leg.L2, .cjp-leg.R0 { animation-delay: -0.45s; }
@keyframes cjp-leg { 0%,100% { transform: rotate(-8deg); } 50% { transform: rotate(8deg); } }

/* STAMPS */
.cjp-stamp {
  position: absolute; display: grid; place-items: center; border-radius: 50%;
  font-family: 'Archivo Black', sans-serif; text-transform: uppercase; text-align: center;
  font-size: 0.8rem; line-height: 1; padding: 0.4rem; z-index: 3; box-shadow: 6px 6px 0 var(--ink);
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.cjp-stamp:hover { transform: scale(1.1) rotate(0deg) !important; z-index: 10; cursor: default; }
.cjp-stamp-1 { top: 2%; right: -2%; width: 110px; height: 110px; background: var(--red); color: var(--paper); transform: rotate(15deg); border: 3px solid var(--ink); }
.cjp-stamp-2 { bottom: 4%; right: -4%; width: 90px; height: 90px; background: var(--ink); color: var(--lime); transform: rotate(-12deg); border: 3px solid var(--ink); }
.cjp-stamp-3 { top: 35%; left: -8%; width: 95px; height: 95px; background: var(--paper); color: var(--ink); border: 3px solid var(--ink); transform: rotate(-10deg); }
.cjp-stamp span { display: block; filter: drop-shadow(1px 1px 0 rgba(0,0,0,0.2)); }
@media (max-width: 600px) {
  .cjp-stamp { font-size: 0.6rem; border-width: 2px !important; box-shadow: 4px 4px 0 var(--ink) !important; }
  .cjp-stamp-1 { width: 80px; height: 80px; top: -5%; right: -5%; }
  .cjp-stamp-2 { width: 70px; height: 70px; bottom: 0%; right: -5%; }
  .cjp-stamp-3 { width: 75px; height: 75px; left: -5%; top: 40%; }
}

/* RIBBON */
.cjp-ribbon {
  margin-top: 4.5rem;
  display: grid; grid-template-columns: repeat(4, 1fr);
  border-top: 4px solid var(--ink); border-bottom: 4px solid var(--ink);
  background: var(--paper); color: var(--ink); box-shadow: 0 12px 0 var(--ink); position: relative; z-index: 5;
}
.cjp-ribbon > div { padding: 1.5rem 1.25rem; border-right: 2px solid var(--ink); transition: background 0.3s; }
.cjp-ribbon > div:hover { background: var(--lime); cursor: default; }
.cjp-ribbon > div:last-child { border-right: none; }
.cjp-ribbon b { font-family: 'Archivo Black', sans-serif; font-size: clamp(2.5rem, 5vw, 3.8rem); display: block; line-height: 0.9; text-shadow: 3px 3px 0 var(--lime); }
.cjp-ribbon > div:hover b { text-shadow: 3px 3px 0 var(--paper); }
.cjp-ribbon span { font-family: 'Space Mono', monospace; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--ink); margin-top: 0.5rem; display: block; font-weight: bold; }
@media (max-width: 720px) { .cjp-ribbon { grid-template-columns: repeat(2, 1fr); border-bottom: 2px solid var(--ink); box-shadow: 0 8px 0 var(--ink); } .cjp-ribbon > div:nth-child(2) { border-right: none; } .cjp-ribbon > div:nth-child(1), .cjp-ribbon > div:nth-child(2) { border-bottom: 2px solid var(--ink); } }

/* BIG MARQUEE */
.cjp-bigmarquee { background: var(--lime); color: var(--ink); overflow: hidden; border-bottom: 2px solid var(--ink); position: relative; z-index: 2; }
.cjp-bigmarquee-track {
  display: inline-flex; gap: 2.5rem; padding: 1.25rem 0; white-space: nowrap;
  animation: cjp-marquee 28s linear infinite;
  font-family: 'Archivo Black', sans-serif; font-size: clamp(1.5rem, 3vw, 2.5rem); text-transform: uppercase; letter-spacing: -0.01em;
}
.cjp-bigmarquee-track em { font-style: normal; color: var(--red); }

/* SECTIONS */
/* TV CARD */
.cjp-tv-card {
  background: var(--paper);
  border: 4px solid var(--lime);
  border-radius: 20px;
  box-shadow: 16px 16px 0 var(--lime);
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform: rotate(-1deg);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.cjp-tv-card:hover { transform: rotate(0) scale(1.02); }
.cjp-tvc-screen-wrap {
  position: relative;
  border-bottom: 4px solid var(--lime);
  background: #000;
  width: 100%;
  aspect-ratio: 16 / 9;
}
.cjp-tvc-screen {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.cjp-tvc-screen iframe {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.cjp-tvc-overlay {
  position: absolute;
  top: 1.5rem; left: 1.5rem; right: 1.5rem;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
  font-family: 'Space Mono', monospace;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0,0,0,0.8);
  z-index: 10;
}
.cjp-tvc-rec { display: flex; align-items: center; gap: 0.5rem; color: #ff3333; }
.cjp-pulse-dot { width: 12px; height: 12px; background: #ff3333; border-radius: 50%; animation: cjp-pulse 1s infinite alternate; }
.cjp-tvc-body {
  padding: 2rem 2.5rem;
  background: var(--ink);
  color: var(--paper);
}
.cjp-tvc-top { margin-bottom: 1rem; }
.cjp-tvc-badge {
  display: inline-block;
  background: var(--lime);
  color: var(--ink);
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  font-weight: bold;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.cjp-tvc-title {
  font-family: 'Archivo Black', sans-serif;
  font-size: clamp(2rem, 6vw, 3.5rem);
  line-height: 1;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  color: var(--paper);
}
.cjp-tvc-divider {
  height: 2px;
  background: repeating-linear-gradient(90deg, var(--lime) 0, var(--lime) 10px, transparent 10px, transparent 20px);
  margin: 2rem 0;
  opacity: 0.5;
}
.cjp-tvc-footer {
  display: flex;
  justify-content: space-between;
  font-family: 'Space Mono', monospace;
  font-size: 0.85rem;
  color: var(--lime);
  text-transform: uppercase;
  opacity: 0.8;
}
@media (max-width: 600px) {
  .cjp-tv-card { border-width: 3px; border-radius: 12px; box-shadow: 8px 8px 0 var(--lime); transform: rotate(0); }
  .cjp-tvc-screen-wrap { border-bottom-width: 3px; }
  .cjp-tvc-body { padding: 1.5rem; }
  .cjp-tvc-overlay { top: 1rem; left: 1rem; right: 1rem; font-size: 0.8rem; }
  .cjp-pulse-dot { width: 8px; height: 8px; }
  .cjp-tvc-footer { flex-direction: column; gap: 0.5rem; text-align: center; }
  .cjp-tvc-divider { margin: 1.5rem 0; }
}
.cjp-section { padding: 7rem 0; position: relative; z-index: 2; }
@media (max-width: 600px) { .cjp-section { padding: 4rem 0; } }
.cjp-section-dark { background: var(--ink); color: var(--paper); }
.cjp-section-lime { background: var(--lime); color: var(--ink); }
.cjp-h2-row { max-width: 1000px; margin-bottom: 4rem; }
@media (max-width: 600px) { .cjp-h2-row { margin-bottom: 2.5rem; } }
.cjp-eyebrow {
  display: inline-block; font-family: 'Space Mono', monospace; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.18em;
  background: var(--ink); color: var(--paper); padding: 0.35rem 0.75rem; border-radius: 4px;
}
.cjp-eyebrow-light { background: var(--lime); color: var(--ink); }
.cjp-eyebrow-dark { background: var(--ink); color: var(--lime); }
.cjp-h2 {
  font-family: 'Archivo Black', sans-serif; font-size: clamp(2.5rem, 8vw, 6.5rem);
  line-height: 0.92; letter-spacing: -0.03em; margin: 1.25rem 0 1.5rem; text-transform: uppercase;
}
.cjp-h2 em { font-style: italic; background: var(--lime); padding: 0 0.2em; display: inline-block; transform: rotate(-2deg); }
.cjp-h2-light em { background: var(--lime); color: var(--ink); }
.cjp-h2-dark em { background: var(--ink); color: var(--lime); }
.cjp-lede { font-size: clamp(1.1rem, 1.5vw, 1.3rem); max-width: 760px; color: var(--grey); line-height: 1.6; padding-left: 1rem; border-left: 3px solid var(--lime);}
.cjp-lede-dark { color: var(--ink); opacity: 0.85; }
.cjp-section-dark .cjp-lede { color: #b9b9b9; }

/* BENTO */
.cjp-bento { display: grid; grid-template-columns: repeat(6, 1fr); gap: 1.5rem; }
.cjp-tile {
  border: 4px solid var(--ink); border-radius: 32px; padding: 2.5rem;
  background: var(--paper); position: relative; transition: transform .3s, box-shadow .3s;
  min-height: 280px; display: flex; flex-direction: column; justify-content: space-between;
}
.cjp-tile:hover { transform: translate(-5px,-5px); box-shadow: 12px 12px 0 var(--ink); }
.cjp-tile-1 { grid-column: span 4; transform: rotate(-0.4deg); }
.cjp-tile-2 { grid-column: span 2; transform: rotate(0.6deg); }
.cjp-tile-3 { grid-column: span 2; transform: rotate(-0.3deg); }
.cjp-tile-4 { grid-column: span 4; transform: rotate(0.4deg); }
.cjp-tile-lime { background: var(--lime); }
.cjp-tile-red { background: var(--red); color: var(--paper); }
.cjp-tile-num { font-family: 'Space Mono', monospace; font-size: 0.85rem; opacity: 0.7; }
.cjp-tile h3 { font-family: 'Archivo Black', sans-serif; font-size: clamp(1.6rem, 2.5vw, 2.2rem); line-height: 1.1; margin: 1rem 0 0.8rem; text-transform: uppercase; }
.cjp-tile p { font-size: 1.05rem; line-height: 1.6; }
@media (max-width: 820px) {
  .cjp-bento { grid-template-columns: 1fr; }
  .cjp-tile-1, .cjp-tile-2, .cjp-tile-3, .cjp-tile-4 { grid-column: span 1; transform: none; }
}

/* DEMANDS */
.cjp-demands { list-style: none; margin: 0; padding: 0; border-top: 1px solid #2a2a2a; }
.cjp-demand {
  display: grid; grid-template-columns: 140px 1fr 80px; gap: 2.5rem; align-items: center;
  padding: 3rem 1rem; border-bottom: 2px solid #2a2a2a;
  cursor: pointer; transition: padding .3s, background .3s, border-color .3s;
}
.cjp-demand:hover { padding-left: 2.5rem; padding-right: 2.5rem; background: #111; border-color: var(--lime); }
.cjp-demand:hover .cjp-demand-num { color: var(--lime); }
.cjp-demand:hover .cjp-demand-arrow { transform: translate(12px,-12px) scale(1.2) rotate(0); color: var(--lime); }
.cjp-demand-num { font-family: 'Archivo Black', sans-serif; font-size: clamp(3rem, 6vw, 5.5rem); line-height: 1; color: #444; transition: color .3s; }
.cjp-demand-body h3 { font-family: 'Archivo Black', sans-serif; font-size: clamp(1.5rem, 2.8vw, 2.4rem); text-transform: uppercase; line-height: 1.1; margin: 0 0 0.75rem; }
.cjp-demand-body p { color: #b9b9b9; line-height: 1.6; max-width: 800px; font-size: 1.1rem; }
.cjp-demand-arrow { font-size: 2.5rem; color: #555; transition: transform .3s, color .3s; transform: rotate(0); justify-self: end; }
@media (max-width: 700px) {
  .cjp-demand { grid-template-columns: 50px 1fr; gap: 1rem; padding: 1.5rem 0.25rem; align-items: flex-start;}
  .cjp-demand:hover { padding-left: 0.5rem; padding-right: 0.5rem; }
  .cjp-demand-arrow { display: none; }
  .cjp-demand-num { font-size: 2rem; line-height: 1.1; }
  .cjp-demand-body h3 { font-size: 1.15rem; }
}

/* ELIG */
.cjp-elig { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
.cjp-elig-card {
  border: 3px solid var(--ink); border-radius: 28px; padding: 2rem; background: var(--paper);
  transition: transform .3s, box-shadow .3s, background .3s;
}
.cjp-elig-card:hover { transform: translateY(-8px); box-shadow: 10px 10px 0 var(--ink); background: var(--lime); }
.cjp-elig-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; }
.cjp-elig-id { font-family: 'Space Mono', monospace; font-size: 0.8rem; opacity: 0.65; letter-spacing: 0.1em; }
.cjp-check { width: 32px; height: 32px; border-radius: 50%; background: var(--ink); color: var(--lime); display: grid; place-items: center; font-weight: 900; font-size: 1.2rem; }
.cjp-elig-card h3 { font-family: 'Archivo Black', sans-serif; font-size: 1.6rem; line-height: 1.1; margin: 0 0 0.75rem; text-transform: uppercase; }
.cjp-elig-card p { font-size: 1.05rem; line-height: 1.6; color: var(--grey); }
.cjp-fineprint { margin-top: 2rem; font-family: 'Space Mono', monospace; font-size: 0.82rem; color: var(--muted); text-align: center; border-top: 1px dashed var(--ink); padding-top: 1.5rem; }
@media (max-width: 900px) { .cjp-elig { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 520px) { .cjp-elig { grid-template-columns: 1fr; } }

/* JOIN */
.cjp-join { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 4rem; align-items: center; }
@media (max-width: 900px) { .cjp-join { grid-template-columns: 1fr; gap: 2.5rem; } }
.cjp-join-card {
  background: var(--paper); border: 3px solid var(--ink); border-radius: 32px; padding: 3rem;
  box-shadow: 16px 16px 0 var(--ink); transform: rotate(1deg); transition: transform 0.3s;
}
.cjp-join-card:hover { transform: rotate(0deg) scale(1.02); }
.cjp-join-head { display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px dashed var(--ink); padding-bottom: 0.75rem; margin-bottom: 1rem; }
.cjp-join-head b { font-family: 'Archivo Black', sans-serif; text-transform: uppercase; }
.cjp-join-head small { font-family: 'Space Mono', monospace; font-size: 0.7rem; color: var(--muted); }
.cjp-join-qs { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.75rem; }
.cjp-join-qs li { display: flex; gap: 0.75rem; align-items: flex-start; font-size: 0.95rem; line-height: 1.4; }
.cjp-join-qs li span { font-family: 'Space Mono', monospace; font-size: 0.75rem; background: var(--ink); color: var(--lime); padding: 0.15rem 0.4rem; border-radius: 4px; flex: none; }
.cjp-join-qs li em { font-style: italic; color: var(--muted); }
.cjp-form-note { display: block; margin-top: 0.75rem; text-align: center; font-family: 'Space Mono', monospace; font-size: 0.7rem; color: var(--muted); }
@media (max-width: 600px) {
  .cjp-join-card { padding: 1.5rem; box-shadow: 6px 6px 0 var(--ink); border-radius: 16px; transform: none; }
  .cjp-join-qs li { flex-direction: column; gap: 0.35rem; margin-bottom: 0.5rem; }
  .cjp-join-head { flex-direction: column; gap: 0.25rem; }
}

/* CONTACT */
.cjp-contact-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
.cjp-contact {
  display: grid; grid-template-columns: 100px 1fr 40px; gap: 1rem; align-items: center;
  padding: 1.5rem; border: 1px solid #2a2a2a; border-radius: 16px;
  transition: background .25s, border-color .25s, transform .25s; color: var(--paper); text-decoration: none;
}
.cjp-contact:hover { background: #111; border-color: var(--lime); transform: translateY(-3px); }
.cjp-contact small { font-family: 'Space Mono', monospace; font-size: 0.72rem; color: #888; letter-spacing: 0.08em; text-transform: uppercase; }
.cjp-contact span { font-family: 'Archivo Black', sans-serif; font-size: 1rem; text-transform: uppercase; word-break: break-word; min-width: 0; }
.cjp-contact em { font-style: normal; font-size: 1.4rem; justify-self: end; }
@media (max-width: 700px) {
  .cjp-contact-grid { grid-template-columns: 1fr; }
  .cjp-contact { display: flex; flex-direction: column; align-items: flex-start; padding: 1.25rem; position: relative; gap: 0.25rem; }
  .cjp-contact small { font-size: 0.7rem; }
  .cjp-contact span { font-size: 0.85rem; max-width: 85%; }
  .cjp-contact em { position: absolute; right: 1.25rem; top: 50%; transform: translateY(-50%); font-size: 1.2rem; }
}

/* FOOTER */
.cjp-footer { background: var(--ink); color: var(--paper); padding-top: 3rem; position: relative; z-index: 2; overflow: hidden; }
.cjp-footer-marquee {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
}
.cjp-footer-mega {
  font-family: 'Archivo Black', sans-serif; font-size: clamp(4rem, 16vw, 14rem); line-height: 0.85;
  letter-spacing: -0.04em; white-space: nowrap;
  color: transparent; -webkit-text-stroke: 2px var(--lime); padding: 0 1rem;
  user-select: none;
  animation: cjp-marquee 20s linear infinite;
  display: inline-block;
  will-change: transform;
}
@keyframes cjp-marquee {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
}
@media (max-width: 600px) { .cjp-footer-mega { -webkit-text-stroke: 1px var(--lime); font-size: 16vw; } }
.cjp-footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 2rem; padding-top: 3rem; padding-bottom: 2rem; }
.cjp-footer-grid small { font-family: 'Space Mono', monospace; font-size: 0.72rem; color: #888; text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 0.75rem; }
.cjp-footer-grid ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.4rem; }
.cjp-footer-grid a:hover { color: var(--lime); }
.cjp-footer-grid p { color: #b9b9b9; font-size: 0.9rem; line-height: 1.5; max-width: 320px; }
.cjp-disclaimer { font-family: 'Space Mono', monospace !important; font-size: 0.78rem !important; }
.cjp-brand-foot { margin-bottom: 0.75rem; }
.cjp-footer-bottom {
  border-top: 1px solid #2a2a2a; padding: 1.5rem 4rem; display: flex; justify-content: space-between; gap: 1rem;
  font-family: 'Space Mono', monospace; font-size: 0.85rem; color: #888; flex-wrap: wrap; text-align: center; max-width: 1440px; margin: 0 auto;
}
@media (max-width: 820px) { .cjp-footer-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 520px) { .cjp-footer-grid { grid-template-columns: 1fr; gap: 2.5rem; padding-top: 2rem; } .cjp-footer-bottom { justify-content: center; } }

/* Removed .cjp-reveal */

@media (prefers-reduced-motion: reduce) {
  .cjp-roach, .cjp-roach-shadow, .cjp-blob, .cjp-dot, .cjp-brand-roach,
  .cjp-antenna, .cjp-leg, .cjp-ticker-track, .cjp-bigmarquee-track { animation: none !important; }
  .cjp-reveal { opacity: 1; transform: none; transition: none; }
}
`;

export default Index;
