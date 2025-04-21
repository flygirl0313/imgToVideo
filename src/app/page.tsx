import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle,
  Sparkles,
  Video,
  Zap,
  User,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "图片转视频 - 轻松将图片转换为动画视频",
  description:
    "使用 AI 技术将您的图片转换为精美的动画视频，支持多种风格和效果。",
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-32 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 -z-10" />
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            将您的图片转换为精美的动画视频
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            使用 AI 技术，轻松创建专业级动画效果，让您的创意无限绽放
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="group">
              <Link href="/create">
                开始创作
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#features">了解更多</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="group">
              <Link href="/dashboard" className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                我的作品
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">强大功能</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              我们的 AI 技术为您提供最先进的图片转视频解决方案
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">AI 视频生成</h3>
              <p className="text-gray-600">
                使用先进的 AI
                技术将您的图片转换为精美的动画视频，支持多种风格和效果
              </p>
            </Card>
            <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                <Video className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">高质量输出</h3>
              <p className="text-gray-600">
                生成高分辨率视频，流畅的动画效果和精美的视觉效果，让您的作品脱颖而出
              </p>
            </Card>
            <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">简单易用</h3>
              <p className="text-gray-600">
                直观的界面设计，无需专业技能，任何人都能轻松上手，快速创建专业级视频
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">效果展示</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              看看其他用户是如何将图片转换为精美视频的
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-video relative bg-gray-100">
                <video
                  src="./examples/videos/base.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">风景动画</h3>
                <p className="text-gray-600">
                  将静态风景照片转换为生动的动画视频，展现大自然的魅力
                </p>
              </div>
            </Card>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-video relative bg-gray-100">
                <video
                  src="./examples/videos/base2.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">产品展示</h3>
                <p className="text-gray-600">
                  为产品图片添加动态效果，让商品展示更加生动有趣
                </p>
              </div>
            </Card>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-video relative bg-gray-100">
                <video
                  src="./examples/videos/base3.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">艺术创作</h3>
                <p className="text-gray-600">
                  将艺术作品转换为动态视频，展现创意的无限可能
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">价格方案</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              选择最适合您的方案，开启创意之旅
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-4">基础版</h3>
              <p className="text-4xl font-bold mb-4">
                ¥9.9
                <span className="text-lg font-normal text-gray-600">/次</span>
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span>1 次视频生成</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span>基础动画效果</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span>标准分辨率</span>
                </li>
              </ul>
              <Button asChild className="w-full" variant="outline">
                <Link href="/pricing">立即购买</Link>
              </Button>
            </Card>
            <Card className="p-8 border-2 border-primary relative hover:shadow-lg transition-shadow duration-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                  最受欢迎
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4">专业版</h3>
              <p className="text-4xl font-bold mb-4">
                ¥199
                <span className="text-lg font-normal text-gray-600">/永久</span>
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span>无限次视频生成</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span>高级动画效果</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span>4K 超高清分辨率</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span>优先处理</span>
                </li>
              </ul>
              <Button asChild className="w-full">
                <Link href="/pricing">立即购买</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">用户评价</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              听听其他用户怎么说
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="font-semibold">张先生</h4>
                  <p className="text-sm text-gray-500">设计师</p>
                </div>
              </div>
              <p className="text-gray-600">
                "这个工具太棒了！我可以用它快速将设计稿转换成动画视频，大大提高了我的工作效率。"
              </p>
            </Card>
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="font-semibold">李女士</h4>
                  <p className="text-sm text-gray-500">内容创作者</p>
                </div>
              </div>
              <p className="text-gray-600">
                "作为一个内容创作者，这个工具帮我节省了大量时间。视频质量很高，效果非常专业。"
              </p>
            </Card>
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="font-semibold">王先生</h4>
                  <p className="text-sm text-gray-500">营销经理</p>
                </div>
              </div>
              <p className="text-gray-600">
                "我们团队使用这个工具来制作营销视频，效果非常好。操作简单，产出质量高，强烈推荐！"
              </p>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
