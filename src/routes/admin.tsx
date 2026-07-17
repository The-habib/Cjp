import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import { CloudinaryUploader } from "../components/CloudinaryUploader";
import { toast } from "sonner";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
} from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { motion } from "motion/react";

export const Route = createFileRoute("/admin")({
  component: AdminPanel,
});

const ALLOWED_EMAILS = ["tgff28970@gmail.com", "theogaidev@gmail.com"];

function AdminPanel() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [registrations, setRegistrations] = useState<Record<string, unknown>[]>([]);
  const [videos, setVideos] = useState<Record<string, unknown>[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"registrations" | "videos" | "config">(
    "registrations",
  );

  // Config
  const [baseMemberCount, setBaseMemberCount] = useState<number>(0);
  const [isConfigSaving, setIsConfigSaving] = useState(false);

  // Swarm Form/Data logic
  const [searchTerm, setSearchTerm] = useState("");

  // Video Form
  const [editVideoId, setEditVideoId] = useState<string | null>(null);
  const resetVideoState = () => ({
    title: "",
    description: "",
    embedUrl: "",
    thumbnailUrl: "",
    source: "Vault Archive",
    topic: "Accountability",
    location: "Classified",
    status: "Exposed",
    censorship: "Broken",
    quote: "",
    callToAction: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [newVideo, setNewVideo] = useState(resetVideoState());
  const [isDeployingVideo, setIsDeployingVideo] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(localStorage.getItem("vercelWebhookUrl") || "");
  const [isRebuilding, setIsRebuilding] = useState(false);

  useEffect(() => {
    localStorage.setItem("vercelWebhookUrl", webhookUrl);
  }, [webhookUrl]);

  const triggerVercelRebuild = async () => {
    if (!webhookUrl) return;
    setIsRebuilding(true);
    try {
      await fetch(webhookUrl, { method: "POST" });
      toast.success("Vercel rebuild triggered successfully!");
    } catch (e) {
      console.error(e);
      toast.error("Failed to trigger Vercel rebuild");
    } finally {
      setIsRebuilding(false);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      // Auto-logout if not allowed
      if (u && u.email && !ALLOWED_EMAILS.includes(u.email)) {
        toast.error("Unauthorized access.");
        signOut(auth);
      } else {
        if (u) {
          fetchRegistrations();
          fetchVideos();
          fetchConfig();
        }
      }
    });
    return unsub;
  }, []);

  const fetchConfig = async () => {
    try {
      const docRef = doc(db, "settings", "stats");
      const snap = await getDoc(docRef);
      if (snap.exists() && snap.data().baseMemberCount !== undefined) {
        setBaseMemberCount(snap.data().baseMemberCount);
      }
    } catch (e: unknown) {
      console.error(e);
    }
  };

  const saveConfig = async () => {
    setIsConfigSaving(true);
    try {
      const docRef = doc(db, "settings", "stats");
      await setDoc(docRef, { baseMemberCount }, { merge: true });
      toast.success("Config saved successfully!");
    } catch (e: unknown) {
      console.error(e);
      toast.error("Failed to save config: " + (e instanceof Error ? e.message : String(e)));
    } finally {
      setIsConfigSaving(false);
    }
  };

  const fetchRegistrations = async () => {
    setDataLoading(true);
    try {
      const colRef = collection(db, "registrations");
      const q = query(colRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRegistrations(data);
    } catch (e: unknown) {
      console.error(e);
      toast.error((e instanceof Error ? e.message : String(e)) || "Failed to fetch registrations.");
    } finally {
      setDataLoading(false);
    }
  };

  const fetchVideos = async () => {
    try {
      const colRef = collection(db, "videos");
      const q = query(colRef, orderBy("date", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVideos(data);
    } catch (e: unknown) {
      console.error(e);
      toast.error((e instanceof Error ? e.message : String(e)) || "Failed to fetch videos.");
    }
  };

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      if (res.user.email && !ALLOWED_EMAILS.includes(res.user.email)) {
        toast.error("Unauthorized access.");
        await signOut(auth);
      } else {
        toast.success("Authenticated successfully");
      }
    } catch (e: unknown) {
      console.error(e);
      toast.error(e instanceof Error ? e.message : String(e));
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setRegistrations([]);
    setVideos([]);
  };

  // ⚡ Bolt: Memoize filteredRegistrations and hoist toLowerCase to avoid O(N * 3) string ops
  const filteredRegistrations = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return registrations.filter(
      (r) =>
        (r.name as string)?.toLowerCase().includes(searchLower) ||
        (r.email as string)?.toLowerCase().includes(searchLower) ||
        (r.twitterHandle as string)?.toLowerCase().includes(searchLower),
    );
  }, [registrations, searchTerm]);

  const handleExportCSV = () => {
    const headers = ["Name", "Email", "Twitter", "Phone", "Lazy", "Online", "Cockroach", "Date"];
    const rows = filteredRegistrations.map((r) => [
      `"${r.name || ""}"`,
      `"${r.email || ""}"`,
      `"${r.twitterHandle || ""}"`,
      `"${r.phone || ""}"`,
      `"${r.lazy || ""}"`,
      `"${r.chronicallyOnline || ""}"`,
      `"${r.identifyAsCockroach || ""}"`,
      `"${(r as { createdAt?: { toDate?: () => Date } }).createdAt?.toDate ? (r as { createdAt?: { toDate?: () => Date } }).createdAt?.toDate?.().toLocaleDateString() : ""}"`,
    ]);
    const csvContext = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContext], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cjp_swarm_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteRegistration = async (id: string) => {
    if (!confirm("Are you sure you want to PERMANENTLY remove this cockroach from the swarm?"))
      return;
    try {
      await deleteDoc(doc(db, "registrations", id));
      toast.success("Cockroach systematically removed from swarm.");
      await fetchRegistrations();
    } catch (e: unknown) {
      toast.error((e instanceof Error ? e.message : String(e)) || "Failed to delete from swarm.");
    }
  };

  const startEditVideo = (video: Record<string, unknown>) => {
    setEditVideoId(video.id as string);
    setNewVideo({
      title: (video.title as string) || "",
      description: (video.description as string) || "",
      embedUrl: (video.embedUrl as string) || "",
      thumbnailUrl: (video.thumbnailUrl as string) || "",
      source: (video.source as string) || "Vault Archive",
      topic: (video.topic as string) || "Accountability",
      location: (video.location as string) || "Classified",
      status: (video.status as string) || "Exposed",
      censorship: (video.censorship as string) || "Broken",
      quote: (video.quote as string) || "",
      callToAction: (video.callToAction as string) || "",
      date: (video.date as string) || new Date().toISOString().split("T")[0],
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEditVideo = () => {
    setEditVideoId(null);
    setNewVideo(resetVideoState());
  };

  const handleCreateVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeployingVideo(true);
    try {
      if (editVideoId) {
        await updateDoc(doc(db, "videos", editVideoId), {
          ...newVideo,
        });
        setEditVideoId(null);
      } else {
        const colRef = collection(db, "videos");
        await addDoc(colRef, {
          ...newVideo,
          createdAt: new Date(),
        });
      }
      setNewVideo(resetVideoState());
      toast.success(editVideoId ? "Video updated successfully." : "Video deployed successfully.");
      await fetchVideos();
      await triggerVercelRebuild();
    } catch (e: unknown) {
      console.error(e);
      toast.error((e instanceof Error ? e.message : String(e)) || "Failed to deploy video.");
    } finally {
      setIsDeployingVideo(false);
    }
  };

  const handleDeleteVideo = async (id: string) => {
    if (!confirm("Are you sure you want to delete this video?")) return;
    try {
      await deleteDoc(doc(db, "videos", id));
      toast.success("Video deleted.");
      await fetchVideos();
      await triggerVercelRebuild();
    } catch (e: unknown) {
      console.error(e);
      toast.error((e instanceof Error ? e.message : String(e)) || "Failed to delete video.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center font-mono">
        Loading...
      </div>
    );
  }

  if (!user || (user.email && !ALLOWED_EMAILS.includes(user.email))) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#f5f5f5] flex items-center justify-center font-mono p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-[#111] border-2 border-[#1a1a1a] p-8 rounded-2xl shadow-2xl"
        >
          <div className="text-center mb-8">
            <span className="text-4xl mb-4 block">🪳</span>
            <h1 className="text-2xl font-black uppercase tracking-widest text-[#c8ff00] mb-2 font-['Archivo_Black']">
              COMMAND CENTER
            </h1>
            <p className="text-[#888] text-sm">Classified access only.</p>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-[#c8ff00] hover:bg-[#a6d800] text-black font-bold uppercase tracking-wider py-4 rounded-xl transition-colors font-['Space_Mono']"
          >
            Authenticate
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f5] font-['Inter']">
      <nav className="sticky top-0 z-50 border-b border-[#1a1a1a] p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto overflow-hidden">
          <span className="text-2xl md:text-3xl shrink-0">🪳</span>
          <div className="min-w-0">
            <h1 className="font-['Archivo_Black'] text-lg md:text-xl tracking-wider text-[#c8ff00] uppercase truncate">
              CJP Admin Dash
            </h1>
            <p className="text-[10px] md:text-xs text-[#888] font-['Space_Mono'] truncate">
              Identified as: {user.email}
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full md:w-auto">
          <div className="flex bg-[#111] p-1 rounded-lg border border-[#333] w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("registrations")}
              className={`flex-1 sm:flex-none px-3 md:px-4 py-2 font-['Space_Mono'] text-[10px] md:text-xs uppercase rounded-md transition-colors ${
                activeTab === "registrations"
                  ? "bg-[#c8ff00] text-black font-bold"
                  : "text-[#888] hover:text-white"
              }`}
            >
              Swarm Data
            </button>
            <button
              onClick={() => setActiveTab("videos")}
              className={`flex-1 sm:flex-none px-3 md:px-4 py-2 font-['Space_Mono'] text-[10px] md:text-xs uppercase rounded-md transition-colors ${
                activeTab === "videos"
                  ? "bg-[#c8ff00] text-black font-bold"
                  : "text-[#888] hover:text-white"
              }`}
            >
              Cockroach Media
            </button>
            <button
              onClick={() => setActiveTab("config")}
              className={`flex-1 sm:flex-none px-3 md:px-4 py-2 font-['Space_Mono'] text-[10px] md:text-xs uppercase rounded-md transition-colors ${
                activeTab === "config"
                  ? "bg-[#c8ff00] text-black font-bold"
                  : "text-[#888] hover:text-white"
              }`}
            >
              Site Config
            </button>
          </div>
          <button
            onClick={handleLogout}
            className="w-full sm:w-auto text-[10px] md:text-xs font-['Space_Mono'] uppercase bg-[#1a1a1a] px-4 py-2 hover:bg-red-900/40 hover:text-red-400 transition-colors rounded-lg border border-[#333]"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="p-8 max-w-7xl mx-auto">
        {activeTab === "registrations" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-wider mb-2 font-['Archivo_Black']">
                  Registered Swarm
                </h2>
                <p className="text-[#888] font-mono text-sm">
                  Total cockroaches: {filteredRegistrations.length}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Seach ID tags..."
                  className="bg-[#111] border border-[#333] px-3 py-2 rounded text-sm text-[#ddd] outline-none focus:border-[#c8ff00] font-mono transition-colors"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  onClick={handleExportCSV}
                  className="text-xs font-['Space_Mono'] bg-[#1a1a1a] text-[#ddd] border border-[#333] px-4 py-2 font-bold uppercase rounded hover:bg-[#222] transition-colors"
                >
                  Export CSV
                </button>
                <button
                  onClick={fetchRegistrations}
                  className="text-xs font-['Space_Mono'] bg-[#c8ff00] text-black px-4 py-2 font-bold uppercase rounded hover:bg-[#a6d800] transition-colors"
                >
                  {dataLoading ? "Refreshing..." : "Refresh Data"}
                </button>
              </div>
            </header>

            <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl overflow-x-auto shadow-2xl">
              <table className="w-full text-left font-['Space_Mono'] text-sm">
                <thead className="bg-[#111] text-[#888]">
                  <tr>
                    <th className="p-4 font-normal uppercase tracking-wider">Name</th>
                    <th className="p-4 font-normal uppercase tracking-wider">Email</th>
                    <th className="p-4 font-normal uppercase tracking-wider">Twitter</th>
                    <th className="p-4 font-normal uppercase tracking-wider">Phone</th>
                    <th className="p-4 font-normal uppercase tracking-wider text-center">Lazy</th>
                    <th className="p-4 font-normal uppercase tracking-wider text-center">Online</th>
                    <th className="p-4 font-normal uppercase tracking-wider text-center">
                      Cockroach
                    </th>
                    <th className="p-4 font-normal uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1a1a1a]">
                  {filteredRegistrations.length === 0 && !dataLoading && (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-[#555]">
                        No registrations found. Or you lack permissions.
                      </td>
                    </tr>
                  )}
                  {filteredRegistrations.map((r) => (
                    <tr key={r.id as string} className="hover:bg-[#111] transition-colors">
                      <td className="p-4 font-['Inter'] font-semibold">
                        {r.name as React.ReactNode}
                      </td>
                      <td className="p-4 text-[#888]">{r.email as React.ReactNode}</td>
                      <td className="p-4">
                        {r.twitterHandle ? (
                          <span className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded">
                            {r.twitterHandle as React.ReactNode}
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="p-4 text-[#888]">
                        {r.phone ? (r.phone as React.ReactNode) : "-"}
                      </td>
                      <td className="p-4 text-center">{r.lazy as React.ReactNode}</td>
                      <td className="p-4 text-center">{r.chronicallyOnline as React.ReactNode}</td>
                      <td className="p-4 text-center">
                        {r.identifyAsCockroach === "Yes" ? (
                          <span className="text-[#c8ff00]">Yes</span>
                        ) : (
                          <span className="text-red-400">No</span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteRegistration(r.id as string)}
                          className="text-xs text-red-500 hover:text-red-400 bg-red-900/20 hover:bg-red-900/40 px-2 py-1 rounded transition-colors uppercase"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === "videos" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-1 flex flex-col gap-8">
              <div className="bg-[#111] border border-[#1a1a1a] rounded-2xl p-6 shadow-2xl">
                <h3 className="text-sm font-black uppercase tracking-wider mb-4 font-['Archivo_Black'] text-white">
                  Vercel Production Sync
                </h3>
                <p className="text-xs text-[#888] font-mono mb-4 leading-relaxed">
                  Provide your Vercel Deploy Hook URL to automatically rebuild the static sitemap
                  and video metadata for SEO when you deploy a new video.
                </p>
                <div className="flex flex-col gap-3">
                  <input
                    type="url"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    placeholder="https://api.vercel.com/v1/integrations/deploy/..."
                    className="w-full bg-[#050505] border border-[#333] rounded px-3 py-2 text-white focus:border-[#c8ff00] focus:ring-1 focus:ring-[#c8ff00] outline-none transition-all text-xs font-mono"
                  />
                  <button
                    onClick={triggerVercelRebuild}
                    disabled={!webhookUrl || isRebuilding}
                    className="w-full bg-[#1a1a1a] text-[#ddd] border border-[#333] font-bold uppercase py-2 text-xs rounded hover:bg-[#222] transition-colors disabled:opacity-50"
                  >
                    {isRebuilding ? "Triggering Rebuild..." : "Force Rebuild"}
                  </button>
                </div>
              </div>

              <div className="bg-[#111] border border-[#1a1a1a] rounded-2xl p-6 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-black uppercase tracking-wider font-['Archivo_Black'] text-[#c8ff00]">
                    {editVideoId ? "Edit Video Post" : "New Video Post"}
                  </h2>
                  {editVideoId && (
                    <button
                      onClick={cancelEditVideo}
                      className="text-xs text-[#888] hover:text-white uppercase font-mono bg-[#222] px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  )}
                </div>
                <form onSubmit={handleCreateVideo} className="space-y-4">
                  <div>
                    <label className="block text-xs font-['Space_Mono'] uppercase mb-1 text-[#888]">
                      Title
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full bg-[#050505] border border-[#333] rounded px-3 py-2 text-white focus:border-[#c8ff00] focus:ring-1 focus:ring-[#c8ff00] outline-none transition-all"
                      value={newVideo.title}
                      onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                      placeholder="Shocking Truth Revealed..."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-['Space_Mono'] uppercase text-[#888]">
                        Video URL (Embed or Direct) *
                      </label>
                      <CloudinaryUploader
                        onUploadSuccess={(url) => setNewVideo({ ...newVideo, embedUrl: url })}
                        resourceType="video"
                      />
                    </div>
                    <input
                      required
                      type="url"
                      className="w-full bg-[#050505] border border-[#333] rounded px-3 py-2 text-white focus:border-[#c8ff00] focus:ring-1 focus:ring-[#c8ff00] outline-none transition-all text-sm font-mono"
                      value={newVideo.embedUrl}
                      onChange={(e) => setNewVideo({ ...newVideo, embedUrl: e.target.value })}
                      placeholder="https://www.youtube.com/embed/... or raw mp4"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-['Space_Mono'] uppercase text-[#888]">
                        Thumbnail URL (Optional)
                      </label>
                      <CloudinaryUploader
                        onUploadSuccess={(url) => setNewVideo({ ...newVideo, thumbnailUrl: url })}
                        resourceType="image"
                        buttonText="Upload Image"
                      />
                    </div>
                    <input
                      type="url"
                      className="w-full bg-[#050505] border border-[#333] rounded px-3 py-2 text-white focus:border-[#c8ff00] focus:ring-1 focus:ring-[#c8ff00] outline-none transition-all text-sm font-mono"
                      value={newVideo.thumbnailUrl || ""}
                      onChange={(e) => setNewVideo({ ...newVideo, thumbnailUrl: e.target.value })}
                      placeholder="https://i.ytimg.com/vi/.../maxresdefault.jpg or image URL"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-['Space_Mono'] uppercase mb-1 text-[#888]">
                      Date
                    </label>
                    <input
                      required
                      type="date"
                      className="w-full bg-[#050505] border border-[#333] rounded px-3 py-2 text-white focus:border-[#c8ff00] focus:ring-1 focus:ring-[#c8ff00] outline-none transition-all font-mono"
                      value={newVideo.date}
                      onChange={(e) => setNewVideo({ ...newVideo, date: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-['Space_Mono'] uppercase mb-1 text-[#888]">
                        Source
                      </label>
                      <input
                        type="text"
                        className="w-full bg-[#050505] border border-[#333] rounded px-3 py-2 text-white focus:border-[#c8ff00] focus:ring-1 focus:ring-[#c8ff00] outline-none transition-all"
                        value={newVideo.source}
                        onChange={(e) => setNewVideo({ ...newVideo, source: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-['Space_Mono'] uppercase mb-1 text-[#888]">
                        Topic
                      </label>
                      <input
                        type="text"
                        className="w-full bg-[#050505] border border-[#333] rounded px-3 py-2 text-white focus:border-[#c8ff00] focus:ring-1 focus:ring-[#c8ff00] outline-none transition-all"
                        value={newVideo.topic}
                        onChange={(e) => setNewVideo({ ...newVideo, topic: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-['Space_Mono'] uppercase mb-1 text-[#888]">
                        Location
                      </label>
                      <input
                        type="text"
                        className="w-full bg-[#050505] border border-[#333] rounded px-3 py-2 text-white focus:border-[#c8ff00] focus:ring-1 focus:ring-[#c8ff00] outline-none transition-all"
                        value={newVideo.location}
                        onChange={(e) => setNewVideo({ ...newVideo, location: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-['Space_Mono'] uppercase mb-1 text-[#888]">
                        Status
                      </label>
                      <input
                        type="text"
                        className="w-full bg-[#050505] border border-[#333] rounded px-3 py-2 text-white focus:border-[#c8ff00] focus:ring-1 focus:ring-[#c8ff00] outline-none transition-all"
                        value={newVideo.status}
                        onChange={(e) => setNewVideo({ ...newVideo, status: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-['Space_Mono'] uppercase mb-1 text-[#888]">
                        Censorship
                      </label>
                      <input
                        type="text"
                        className="w-full bg-[#050505] border border-[#333] rounded px-3 py-2 text-white focus:border-[#c8ff00] focus:ring-1 focus:ring-[#c8ff00] outline-none transition-all"
                        value={newVideo.censorship}
                        onChange={(e) => setNewVideo({ ...newVideo, censorship: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-['Space_Mono'] uppercase mb-1 text-[#888]">
                        Quote
                      </label>
                      <input
                        type="text"
                        className="w-full bg-[#050505] border border-[#333] rounded px-3 py-2 text-white focus:border-[#c8ff00] focus:ring-1 focus:ring-[#c8ff00] outline-none transition-all"
                        value={newVideo.quote}
                        onChange={(e) => setNewVideo({ ...newVideo, quote: e.target.value })}
                        placeholder="Quote text..."
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-['Space_Mono'] uppercase mb-1 text-[#888]">
                      Call To Action (Footer)
                    </label>
                    <textarea
                      rows={2}
                      className="w-full bg-[#050505] border border-[#333] rounded px-3 py-2 text-white focus:border-[#c8ff00] focus:ring-1 focus:ring-[#c8ff00] outline-none transition-all"
                      value={newVideo.callToAction}
                      onChange={(e) => setNewVideo({ ...newVideo, callToAction: e.target.value })}
                      placeholder="Share this video..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-['Space_Mono'] uppercase mb-1 text-[#888]">
                      Description (Main Text)
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full bg-[#050505] border border-[#333] rounded px-3 py-2 text-white focus:border-[#c8ff00] focus:ring-1 focus:ring-[#c8ff00] outline-none transition-all"
                      value={newVideo.description}
                      onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                      placeholder="Write the full description/article here. Supports line breaks."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isDeployingVideo}
                    className="w-full bg-[#c8ff00] text-black font-bold uppercase py-3 rounded hover:bg-[#a6d800] transition-colors disabled:opacity-50"
                  >
                    {isDeployingVideo
                      ? "Deploying..."
                      : editVideoId
                        ? "Update Video"
                        : "Publish Video"}
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-2">
              <header className="mb-6 flex justify-between items-end">
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-wider mb-2 font-['Archivo_Black']">
                    Deployed Media
                  </h2>
                  <p className="text-[#888] font-mono text-sm">
                    Dynamic DB Entries: {videos.length} (Will be injected into site)
                  </p>
                </div>
                <button
                  onClick={fetchVideos}
                  className="text-xs font-['Space_Mono'] bg-[#1a1a1a] text-white border border-[#333] px-3 py-1 uppercase rounded hover:bg-[#222] transition-colors"
                >
                  Refresh
                </button>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {videos.length === 0 && (
                  <p className="text-[#555] font-mono p-4 border border-dashed border-[#333] rounded">
                    No dynamic videos deployed.
                  </p>
                )}
                {videos.map((vid) => (
                  <div
                    key={vid.id as string}
                    className="bg-[#111] border border-[#1a1a1a] rounded-xl p-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-[#c8ff00] flex-1 mr-2 leading-tight">
                          {vid.title as React.ReactNode}
                        </h3>
                        <span className="text-xs font-mono bg-[#333] px-2 py-0.5 rounded text-[#aaa]">
                          {vid.date as React.ReactNode}
                        </span>
                      </div>
                      <p className="text-xs text-[#888] line-clamp-3 mb-3">
                        {vid.description as React.ReactNode}
                      </p>
                      <div className="text-xs font-mono text-blue-400 break-all bg-blue-500/10 p-2 rounded mb-4">
                        {vid.embedUrl as React.ReactNode}
                      </div>
                    </div>
                    <div>
                      <a
                        href={`/cockroach/${vid.id as string}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs uppercase bg-[#222] px-3 py-1 rounded inline-block mr-2 hover:bg-[#333] transition-colors"
                      >
                        Preview
                      </a>
                      <button
                        onClick={() => startEditVideo(vid)}
                        className="text-xs uppercase bg-blue-900/30 text-blue-400 px-3 py-1 rounded inline-block mr-2 hover:bg-blue-900/50 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteVideo(vid.id as string)}
                        className="text-xs uppercase bg-red-900/30 text-red-400 px-3 py-1 rounded hover:bg-red-900/50 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "config" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-xl mx-auto"
          >
            <header className="mb-8">
              <h2 className="text-2xl font-black uppercase tracking-wider mb-2 font-['Archivo_Black']">
                Site Configuration
              </h2>
              <p className="text-[#888] font-mono text-sm">
                Update core metrics and behaviors. Do not forget to trigger a rebuild manually to
                make it live if not real-time.
              </p>
            </header>

            <div className="bg-[#111] border border-[#333] p-6 rounded-2xl flex flex-col gap-6 font-['Space_Mono']">
              <div>
                <label className="block text-xs uppercase text-[#888] mb-2 font-bold tracking-wider">
                  Live Counter Start Value
                </label>
                <div className="flex gap-4">
                  <input
                    type="number"
                    value={baseMemberCount}
                    onChange={(e) => setBaseMemberCount(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#1a1a1a] border border-[#333] px-4 py-3 rounded-xl text-white focus:border-[#c8ff00] outline-none transition-colors"
                  />
                  <button
                    onClick={saveConfig}
                    disabled={isConfigSaving}
                    className="px-6 py-3 bg-[#c8ff00] text-black font-bold uppercase rounded-xl hover:bg-lime-400 disabled:opacity-50 transition-colors whitespace-nowrap"
                  >
                    {isConfigSaving ? "Saving..." : "Save Count"}
                  </button>
                </div>
                <p className="text-[#555] text-xs mt-2">
                  This base member count is queried live for real-time start metrics. For example,
                  15300000.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
