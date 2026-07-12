import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter } from "@tanstack/react-router";
import { HeadContent, Scripts } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import appCss from "../styles.css?url";

function SplashAnimation({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let rAF: number;
    const duration = 2500; // 2.5 seconds to reach 100%

    const animate = (time: number) => {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;

      // Easing function (easeOutExpo)
      const easeOut = timeFraction === 1 ? 1 : 1 - Math.pow(2, -10 * timeFraction);
      const progressValue = Math.floor(easeOut * 100);
      setProgress(progressValue);

      if (timeFraction < 1) {
        rAF = requestAnimationFrame(animate);
      }
    };
    rAF = requestAnimationFrame(animate);

    const timer = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rAF);
    };
  }, [onComplete]);

  const words = [
    { text: "WE", color: "text-white" },
    { text: "ARE", color: "text-white" },
    { text: "BOUND", color: "text-lime-500" },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[10000] bg-zinc-950 text-white flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{
        y: "-100vh",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      {/* Background Noise & Grid */}
      <div className="absolute inset-0 opacity-20 cr-dive-grain mix-blend-overlay pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Kinetic Background Text */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center items-center opacity-5 select-none pointer-events-none"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[25vw] font-black whitespace-nowrap text-lime-500 tracking-tighter mix-blend-screen leading-none">
          CJP SYSTEM
        </span>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center w-full max-w-4xl px-4"
        exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)", transition: { duration: 0.4 } }}
      >
        {/* Emblem Reveal */}
        <motion.div
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
          className="mb-8 relative"
        >
          <div className="absolute inset-0 bg-lime-500 blur-[40px] opacity-20 rounded-full animate-pulse" />
          <img
            src="https://res.cloudinary.com/dwlquotvw/image/upload/v1779218062/android-chrome-192x192_gxtgg6.png"
            alt="Cockroach Janta Party Logo"
            width={160}
            height={160}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-lime-500/20 shadow-[0_0_30px_rgba(132,204,22,0.3)] object-cover relative z-10 bg-zinc-900 filter saturate-150"
          />
        </motion.div>

        {/* Staggered Title Animation */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-5 overflow-hidden pb-4">
          {words.map((word, wordIdx) => (
            <div key={wordIdx} className="flex">
              {word.text.split("").map((char, charIdx) => (
                <motion.span
                  key={`${wordIdx}-${charIdx}`}
                  initial={{ y: 120, opacity: 0, rotate: 15 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.33, 1, 0.68, 1],
                    delay: wordIdx * 0.1 + charIdx * 0.05,
                  }}
                  className={`text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter ${word.color}`}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          ))}
        </div>

        {/* Cyberpunk Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-12 flex flex-col items-center w-full max-w-sm px-4"
        >
          <div className="flex justify-between items-end w-full mb-3 font-mono text-xs text-zinc-400 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <motion.span
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-lime-500 shadow-[0_0_8px_rgba(132,204,22,0.8)]"
              />
              <span>INITIATING ROOT CAUSE</span>
            </div>
            <motion.span
              className="text-lime-500 text-sm font-bold"
              key={progress} // Forces re-render text for glitch effect occasionally if wanted, but fine without
            >
              {progress}%
            </motion.span>
          </div>

          <div className="h-[2px] w-full bg-zinc-800 relative overflow-hidden flex rounded-full">
            <motion.div
              className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-lime-600 to-lime-400 shadow-[0_0_10px_rgba(132,204,22,0.5)]"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative Frame Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute top-6 left-6 right-6 bottom-6 border border-white/5 pointer-events-none rounded-2xl hidden md:block"
      >
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-lime-500/50 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-lime-500/50 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-lime-500/50 -translate-x-1/2 translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-lime-500/50 translate-x-1/2 translate-y-1/2" />
      </motion.div>

      {/* Cyberpunk Footer Data */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-8 right-8 flex justify-between text-[10px] md:text-xs font-mono text-zinc-500 uppercase tracking-widest hidden sm:flex"
      >
        <span>OS_VER_1.4.2</span>
        <span className="text-center opacity-50">COCKROACH JANTA PARTY ENCRYPTED</span>
        <span>SECURE_BOND // SYS_READY</span>
      </motion.div>
    </motion.div>
  );
}

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* SEO Mastery: Google Search Console Verification Placeholder */}
        <meta name="google-site-verification" content="G-YOUR_SEARCH_CONSOLE_VERIFICATION_CODE" />
        {import.meta.env.VITE_GA_ID && (
          <>
            {/* SEO Mastery: GA4 Analytics */}
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_ID}`}
            ></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${import.meta.env.VITE_GA_ID}');
                `,
              }}
            />
          </>
        )}
        <link
          rel="icon"
          type="image/x-icon"
          href="https://res.cloudinary.com/dwlquotvw/image/upload/v1779218061/favicon_i2bss7.ico"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://res.cloudinary.com/dwlquotvw/image/upload/v1779218061/favicon-32x32_zfvobt.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="https://res.cloudinary.com/dwlquotvw/image/upload/v1779218061/favicon-16x16_nedlde.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://res.cloudinary.com/dwlquotvw/image/upload/v1779218061/apple-touch-icon_xsppdn.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="https://res.cloudinary.com/dwlquotvw/image/upload/v1779218062/android-chrome-192x192_gxtgg6.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="https://res.cloudinary.com/dwlquotvw/image/upload/v1779218062/android-chrome-512x512_bactvf.png"
        />
        <link rel="stylesheet" href={appCss} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-4 p-4 bg-red-900/20 border border-red-500/50 rounded text-left text-xs text-red-200 overflow-auto whitespace-pre-wrap max-h-60">
          <p className="font-bold">Error Details:</p>
          <p>{error.message}</p>
          {error.stack && <p className="mt-2 opacity-70">{error.stack}</p>}
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

import { Toaster } from "sonner";

import { HelmetProvider } from "react-helmet-async";

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Check if the user has already seen the splash screen in this session
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    if (hasSeenSplash) {
      setShowSplash(false);
    } else {
      sessionStorage.setItem("hasSeenSplash", "true");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence>
        {showSplash && <SplashAnimation onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>
      <Toaster position="top-center" theme="dark" />
      <Outlet />
    </QueryClientProvider>
  );
}
