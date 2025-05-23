"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { useLanguage } from "@/lib/language";
import { translations } from "@/lib/translations";
import {
  Upload,
  Image as ImageIcon,
  Video,
  Loader2,
  Sparkles,
  Zap,
  Wand2,
} from "lucide-react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";

// 图片压缩函数
async function compressImage(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // 计算新的尺寸，保持宽高比
        const maxSize = 1280; // 最大尺寸
        if (width > height && width > maxSize) {
          height = Math.round((height * maxSize) / width);
          width = maxSize;
        } else if (height > maxSize) {
          width = Math.round((width * maxSize) / height);
          height = maxSize;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        // 转换为 Blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              // 创建新的 File 对象
              const compressedFile = new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              reject(new Error("Failed to compress image"));
            }
          },
          "image/jpeg",
          0.8 // 压缩质量
        );
      };
      img.onerror = () => reject(new Error("Failed to load image"));
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
  });
}

export default function CreatePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // 压缩图片
        const compressedFile = await compressImage(file);
        setSelectedFile(compressedFile);

        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Error compressing image:", error);
        alert("图片压缩失败，请重试");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !description) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("title", selectedFile.name);
    formData.append("description", description);

    try {
      // 创建视频生成任务
      const response = await fetch("/api/create", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create video");
      }

      const data = await response.json();

      // 开始轮询任务状态
      const pollInterval = setInterval(async () => {
        try {
          const statusResponse = await fetch(
            `/api/video/status/${data.taskId}`
          );
          const statusData = await statusResponse.json();

          if (statusData.status === "completed" && statusData.videoUrl) {
            clearInterval(pollInterval);
            // 更新视频记录
            await fetch(`/api/videos/${data.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                url: statusData.videoUrl,
                images: [statusData.videoUrl],
                status: "completed",
              }),
            });
            router.push(`/dashboard?video=${data.id}`);
          } else if (statusData.status === "failed") {
            clearInterval(pollInterval);
            // 更新视频状态为失败
            await fetch(`/api/videos/${data.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                status: "failed",
              }),
            });
            alert("视频生成失败，请重试");
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Error checking video status:", error);
          clearInterval(pollInterval);
          alert("检查视频状态失败，请重试");
          setIsLoading(false);
        }
      }, 5000); // 每5秒检查一次

      // 设置超时，5分钟后停止轮询
      setTimeout(() => {
        clearInterval(pollInterval);
        if (isLoading) {
          alert("视频生成超时，请稍后查看结果");
          setIsLoading(false);
          router.push("/dashboard");
        }
      }, 300000); // 5分钟超时
    } catch (error) {
      console.error("Error creating video:", error);
      alert("创建视频失败，请重试");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              {t.create.title}
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl">
            {t.create.description}
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <Card className="p-8 bg-white/50 backdrop-blur-sm border-none shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <label className="block text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  {t.create.uploadLabel}
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
                    selectedFile
                      ? "border-purple-500 bg-purple-50/50"
                      : "border-gray-300 hover:border-purple-500/50 hover:bg-purple-50/30"
                  }`}
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                >
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {preview ? (
                    <div className="relative w-full h-48">
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-8 h-8 text-gray-400" />
                      <p className="text-gray-500">
                        {t.create.uploadDescription}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  {t.create.descriptionLabel}
                </label>
                <Textarea
                  placeholder={t.create.descriptionPlaceholder}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[100px] resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={!selectedFile || !description || isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-none"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t.create.processing}
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    {t.create.createButton}
                  </>
                )}
              </Button>
            </form>
          </Card>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-white/50 backdrop-blur-sm border-none shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                <ImageIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                {t.create.tips.image.title}
              </h3>
              <p className="text-gray-600">{t.create.tips.image.description}</p>
            </Card>
            <Card className="p-6 bg-white/50 backdrop-blur-sm border-none shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                <Wand2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                {t.create.tips.video.title}
              </h3>
              <p className="text-gray-600">{t.create.tips.video.description}</p>
            </Card>
            <Card className="p-6 bg-white/50 backdrop-blur-sm border-none shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                {t.create.tips.processing.title}
              </h3>
              <p className="text-gray-600">
                {t.create.tips.processing.description}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
