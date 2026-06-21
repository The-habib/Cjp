import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { cjpVideos, VideoData } from "../../data/videos";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, MessageCircle, Repeat2, Heart, Share, Bug, BadgeCheck, Home, Search, Bell, Mail, User, Image as ImageIcon, Video, Calendar, BarChart2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import { easingCurves, animationDurations, childVariants } from "../../lib/animations";

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
    links: [{ rel: "canonical", href: "https://cockroachjantaparty.bond/cockroach" }],
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
  const navigate = useNavigate();
  const [dynamicVideos, setDynamicVideos] = useState<VideoData[]>([]);
  const [activeTab, setActiveTab] = useState<"videos" | "replies" | "media">("videos");

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
  
  // Format dates relative if needed or just use literal
  const formatStat = (num: number) => {
    if (num > 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans flex justify-center relative isolate">
      {/* Grain */}
      <div className="pointer-events-none fixed inset-0 z-[-1] opacity-[0.08]" style={{ backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'2\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23n)\' opacity=\'0.35\'/></svg>")' }}></div>

      {/* Left Sidebar (Desktop) */}
      <header className="hidden sm:flex flex-col w-[80px] xl:w-[275px] pt-2 xl:pt-4 px-2 xl:px-4 h-screen sticky top-0 border-r border-white/10 z-10">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/" className="w-12 h-12 rounded-full hover:bg-[#181818] flex items-center justify-center mb-2 transition-colors">
            <Bug className="w-7 h-7 text-white" />
          </Link>
        </motion.div>
        <nav className="flex flex-col gap-2 w-full">
           <motion.div whileHover={{ x: 8 }} transition={{ duration: 0.2 }}>
             <Link to="/" className="flex items-center gap-4 p-3 rounded-full hover:bg-[#181818] transition-colors w-max">
               <Home className="w-7 h-7" />
               <span className="text-xl hidden xl:inline">Home</span>
             </Link>
           </motion.div>
           <motion.div whileHover={{ x: 8 }} transition={{ duration: 0.2 }} className="flex items-center gap-4 p-3 rounded-full hover:bg-[#181818] transition-colors w-max cursor-pointer text-white/50">
             <Search className="w-7 h-7" />
             <span className="text-xl hidden xl:inline">Explore</span>
           </motion.div>
           <motion.div whileHover={{ x: 8 }} transition={{ duration: 0.2 }} className="flex items-center gap-4 p-3 rounded-full hover:bg-[#181818] transition-colors w-max cursor-pointer text-white/50">
             <Bell className="w-7 h-7" />
             <span className="text-xl hidden xl:inline">Notifications</span>
           </motion.div>
           <motion.div whileHover={{ x: 8 }} transition={{ duration: 0.2 }} className="flex items-center gap-4 p-3 rounded-full hover:bg-[#181818] transition-colors w-max cursor-pointer text-white/50">
             <Mail className="w-7 h-7" />
             <span className="text-xl hidden xl:inline">Messages</span>
           </motion.div>
           <motion.div whileHover={{ x: 8 }} transition={{ duration: 0.2 }}>
             <Link to="/cockroach/profile" className="flex items-center gap-4 p-3 rounded-full hover:bg-[#181818] transition-colors w-max cursor-pointer text-white/50">
               <User className="w-7 h-7" />
               <span className="text-xl hidden xl:inline">Profile</span>
             </Link>
           </motion.div>
        </nav>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 bg-[#c8ff00] hover:bg-[#b0df00] text-black font-bold rounded-full w-12 h-12 xl:w-full xl:h-[52px] flex items-center justify-center transition-colors font-['Archivo_Black'] uppercase tracking-widest"
        >
          <span className="hidden xl:inline text-[17px]">Post</span>
          <Bug className="w-6 h-6 xl:hidden text-black" />
        </motion.button>
      </header>
      
      {/* Main Feed Column */}
      <main className="w-full sm:w-[600px] sm:border-r border-white/10 min-h-screen pb-20 sm:pb-0 z-10">
        
        {/* Sticky Header */}
        <motion.div className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/10">
          <motion.div className="px-4 py-3 flex items-center cursor-pointer">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link to="/" className="sm:hidden p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
                <ArrowLeft className="w-5 h-5"/>
              </Link>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold leading-tight font-['Archivo_Black'] uppercase tracking-tight ml-2 sm:ml-0"
            >
              Home
            </motion.h1>
          </motion.div>

          {/* Tab Bar Fake */}
          <div className="flex">
            <motion.div
               onClick={() => setActiveTab("videos")}
               whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
               whileTap={{ scale: 0.98 }}
               className="flex-1 text-center cursor-pointer pt-4 pb-0 font-bold flex justify-center transition-colors"
            >
              <motion.div
                animate={{ borderColor: activeTab === "videos" ? "#c8ff00" : "transparent", color: activeTab === "videos" ? "white" : "#888" }}
                transition={{ duration: 0.2 }}
                className={`pb-3 font-['Space_Mono'] uppercase border-b-4`}
              >
                For you
              </motion.div>
            </motion.div>
            <motion.div
               onClick={() => setActiveTab("replies")}
               whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
               whileTap={{ scale: 0.98 }}
               className={`flex-1 text-center cursor-pointer py-4 font-['Space_Mono'] uppercase transition-colors`}
            >
              <motion.div
                animate={{ color: activeTab === "replies" ? "white" : "#888" }}
                transition={{ duration: 0.2 }}
                className="font-bold"
              >
                Following
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Compose Box */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-white/10 p-4 flex gap-3 hidden sm:flex"
        >
          <div className="shrink-0">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link to="/cockroach/profile" className="w-10 h-10 rounded-full bg-[#0a0a0a] border border-[#333] flex items-center justify-center overflow-hidden hover:border-[#c8ff00] transition-colors relative">
                <span className="font-['Space_Mono'] text-[#c8ff00] text-sm font-bold tracking-tighter">CJP</span>
              </Link>
            </motion.div>
          </div>
          <div className="flex-1">
            <div className="py-2">
              <input
                type="text"
                placeholder="What is happening?!"
                className="w-full bg-transparent outline-none text-xl text-white placeholder-[#555] font-['Space_Mono']"
              />
            </div>
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/10">
              <div className="flex gap-1 text-[#c8ff00]">
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 rounded-full hover:bg-[#c8ff00]/10 transition-colors">
                  <ImageIcon className="w-5 h-5" />
                </motion.button>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 rounded-full hover:bg-[#c8ff00]/10 transition-colors">
                   <Video className="w-5 h-5" />
                </motion.button>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 rounded-full hover:bg-[#c8ff00]/10 transition-colors">
                  <BarChart2 className="w-5 h-5" />
                </motion.button>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 rounded-full hover:bg-[#c8ff00]/10 transition-colors hidden sm:block">
                  <Calendar className="w-5 h-5" />
                </motion.button>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#c8ff00] hover:bg-[#b0df00] text-black font-bold rounded-full px-5 py-2 transition-colors font-['Archivo_Black'] uppercase tracking-widest text-sm opacity-50 cursor-not-allowed"
              >
                Post
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Feed List */}
        <div>
           {activeTab === "videos" ? (
             <AnimatePresence>
               {allVideos.map((video, idx) => (
                 <motion.div
                   key={video.id}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   transition={{
                     duration: animationDurations.normal,
                     delay: idx * 0.05,
                     ease: easingCurves.easeOutCubic,
                   }}
                   onClick={() => navigate({ to: `/cockroach/${video.id}` })}
                   className="border-b border-white/10 p-4 hover:bg-white/[0.02] transition-colors cursor-pointer flex gap-3 group"
                 >
                {/* Avatar */}
                <div className="shrink-0 flex flex-col items-center">
                   <Link to="/cockroach/profile" onClick={(e) => e.stopPropagation()} className="w-10 h-10 rounded-full bg-[#0a0a0a] border border-[#333] flex items-center justify-center overflow-hidden hover:border-[#c8ff00] transition-colors relative">
                     <span className="font-['Space_Mono'] text-[#c8ff00] text-sm font-bold tracking-tighter">CJP</span>
                   </Link>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pb-1">
                  {/* Author Line */}
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-1 text-[15px] max-w-full">
                      <Link to="/cockroach/profile" onClick={(e) => e.stopPropagation()} className="font-bold hover:underline truncate font-['Space_Mono'] text-[14px] inline-flex items-center gap-1">
                        Cockroach Janta Party
                      </Link>
                      <BadgeCheck className="w-4 h-4 text-[#e4b524] shrink-0" fill="currentColor" stroke="black" />
                      <span className="text-[#888] shrink-0 font-['Space_Mono'] text-[13px]">@TheCJP</span>
                      <span className="text-[#888] shrink-0 font-['Space_Mono'] text-[13px]">·</span>
                      <span className="text-[#888] hover:underline shrink-0 text-xs whitespace-nowrap font-['Space_Mono']">{video.date}</span>
                    </div>
                  </div>

                  {/* Post Text - Handle multi-line */}
                  <div className="text-[15px] leading-normal whitespace-pre-wrap mb-3 break-words text-gray-200">
                    <span className="font-['Archivo_Black'] text-lg block mb-1 uppercase tracking-tight text-white gap-2 flex items-center">
                       {video?.title}
                       <span className="bg-white/10 text-white text-[10px] px-2 py-0.5 rounded font-['Space_Mono'] tracking-widest">{video?.source}</span>
                    </span>
                    {video?.description}
                  </div>
                  
                  {/* Media Attachment */}
                  <div 
                    className="w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] mb-3 aspect-video relative mt-3 group-hover:border-[#c8ff00]/50 transition-colors"
                    onClick={(e) => e.stopPropagation()} // Stop navigation when clicking video controls
                  >
                     {video?.embedUrl?.match(/\.(mp4|webm|ogg)$/i) || (video?.embedUrl?.includes("cloudinary.com") && !video?.embedUrl?.includes("youtube.com")) ? (
                      <video
                        src={video.embedUrl}
                        controls
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

                  {/* Actions */}
                  <div className="flex justify-between text-[#888] max-w-md mt-1 -ml-2 font-['Space_Mono']">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => { e.stopPropagation(); }}
                      className="flex items-center gap-2 hover:text-[#c8ff00] group/btn transition-colors"
                    >
                      <div className="p-2 rounded-full group-hover/btn:bg-[#c8ff00]/10 transition-colors"><MessageCircle className="w-[18px] h-[18px]" /></div>
                      <span className="text-[13px]">{formatStat(100 + (video.id.length * 12))}</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => { e.stopPropagation(); }}
                      className="flex items-center gap-2 hover:text-[#00ba7c] group/btn transition-colors"
                    >
                      <div className="p-2 rounded-full group-hover/btn:bg-[#00ba7c]/10 transition-colors"><Repeat2 className="w-[18px] h-[18px]" /></div>
                      <span className="text-[13px]">{formatStat(450 + (idx * 33))}</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => { e.stopPropagation(); }}
                      className="flex items-center gap-2 hover:text-[#f91880] group/btn transition-colors"
                    >
                      <div className="p-2 rounded-full group-hover/btn:bg-[#f91880]/10 transition-colors"><Heart className="w-[18px] h-[18px]" /></div>
                      <span className="text-[13px]">{formatStat(1200 + (idx * 156))}</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => { e.stopPropagation(); }}
                      className="flex items-center gap-2 hover:text-[#c8ff00] group/btn transition-colors"
                    >
                      <div className="p-2 rounded-full group-hover/btn:bg-[#c8ff00]/10 transition-colors"><BarChart2 className="w-[18px] h-[18px]" /></div>
                      <span className="text-[13px]">{formatStat(5000 + (idx * 850))}</span>
                    </motion.button>
                    <div className="flex gap-1">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => { e.stopPropagation(); }}
                        className="flex items-center gap-2 hover:text-[#c8ff00] group/btn transition-colors"
                      >
                        <div className="p-2 rounded-full group-hover/btn:bg-[#c8ff00]/10 transition-colors"><Share className="w-[18px] h-[18px]" /></div>
                      </motion.button>
                    </div>
                  </div>
                </div>
                 </motion.div>
               ))}
             </AnimatePresence>
           ) : (
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="p-8 text-center text-[#888] font-['Space_Mono']"
             >
               No {activeTab} yet.
             </motion.div>
           )}
        </div>
      </main>

      {/* Right Sidebar (Desktop) */}
      <aside className="hidden lg:block w-[350px] pt-3 px-8 h-screen sticky top-0 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative mb-4 group"
        >
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-[#888] group-focus-within:text-[#c8ff00]" />
          </div>
          <input
            type="text"
            placeholder="Search the swarm"
            className="w-full bg-[#0a0a0a] outline-none text-white rounded-full py-3 pl-12 pr-4 focus:bg-black focus:border focus:border-[#c8ff00] transition-colors border border-white/10 font-['Space_Mono'] text-sm"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#0a0a0a] rounded-2xl py-4 mb-4 border border-white/10"
        >
           <h2 className="text-xl font-bold mb-4 px-4 font-['Archivo_Black'] uppercase tracking-tight">What's happening</h2>
           {/* Trends */}
           <motion.div whileHover={{ x: 4 }} className="hover:bg-white/[0.03] px-4 py-2 cursor-pointer transition-colors mb-2">
             <div className="text-[#888] text-[12px] font-['Space_Mono'] uppercase">Politics · Trending</div>
             <div className="font-bold text-[15px] mt-0.5">#CockroachJantaParty</div>
             <div className="text-[#888] text-[12px] font-['Space_Mono'] mt-0.5">125K posts</div>
           </motion.div>
           <motion.div whileHover={{ x: 4 }} className="hover:bg-white/[0.03] px-4 py-2 cursor-pointer transition-colors mb-2">
             <div className="text-[#888] text-[12px] font-['Space_Mono'] uppercase">Trending in India</div>
             <div className="font-bold text-[15px] mt-0.5">Media Exposed</div>
             <div className="text-[#888] text-[12px] font-['Space_Mono'] mt-0.5">84.2K posts</div>
           </motion.div>
           <motion.div whileHover={{ x: 4 }} className="hover:bg-white/[0.03] px-4 py-2 cursor-pointer transition-colors">
             <div className="text-[#888] text-[12px] font-['Space_Mono'] uppercase">Entertainment · Trending</div>
             <div className="font-bold text-[15px] mt-0.5">The Swarm</div>
             <div className="text-[#888] text-[12px] font-['Space_Mono'] mt-0.5">42.1K posts</div>
           </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#0a0a0a] rounded-2xl py-4 border border-white/10"
        >
           <h2 className="text-xl font-bold mb-4 px-4 font-['Archivo_Black'] uppercase tracking-tight">Who to follow</h2>
           <motion.div whileHover={{ scale: 1.02 }} className="hover:bg-white/[0.03] px-4 py-3 cursor-pointer transition-colors flex justify-between items-center bg-[#050505]">
             <div className="flex gap-3 items-center w-full min-w-0 pr-2">
               <div className="w-10 h-10 rounded-full bg-white shrink-0"></div>
               <div className="flex flex-col min-w-0">
                 <div className="flex items-center gap-1">
                   <span className="font-bold text-[15px] hover:underline truncate mix-blend-difference">Anonymous</span>
                   <BadgeCheck className="w-[14px] h-[14px] text-gray-400 shrink-0" fill="currentColor" stroke="black" />
                 </div>
                 <span className="text-[#888] text-[13px] font-['Space_Mono'] truncate">@unknown_actor</span>
               </div>
             </div>
             <motion.button
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="bg-white text-black font-bold text-xs font-['Space_Mono'] px-4 py-1.5 rounded-full hover:bg-[#c8ff00] transition-colors uppercase tracking-widest"
             >
               Follow
             </motion.button>
           </motion.div>
        </motion.div>
      </aside>

      {/* Mobile Floating Action Button */}
      <button className="fixed sm:hidden bottom-20 right-4 w-14 h-14 bg-[#c8ff00] rounded-full flex items-center justify-center shadow-lg z-40 hover:bg-[#b0df00] transition-colors">
        <Bug className="w-6 h-6 text-black" />
      </button>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-[#050505] border-t border-white/10 flex justify-around items-center py-3 z-50 px-2 pb-[safe-area-inset-bottom]">
        <Link to="/cockroach" className="p-2 transition-colors">
          <Home className="w-6 h-6 text-white" />
        </Link>
        <button className="p-2 transition-colors text-[#888]">
          <Search className="w-6 h-6" />
        </button>
        <button className="p-2 transition-colors text-[#888]">
          <Bell className="w-6 h-6" />
        </button>
        <button className="p-2 transition-colors text-[#888]">
          <Mail className="w-6 h-6" />
        </button>
      </div>

    </div>
  );
}
