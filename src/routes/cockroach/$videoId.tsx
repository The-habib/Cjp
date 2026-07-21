import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { cjpVideos, VideoData } from "../../data/videos";
import {
  ArrowLeft,
  MessageCircle,
  Repeat2,
  Heart,
  Share,
  Bug,
  BadgeCheck,
  Home,
  Search,
  Bell,
  Mail,
  User,
  Bookmark,
  BarChart2,
} from "lucide-react";
import React from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "sonner";

export const Route = createFileRoute("/cockroach/$videoId")({
  loader: async ({ params }) => {
    let video = cjpVideos.find((v) => v.id === params.videoId) || null;
    if (!video) {
      try {
        const snap = await getDoc(doc(db, "videos", params.videoId));
        if (snap.exists()) {
          video = { id: snap.id, ...snap.data() } as VideoData;
        }
      } catch (e) {
        console.error(e);
      }
    }
    return video;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Not Found | CJP" },
          { name: "description", content: "Transmission not found." },
        ],
      };
    }
    const video = loaderData as VideoData;
    const thumbnail = video.thumbnailUrl || `https://cockroachjantaparty.bond/og-${video.id}.jpg`;
    return {
      meta: [
        { title: `${video.title} | Cockroach Media` },
        { name: "description", content: (video?.description || "").substring(0, 150) },
        { property: "og:title", content: `${video?.title} | Cockroach Media` },
        { property: "og:description", content: (video?.description || "").substring(0, 150) },
        { property: "og:type", content: "article" },
        { property: "og:site_name", content: "Cockroach Janta Party" },
        { property: "og:url", content: `https://cockroachjantaparty.bond/cockroach/${video?.id}` },
        { property: "og:image", content: thumbnail },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${video?.title} | Cockroach Media` },
        { name: "twitter:description", content: (video?.description || "").substring(0, 150) },
        { name: "twitter:image", content: thumbnail },
      ],
      links: [{ rel: "canonical", href: `https://cockroachjantaparty.bond/cockroach/${video.id}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: video?.title,
            description: (video?.description || "").replace(/\n/g, " "),
            image: thumbnail,
            datePublished: `${video?.date}T00:00:00Z`,
            dateModified: `${video?.date}T00:00:00Z`,
            author: {
              "@type": "Organization",
              name: "Cockroach Janta Party",
            },
            publisher: {
              "@type": "Organization",
              name: "Cockroach Janta Party",
              logo: {
                "@type": "ImageObject",
                url: "https://cockroachjantaparty.bond/og-image.jpg",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://cockroachjantaparty.bond/cockroach/${video?.id}`,
            },
            video: {
              "@type": "VideoObject",
              name: video?.title,
              description: (video?.description || "").replace(/\n/g, " "),
              thumbnailUrl: thumbnail,
              uploadDate: `${video?.date}T00:00:00Z`,
              contentUrl: video?.embedUrl,
            },
          }),
        },
      ],
    };
  },
  component: CockroachDeepDive,
});

