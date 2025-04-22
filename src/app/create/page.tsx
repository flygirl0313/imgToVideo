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

export default function CreatePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");

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
    if (!selectedFile || !description) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("title", selectedFile.name);
    formData.append("description", description);

    try {
      const response = await fetch("/api/create", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create video");
      }

      const data = await response.json();
      router.push(`/dashboard?video=${data.id}`);
    } catch (error) {
      console.error("Error creating video:", error);
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
