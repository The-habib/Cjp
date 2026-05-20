import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter } from "@tanstack/react-router";
import { HeadContent, Scripts } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import appCss from "../styles.css?url";

function SplashAnimation({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4500); // splash duration
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[10000] bg-[#0d1a12] flex flex-col items-center justify-center pointer-events-none overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20 cr-dive-grain mix-blend-overlay"></div>
      
      {/* Scanning line */}
      <motion.div 
        className="absolute inset-0 w-full h-1 bg-lime-500/50 shadow-[0_0_15px_rgba(132,204,22,0.8)]"
        initial={{ top: "-10%" }}
        animate={{ top: "110%" }}
        transition={{ duration: 3, ease: "linear", repeat: Infinity }}
      />

      <motion.div
        initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center relative z-10"
      >
        <motion.div
          animate={{ 
            rotate: [0, -5, 5, -2, 2, 0],
            scale: [1, 1.05, 0.95, 1.02, 0.98, 1],
            x: [0, 2, -2, 1, -1, 0]
          }}
          transition={{ 
            duration: 0.4, 
            delay: 1.5,
            ease: "easeInOut"
          }}
        >
          <img 
            src="https://res.cloudinary.com/dwlquotvw/image/upload/v1779218062/android-chrome-192x192_gxtgg6.png" 
            alt="CJP Logo"
            className="w-28 h-28 mb-8 !drop-shadow-[0_0_15px_rgba(132,204,22,0.3)] filter sepia-[0.2] hue-rotate-90 saturate-[2]" 
          />
        </motion.div>

        <div className="relative">
          <motion.h1 
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter text-white uppercase text-center"
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            transition={{ delay: 0.5, duration: 1, ease: "circOut" }}
          >
            We Are <span className="text-lime-500">Bound</span>
          </motion.h1>
          
          {/* Glitch layers */}
          <motion.h1 
            className="absolute top-0 left-0 w-full text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter text-red-500 uppercase text-center opacity-70 mix-blend-screen"
            animate={{ 
              x: [0, -3, 3, -1, 0],
              y: [0, 1, -1, 0, 0],
              clipPath: ["inset(10% 0 80% 0)", "inset(40% 0 10% 0)", "inset(80% 0 5% 0)", "inset(20% 0 60% 0)", "inset(0% 0 0% 0)"],
              opacity: [0, 0.7, 0, 0.7, 0]
            }}
            transition={{ duration: 0.5, delay: 2, repeat: 2, repeatType: "mirror" }}
          >
            We Are <span className="text-red-500">Bound</span>
          </motion.h1>
          <motion.h1 
            className="absolute top-0 left-0 w-full text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter text-blue-500 uppercase text-center opacity-70 mix-blend-screen"
            animate={{ 
              x: [0, 3, -3, 1, 0],
              y: [0, -1, 1, 0, 0],
              clipPath: ["inset(80% 0 5% 0)", "inset(20% 0 60% 0)", "inset(10% 0 80% 0)", "inset(40% 0 10% 0)", "inset(0% 0 0% 0)"],
              opacity: [0, 0.7, 0, 0.7, 0]
            }}
            transition={{ duration: 0.5, delay: 2.1, repeat: 2, repeatType: "mirror" }}
          >
            We Are <span className="text-blue-500">Bound</span>
          </motion.h1>
        </div>

        <motion.div
          className="mt-8 flex flex-col items-center gap-3 w-64"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-lime-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 1.5, duration: 2.5, ease: "circOut" }}
            />
          </div>
          <div className="flex justify-between w-full text-xs font-mono text-lime-500/70 tracking-widest uppercase">
            <span>System</span>
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              Initializing...
            </motion.span>
          </div>
        </motion.div>
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
        <link rel="canonical" href="https://cockroachjantaparty.bond/" />
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
      <Outlet />
    </QueryClientProvider>
  );
}