function CockroachDeepDive() {
  const { videoId } = Route.useParams();
  const video = Route.useLoaderData();

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
          title: `${video?.title} | Cockroach Media`,
          text: (video?.description || "").replace(/\\n/g, " ").substring(0, 100) + "...",
          url: url,
        });
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name !== "AbortError")
          console.error("Error sharing", err);
        else if (err instanceof Error && err.name !== "AbortError")
          console.error("Error sharing", err);
      }
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans flex justify-center relative isolate">
      {/* Grain */}
      <div
        className="pointer-events-none fixed inset-0 z-[-1] opacity-[0.08]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.35'/></svg>\")",
        }}
      ></div>

      {/* Left Sidebar (Desktop) */}
      <header className="hidden sm:flex flex-col w-[80px] xl:w-[275px] pt-2 xl:pt-4 px-2 xl:px-4 h-screen sticky top-0 border-r border-white/10 z-10">
        <Link
          to="/"
          className="w-12 h-12 rounded-full hover:bg-[#181818] flex items-center justify-center mb-2 transition-colors"
        >
          <Bug className="w-7 h-7 text-white" />
        </Link>
        <nav className="flex flex-col gap-2 w-full">
          <Link
            to="/"
            className="flex items-center gap-4 p-3 rounded-full hover:bg-[#181818] transition-colors w-max"
          >
            <Home className="w-7 h-7" />
            <span className="text-xl hidden xl:inline">Home</span>
          </Link>
          <div className="flex items-center gap-4 p-3 rounded-full hover:bg-[#181818] transition-colors w-max cursor-pointer text-white/50">
            <Search className="w-7 h-7" />
            <span className="text-xl hidden xl:inline">Explore</span>
          </div>
          <div className="flex items-center gap-4 p-3 rounded-full hover:bg-[#181818] transition-colors w-max cursor-pointer text-white/50">
            <Bell className="w-7 h-7" />
            <span className="text-xl hidden xl:inline">Notifications</span>
          </div>
          <div className="flex items-center gap-4 p-3 rounded-full hover:bg-[#181818] transition-colors w-max cursor-pointer text-white/50">
            <Mail className="w-7 h-7" />
            <span className="text-xl hidden xl:inline">Messages</span>
          </div>
          <div className="flex items-center gap-4 p-3 rounded-full hover:bg-[#181818] transition-colors w-max cursor-pointer text-white/50">
            <Bookmark className="w-7 h-7" />
            <span className="text-xl hidden xl:inline">Bookmarks</span>
          </div>
          <Link
            to="/cockroach/profile"
            className="flex items-center gap-4 p-3 rounded-full hover:bg-[#181818] transition-colors w-max cursor-pointer text-white/50"
          >
            <User className="w-7 h-7" />
            <span className="text-xl hidden xl:inline">Profile</span>
          </Link>
        </nav>

        <button className="mt-4 bg-[#c8ff00] hover:bg-[#b0df00] text-black font-bold rounded-full w-12 h-12 xl:w-full xl:h-[52px] flex items-center justify-center transition-colors font-['Archivo_Black'] uppercase tracking-widest">
          <span className="hidden xl:inline text-[17px]">Post</span>
          <Bug className="w-6 h-6 xl:hidden text-black" />
        </button>
      </header>

      {/* Main Column */}
      <main className="w-full sm:w-[600px] sm:border-r border-white/10 min-h-screen pb-20 sm:pb-0 z-10">
        {/* Sticky Header */}
        <div className="sticky top-0 z-50 bg-[#050505]/70 backdrop-blur-md border-b border-white/10 px-4 py-3 flex gap-6 items-center">
          <button
            onClick={() => navigate({ to: "/cockroach" })}
            className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold leading-tight font-['Archivo_Black'] uppercase tracking-tight">
            Post
          </h1>
        </div>

        {/* The Post View */}
        <div className="p-4 border-b border-white/10">
          {/* Author */}
          <div className="flex gap-3 mb-3 items-center">
            <div className="shrink-0">
              <Link
                to="/cockroach/profile"
                className="w-11 h-11 rounded-full bg-[#0a0a0a] border border-[#333] flex items-center justify-center overflow-hidden hover:border-[#c8ff00] transition-colors relative"
              >
                <span className="font-['Space_Mono'] text-[#c8ff00] text-sm font-bold tracking-tighter">
                  CJP
                </span>
              </Link>
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <div className="flex items-center gap-1 text-[15px] max-w-full leading-tight">
                <Link
                  to="/cockroach/profile"
                  className="font-bold hover:underline truncate font-['Space_Mono'] text-[14px]"
                >
                  Cockroach Janta Party
                </Link>
                <BadgeCheck
                  className="w-4 h-4 text-[#e4b524] shrink-0"
                  fill="currentColor"
                  stroke="black"
                />
              </div>
              <span className="text-[#888] text-[13px] leading-tight font-['Space_Mono'] mt-0.5">
                @TheCJP
              </span>
            </div>
          </div>

          {/* Text */}
          <div className="text-[17px] leading-normal whitespace-pre-wrap break-words mb-4 text-gray-200">
            <span className="font-['Archivo_Black'] text-xl block mb-2 uppercase tracking-tight text-white gap-2 flex items-center">
              {video?.title}
              <span className="bg-white/10 text-white text-[10px] px-2 py-0.5 rounded font-['Space_Mono'] tracking-widest">
                {video?.source}
              </span>
            </span>
            {video?.description}
          </div>

          {/* Media */}
          <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] mb-4 relative aspect-video">
            {video?.embedUrl?.match(/\.(mp4|webm|ogg)$/i) ||
            (video?.embedUrl?.includes("cloudinary.com") &&
              !video?.embedUrl?.includes("youtube.com")) ? (
              <video
                src={video.embedUrl}
                controls
                autoPlay
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <iframe
                src={video.embedUrl}
                title={`Video: ${video.title}`}
                loading="lazy"
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allowFullScreen
              />
            )}
          </div>

          {/* Date & Views */}
          <div className="text-[#888] text-[14px] pb-4 flex gap-1 font-['Space_Mono']">
            <span className="hover:underline cursor-pointer">{video.date}</span>
            <span>·</span>
            <span className="font-bold text-white">
              {(Math.random() * 50 + 10).toFixed(1)}K
            </span>{" "}
            Views
          </div>

          <div className="border-t border-white/10 py-3 flex text-[#888] text-[14px] gap-6 font-['Space_Mono']">
            <div className="flex gap-1">
              <span className="font-bold text-white">{(Math.random() * 10).toFixed(1)}K</span>{" "}
              Reposts
            </div>
            <div className="flex gap-1">
              <span className="font-bold text-white">85</span> Quotes
            </div>
            <div className="flex gap-1">
              <span className="font-bold text-white">{(Math.random() * 20).toFixed(1)}K</span> Likes
            </div>
            <div className="flex gap-1">
              <span className="font-bold text-white">300</span> Bookmarks
            </div>
          </div>

          <div className="border-t border-white/10 pt-1 flex justify-between text-[#888] mt-1 -mx-2 px-2">
            <button
              aria-label="Reply"
              className="flex items-center gap-2 hover:text-[#c8ff00] group/btn transition-colors"
            >
              <div className="p-2 rounded-full group-hover/btn:bg-[#c8ff00]/10 transition-colors">
                <MessageCircle className="w-[22px] h-[22px]" />
              </div>
            </button>
            <button
              aria-label="Repost"
              className="flex items-center gap-2 hover:text-[#00ba7c] group/btn transition-colors"
            >
              <div className="p-2 rounded-full group-hover/btn:bg-[#00ba7c]/10 transition-colors">
                <Repeat2 className="w-[22px] h-[22px]" />
              </div>
            </button>
            <button
              aria-label="Like"
              className="flex items-center gap-2 hover:text-[#f91880] group/btn transition-colors"
            >
              <div className="p-2 rounded-full group-hover/btn:bg-[#f91880]/10 transition-colors">
                <Heart className="w-[22px] h-[22px]" />
              </div>
            </button>
            <button
              aria-label="View analytics"
              className="flex items-center gap-2 hover:text-[#c8ff00] group/btn transition-colors"
            >
              <div className="p-2 rounded-full group-hover/btn:bg-[#c8ff00]/10 transition-colors">
                <BarChart2 className="w-[22px] h-[22px]" />
              </div>
            </button>
            <div className="flex gap-1">
              <button
                aria-label="Bookmark"
                className="flex items-center gap-2 hover:text-[#c8ff00] group/btn transition-colors"
              >
                <div className="p-2 rounded-full group-hover/btn:bg-[#c8ff00]/10 transition-colors">
                  <Bookmark className="w-[22px] h-[22px]" />
                </div>
              </button>
              <button
                aria-label="Share"
                className="flex items-center gap-2 hover:text-[#00f0ff] group/btn transition-colors"
                onClick={handleShare}
              >
                <div className="p-2 rounded-full group-hover/btn:bg-[#00f0ff]/10 transition-colors">
                  <Share className="w-[22px] h-[22px]" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Reply input (Fake) */}
        <div className="p-4 border-b border-white/10 flex gap-3 pb-8">
          <div className="w-10 h-10 rounded-full bg-[#0a0a0a] border border-[#333] text-white flex items-center justify-center font-bold text-xl shrink-0 font-['Space_Mono']">
            ?
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Post your reply"
              className="w-full bg-transparent outline-none text-xl mt-1 placeholder-[#888]"
            />
            <div className="flex justify-between items-center border-t border-white/10 mt-4 pt-3">
              <div className="text-[#c8ff00] flex gap-4"></div>
              <button
                disabled
                className="bg-[#c8ff00]/50 text-black/50 font-bold rounded-full px-4 py-1.5 cursor-not-allowed font-['Archivo_Black'] uppercase tracking-wide"
              >
                Reply
              </button>
            </div>
          </div>
        </div>

        {/* Fake Replies */}
        {[
          {
            name: "Anonymous",
            handle: "@unknown_023",
            text: "They can't hide this forever.",
            time: "2h",
          },
          {
            name: "Truth Seeker",
            handle: "@SeekerDaily1",
            text: "When will the mainstream media cover this?? 🤬",
            time: "5h",
          },
          { name: "S. Rao", handle: "@srao_99", text: "Shared. Let the swarm grow.", time: "8h" },
        ].map((reply, i) => (
          <div
            key={i}
            className="border-b border-white/10 p-4 flex gap-3 hover:bg-white/[0.02] transition-colors cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-[#111] shrink-0 border border-white/5"></div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 text-[15px] mb-1 font-['Space_Mono'] text-[13px]">
                <span className="font-bold hover:underline truncate text-white">{reply.name}</span>
                {reply.name === "Anonymous" && (
                  <BadgeCheck
                    className="w-[14px] h-[14px] text-gray-400 shrink-0"
                    fill="currentColor"
                    stroke="black"
                  />
                )}
                {reply.name !== "Anonymous" && (
                  <BadgeCheck
                    className="w-[14px] h-[14px] text-[#00ba7c] shrink-0"
                    fill="currentColor"
                    stroke="black"
                  />
                )}
                <span className="text-[#888] shrink-0">{reply.handle}</span>
                <span className="text-[#888] shrink-0">·</span>
                <span className="text-[#888] hover:underline shrink-0 text-xs">{reply.time}</span>
              </div>
              <div className="text-[15px] leading-normal whitespace-pre-wrap mb-2 text-gray-200">
                {reply.text}
              </div>
              <div className="flex justify-between text-[#888] max-w-md -ml-2 font-['Space_Mono']">
                <button
                  aria-label="Reply"
                  className="p-2 hover:bg-[#c8ff00]/10 hover:text-[#c8ff00] rounded-full transition-colors"
                >
                  <MessageCircle className="w-[18px] h-[18px]" />
                </button>
                <button
                  aria-label="Repost"
                  className="p-2 hover:bg-[#00ba7c]/10 hover:text-[#00ba7c] rounded-full transition-colors"
                >
                  <Repeat2 className="w-[18px] h-[18px]" />
                </button>
                <button
                  aria-label="Like"
                  className="p-2 hover:bg-[#f91880]/10 hover:text-[#f91880] rounded-full transition-colors"
                >
                  <Heart className="w-[18px] h-[18px]" />
                </button>
                <button
                  aria-label="View analytics"
                  className="p-2 hover:bg-[#c8ff00]/10 hover:text-[#c8ff00] rounded-full transition-colors"
                >
                  <BarChart2 className="w-[18px] h-[18px]" />
                </button>
                <div className="flex gap-1">
                  <button
                    aria-label="Bookmark"
                    className="p-2 hover:bg-[#c8ff00]/10 hover:text-[#c8ff00] rounded-full transition-colors"
                  >
                    <Bookmark className="w-[18px] h-[18px]" />
                  </button>
                  <button
                    aria-label="Share"
                    className="p-2 hover:bg-[#00f0ff]/10 hover:text-[#00f0ff] rounded-full transition-colors"
                  >
                    <Share className="w-[18px] h-[18px]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Right Sidebar (Desktop) */}
      <aside className="hidden lg:block w-[350px] pt-3 px-8 h-screen sticky top-0 z-10">
        <div className="relative mb-4 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-[#888] group-focus-within:text-[#c8ff00]" />
          </div>
          <input
            type="text"
            placeholder="Search the swarm"
            className="w-full bg-[#0a0a0a] outline-none text-white rounded-full py-3 pl-12 pr-4 focus:bg-black focus:border focus:border-[#c8ff00] transition-colors border border-white/10 font-['Space_Mono'] text-sm"
          />
        </div>

        <div className="bg-[#0a0a0a] rounded-2xl py-4 border border-white/10">
          <h2 className="text-xl font-bold mb-4 px-4 font-['Archivo_Black'] uppercase tracking-tight">
            Trending
          </h2>
          <div className="hover:bg-white/[0.03] px-4 py-2 cursor-pointer transition-colors mb-2">
            <div className="text-[#888] text-[12px] font-['Space_Mono'] uppercase">
              Truth Exposed
            </div>
            <div className="font-bold text-[15px] mt-0.5">#TheSwarmIsHere</div>
            <div className="text-[#888] text-[12px] font-['Space_Mono'] mt-0.5">2M+ posts</div>
          </div>
          <div className="hover:bg-white/[0.03] px-4 py-2 cursor-pointer transition-colors">
            <div className="text-[#888] text-[12px] font-['Space_Mono'] uppercase">Politics</div>
            <div className="font-bold text-[15px] mt-0.5">System Failure</div>
            <div className="text-[#888] text-[12px] font-['Space_Mono'] mt-0.5">890K posts</div>
          </div>
        </div>
      </aside>

      {/* Mobile Floating Action Button */}
      <button
        className="fixed sm:hidden bottom-20 right-4 w-14 h-14 bg-[#c8ff00] rounded-full flex items-center justify-center shadow-lg z-40 hover:bg-[#b0df00] transition-colors"
        aria-label="Create new post"
      >
        <Bug className="w-6 h-6 text-black" />
      </button>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-[#050505] border-t border-white/10 flex justify-around items-center py-3 z-50 px-2 pb-[safe-area-inset-bottom]">
        <Link to="/cockroach" className="p-2 transition-colors" aria-label="Home">
          <Home className="w-6 h-6 text-white" />
        </Link>
        <button className="p-2 transition-colors text-[#888]" aria-label="Search">
          <Search className="w-6 h-6" />
        </button>
        <button className="p-2 transition-colors text-[#888]" aria-label="Notifications">
          <Bell className="w-6 h-6" />
        </button>
        <button className="p-2 transition-colors text-[#888]" aria-label="Messages">
          <Mail className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
