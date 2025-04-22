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
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useLanguage } from "@/lib/language";
import { translations } from "@/lib/translations";

export function HomeContent() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-32 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 -z-10" />
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            {t.hero.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {t.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="group">
              <Link href="/create">
                {t.hero.startButton}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#features">{t.hero.learnMoreButton}</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="group">
              <Link href="/dashboard" className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {t.hero.myWorksButton}
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
            <h2 className="text-4xl font-bold mb-4">{t.features.title}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.features.description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">
                {t.features.aiGeneration.title}
              </h3>
              <p className="text-gray-600">
                {t.features.aiGeneration.description}
              </p>
            </Card>
            <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                <Video className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">
                {t.features.highQuality.title}
              </h3>
              <p className="text-gray-600">
                {t.features.highQuality.description}
              </p>
            </Card>
            <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">
                {t.features.easyToUse.title}
              </h3>
              <p className="text-gray-600">
                {t.features.easyToUse.description}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t.examples.title}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.examples.description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
                <h3 className="text-xl font-semibold mb-2">
                  {t.examples.landscape.title}
                </h3>
                <p className="text-gray-600">
                  {t.examples.landscape.description}
                </p>
              </div>
            </Card>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
                <h3 className="text-xl font-semibold mb-2">
                  {t.examples.product.title}
                </h3>
                <p className="text-gray-600">
                  {t.examples.product.description}
                </p>
              </div>
            </Card>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
                <h3 className="text-xl font-semibold mb-2">
                  {t.examples.art.title}
                </h3>
                <p className="text-gray-600">{t.examples.art.description}</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t.pricing.title}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.pricing.description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-4">
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
              <Button asChild className="w-full" variant="outline">
                <Link href="/pricing">{t.pricing.basic.button}</Link>
              </Button>
            </Card>
            <Card className="p-8 border-2 border-primary relative hover:shadow-lg transition-shadow duration-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                  {t.pricing.pro.popular}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4">{t.pricing.pro.title}</h3>
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
              <Button asChild className="w-full">
                <Link href="/pricing">{t.pricing.pro.button}</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t.testimonials.title}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.testimonials.description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.testimonials.users.map((user, index) => (
              <Card key={index} className="p-6">
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
                    <h4 className="font-semibold">{user.name}</h4>
                    <p className="text-sm text-gray-500">{user.role}</p>
                  </div>
                </div>
                <p className="text-gray-600">{user.comment}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
