"use client";

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
  Wand2,
  Star,
  Shield,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useLanguage } from "@/lib/language";
import { translations } from "@/lib/translations";
import { motion } from "framer-motion";

export function HomeContent() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-32 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 -z-10" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              {t.hero.title}
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {t.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-none group"
            >
              <Link href="/create" className="flex items-center">
                {t.hero.startButton}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="group">
              <Link href="/dashboard" className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {t.hero.myWorksButton}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Wand2 className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                {t.features.title}
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.features.description}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-8 bg-white/50 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  {t.features.aiGeneration.title}
                </h3>
                <p className="text-gray-600">
                  {t.features.aiGeneration.description}
                </p>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="p-8 bg-white/50 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  {t.features.highQuality.title}
                </h3>
                <p className="text-gray-600">
                  {t.features.highQuality.description}
                </p>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="p-8 bg-white/50 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  {t.features.easyToUse.title}
                </h3>
                <p className="text-gray-600">
                  {t.features.easyToUse.description}
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                {t.examples.title}
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.examples.description}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="h-full"
            >
              <Card className="h-full overflow-hidden bg-white/50 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="aspect-video relative bg-gray-100">
                  <video
                    src="./examples/videos/base01.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                    {t.examples.landscape.title}
                  </h3>
                  <p className="text-gray-600">
                    {t.examples.landscape.description}
                  </p>
                </div>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="h-full"
            >
              <Card className="h-full overflow-hidden bg-white/50 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="aspect-video relative bg-gray-100">
                  <video
                    src="./examples/videos/base02.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                    {t.examples.product.title}
                  </h3>
                  <p className="text-gray-600">
                    {t.examples.product.description}
                  </p>
                </div>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="h-full"
            >
              <Card className="h-full overflow-hidden bg-white/50 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="aspect-video relative bg-gray-100">
                  <video
                    src="./examples/videos/base03.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                    {t.examples.art.title}
                  </h3>
                  <p className="text-gray-600">{t.examples.art.description}</p>
                </div>
              </Card>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-center mt-12"
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-none group"
            >
              <Link href="/examples" className="flex items-center">
                {t.examples.moreButton}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                {t.pricing.title}
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.pricing.description}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              <Card className="p-8 bg-white/50 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  {t.pricing.basic.title}
                </h3>
                <p className="text-4xl font-bold mb-4">
                  {t.pricing.basic.price}
                  <span className="text-lg font-normal text-gray-600">
                    {t.pricing.basic.period}
                  </span>
                </p>
                <ul className="space-y-3 mb-8">
                  {t.pricing.basic.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-none"
                >
                  <Link href="/pricing">{t.pricing.basic.button}</Link>
                </Button>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <Card className="p-8 bg-white/50 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    {t.pricing.pro.popular}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  {t.pricing.pro.title}
                </h3>
                <p className="text-4xl font-bold mb-4">
                  {t.pricing.pro.price}
                  <span className="text-lg font-normal text-gray-600">
                    {t.pricing.pro.period}
                  </span>
                </p>
                <ul className="space-y-3 mb-8">
                  {t.pricing.pro.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-none"
                >
                  <Link href="/pricing">{t.pricing.pro.button}</Link>
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                {t.testimonials.title}
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.testimonials.description}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.testimonials.users.map((user, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
              >
                <Card className="p-6 bg-white/50 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={`/examples/images/${index + 1}.png`}
                        alt={user.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                        {user.name}
                      </h4>
                      <p className="text-sm text-gray-500">{user.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600">{user.comment}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
