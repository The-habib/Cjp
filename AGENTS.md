# MISSION: Master-Level SEO React/Vite Architecture Build

You are an Elite Full-Stack Systems Architect and Technical SEO Master. Your goal is to optimize this Vite + React application into a world-class, SEO-dominant architecture. Every single post, image, and page must be instantly indexable, shareable, and ranked highly by Google web crawlers.

## TECH STACK

- **Framework**: React 18+ + Vite + TanStack Router (Client-Side SPA)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui + motion
- **Database**: Firebase Client SDK
- **SEO Strategy**: Build-Time Static Site Generation (SSG) via custom `prerender.ts` script.
- **Deployment Target**: Any Static Host (Vercel, Firebase Hosting, Netlify)

## STRICT ARCHITECTURAL REQUIREMENTS

### 1. Static Site Generation (SSG) & Prerendering

- You MUST utilize and maintain the custom `prerender.ts` script to pre-generate static `.html` files for ALL public-facing dynamic routes (e.g., `/cockroach/[id]`, `/`) during the `npm run build` step.
- Data fetching for dynamic routes MUST happen within `prerender.ts` during the build phase by querying Firebase directly, injecting the fully populated HTML structure (like titles, images, and descriptions) so that Google web crawlers receive the complete content immediately without having to execute JavaScript.

### 2. Dynamic SEO & Meta Data

- Every route component must dynamically manage its `<head>` tags to set content when navigated via client-side routing.
- The `prerender.ts` script MUST inject the following exact tags into the output `.html` files:
  - `<title>` (Max 60 chars)
  - `<meta name="description">` (Max 160 chars)
  - **Open Graph (OG)**: `og:title`, `og:description`, `og:image`, `og:url`, `og:type="article"`.
  - **Twitter Cards**: `twitter:card="summary_large_image"`, `twitter:title`, `twitter:description`, `twitter:image`.
- Canonical URLs must be explicitly injected to prevent duplicate content penalties.

### 3. Structured Data (JSON-LD)

- Inject `<script type="application/ld+json">` tags containing Schema.org structured data (e.g., `Article`, `VideoObject`, or `Organization`) into the HTML of relevant pages (`prerender.ts` handles the server output, component level handles client-side updates).
- Required JSON-LD fields: `headline`, `image`, `datePublished`, and `publisher/author` must be populated accurately from the live Firebase data snapshot.

### 4. Dynamic Sitemaps & Robots

- The `prerender.ts` script MUST automatically generate a dynamic `sitemap.xml` file inside the `dist/` folder that lists ALL generated routes (including all dynamic Firebase-driven posts).
- The `prerender.ts` script MUST generate a strict `robots.txt` that allows crawling of all posts but explicitly globally blocks administrative or restricted routes (e.g., `Disallow: /admin`).

### 5. Infinite Scroll / SEO Visible Data Hookup

- The home feed `/` must render visible static previews inside the `index.html` file via `prerender.ts` so bots can see the latest content.
- Pass rendering handover cleanly to the Client React App, keeping UI state hydration smooth.

### 6. Image Optimization & Semantic HTML

- Ensure a strict heading hierarchy (One `<h1>` per page, followed by `<h2>`, `<h3>`).
- Use `<article>`, `<section>`, `<nav>`, `<aside>`, and `<time>` tags accurately.
- Add descriptive, explicit `alt` tags to every single image.
- Since `next/image` is not available, ensure `<img>` tags use standard `loading="lazy"` (except for critical top-fold banners) and explicit width/height parameters to mitigate Cumulative Layout Shift (CLS).

## EXECUTION STEPS

1. Respect the Vite React App Router architecture.
2. Centralize SEO logic inside `prerender.ts` for crawlers and bot previews.
3. Automatically build out JSON-LD structured schema dynamically for individual resources.
4. Securely fetch data securely with Firebase client scripts during build tasks.
5. Reach 100% Lighthouse SEO scores on all static output artifacts.
