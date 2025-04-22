"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Video,
  CreditCard,
  RefreshCw,
  Plus,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { VideoList } from "@/components/VideoList";
import { Navbar } from "@/components/Navbar";
import { useLanguage } from "@/lib/language";
import { translations } from "@/lib/translations";
import { motion } from "framer-motion";
import { Session } from "next-auth";

interface DashboardContentProps {
  session: Session;
  user: { credits: number } | null;
  videos: {
    id: string;
    status: string;
    url: string;
    createdAt: Date;
    title: string;
    description: string | null;
    thumbnail: string | null;
  }[];
}

export function DashboardContent({
  session,
  user,
  videos,
}: DashboardContentProps) {
  const { language } = useLanguage();
  const t = translations[language];

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
              {t.dashboard.welcome}
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl">
            {t.dashboard.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧边栏 */}
          <div className="space-y-6">
            {/* 用户信息卡片 */}
            <Card className="p-6 bg-white/50 backdrop-blur-sm border-none shadow-lg">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Video className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                    {session.user?.name}
                  </h2>
                  <p className="text-gray-500">{session.user?.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                  <span className="text-gray-600">{t.dashboard.credits}</span>
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                    {user?.credits || 0}
                  </span>
                </div>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-none"
                >
                  <Link
                    href="/pricing"
                    className="flex items-center justify-center"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    {t.dashboard.buyCredits}
                  </Link>
                </Button>
              </div>
            </Card>

            {/* 快速操作卡片 */}
            <Card className="p-6 bg-white/50 backdrop-blur-sm border-none shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  {t.dashboard.quickActions}
                </h3>
              </div>
              <div className="space-y-3">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-none"
                >
                  <Link
                    href="/create"
                    className="flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {t.dashboard.createNew}
                  </Link>
                </Button>
                <Button
                  asChild
                  className="w-full bg-white hover:bg-gray-50 text-purple-600 border border-purple-200"
                >
                  <Link
                    href="/pricing"
                    className="flex items-center justify-center"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    {t.dashboard.rechargeCredits}
                  </Link>
                </Button>
              </div>
            </Card>
          </div>

          {/* 右侧视频列表 */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-purple-600" />
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  {t.dashboard.myVideos}
                </h2>
              </div>
              <Button
                asChild
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-none"
              >
                <Link href="/create" className="flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  {t.dashboard.createNew}
                </Link>
              </Button>
            </div>
            <VideoList
              videos={videos.map((video) => ({
                ...video,
                createdAt: video.createdAt.toISOString(),
              }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
