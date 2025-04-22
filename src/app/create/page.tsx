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

export default function CreatePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      router.push("/api/auth/signin");
      return;
    }

    if (!selectedFile) {
      alert("请选择一张图片");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await fetch("/api/create", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("创建视频失败");
      }

      const data = await response.json();
      router.push(`/dashboard?video=${data.id}`);
    } catch (error) {
      console.error(error);
      alert("创建视频失败，请重试");
    } finally {
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
                    <div className="relative aspect-video mb-4">
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 bg-white/90 hover:bg-white text-red-500 border border-red-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFile(null);
                          setPreview(null);
                        }}
                      >
                        {t.create.removeImage}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Upload className="w-8 h-8 text-white" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-lg font-medium text-gray-700">
                          {t.create.dragAndDrop}
                        </p>
                        <p className="text-sm text-gray-500">
                          {t.create.supportedFormats}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  type="submit"
                  size="lg"
                  disabled={!selectedFile || isLoading}
                  className="w-full max-w-xs bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-none"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {t.create.processing}
                    </>
                  ) : (
                    <>
                      <Video className="w-4 h-4 mr-2" />
                      {t.create.createButton}
                    </>
                  )}
                </Button>
              </div>
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
