import React, { useState, useRef } from "react";
import { toast } from "sonner";

interface CloudinaryUploaderProps {
  onUploadSuccess: (url: string) => void;
  resourceType?: "video" | "image" | "auto";
  buttonText?: string;
  className?: string;
}

export function CloudinaryUploader({
  onUploadSuccess,
  resourceType = "video",
  buttonText = "Upload Video",
  className = "",
}: CloudinaryUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      toast.error("Cloudinary configuration is missing. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET.");
      return;
    }

    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`, true);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percentComplete = Math.round((e.loaded / e.total) * 100);
          setProgress(percentComplete);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          toast.success("Upload successful!");
          onUploadSuccess(response.secure_url);
        } else {
          try {
            const errResponse = JSON.parse(xhr.responseText);
            let errMsg = errResponse.error?.message || "Upload failed";
            toast.error(`Cloudinary Error: ${errMsg} (Preset: ${uploadPreset})`);
          } catch {
            toast.error(`Upload failed with status: ${xhr.status} - ${xhr.responseText}`);
          }
        }
        setUploading(false);
      };

      xhr.onerror = () => {
        toast.error("Network error occurred while uploading. Please check CORS or adblockers.");
        setUploading(false);
      };

      xhr.send(formData);
    } catch (err: unknown) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : String(err));
      setUploading(false);
    }
  };

  return (
    <div className={className}>
      <input
        type="file"
        accept={resourceType === "video" ? "video/*" : "image/*"}
        onChange={handleUpload}
        className="hidden"
        ref={fileInputRef}
        disabled={uploading}
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="bg-[#333] hover:bg-[#444] text-white px-4 py-2 rounded font-mono text-sm uppercase transition-colors disabled:opacity-50"
      >
        {uploading ? `Uploading... ${progress}%` : buttonText}
      </button>
    </div>
  );
}
