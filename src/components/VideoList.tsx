"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Trash2, Loader2, Video as VideoIcon } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { translations } from "@/lib/translations";
import { motion } from "framer-motion";

interface Video {
  id: string;
  status: string;
  url: string;
  createdAt: string;
  title: string;
  description: string | null;
  thumbnail: string | null;
}

interface VideoListProps {
  videos: Video[];
}

export function VideoList({ videos }: VideoListProps) {
  const { language } = useLanguage();
  const t = translations[language];

  if (videos.length === 0) {
    return (
      <Card className="p-8 text-center bg-white/50 backdrop-blur-sm border-none shadow-lg">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
            <VideoIcon className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600 text-lg">{t.dashboard.noVideos}</p>
          <Button
            asChild
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-none"
          >
            <a href="/create">{t.dashboard.createNew}</a>
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {videos.map((video, index) => (
        <motion.div
          key={video.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm border-none shadow-lg group">
            <div className="aspect-video relative bg-gray-100">
              {video.status === "completed" ? (
                <video
                  src={video.url}
                  className="w-full h-full object-cover"
                  controls
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4" />
                    <p className="text-gray-600">
                      {video.status === "processing"
                        ? t.dashboard.processing
                        : t.dashboard.failed}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  视频 #{video.id.slice(0, 6)}
                </h3>
                <span
                  className={`text-sm px-2 py-1 rounded-full ${
                    video.status === "completed"
                      ? "bg-green-100 text-green-600"
                      : video.status === "processing"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {video.status === "completed"
                    ? t.dashboard.completed
                    : video.status === "processing"
                    ? t.dashboard.processing
                    : t.dashboard.failed}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                {new Date(video.createdAt).toLocaleString()}
              </p>
              <div className="flex gap-2 mt-4">
                {video.status === "completed" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white hover:bg-gray-50 text-purple-600 border border-purple-200"
                  >
                    <a href={video.url} download>
                      <Download className="w-4 h-4 mr-2" />
                      {t.dashboard.download}
                    </a>
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white hover:bg-gray-50 text-red-500 border border-red-200"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {t.dashboard.delete}
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
