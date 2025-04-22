import { Metadata } from "next";
import { HomeContent } from "@/components/HomeContent";

export const metadata: Metadata = {
  title: "图片转视频 - 轻松将图片转换为动画视频",
  description:
    "使用 AI 技术将您的图片转换为精美的动画视频，支持多种风格和效果。",
};

export default function Home() {
  return <HomeContent />;
}
