"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { useLanguage } from "@/lib/language";
import { translations } from "@/lib/translations";
import { ArrowLeft, Video } from "lucide-react";
import { motion } from "framer-motion";

const examples = [
  {
    id: 1,
    title: "Landscape",
    description: "Beautiful natural landscapes transformed into dynamic videos",
    video: "/examples/videos/base01.mp4",
    category: "nature",
  },
  {
    id: 2,
    title: "Product",
    description: "Professional product showcases with smooth transitions",
    video: "/examples/videos/base02.mp4",
    category: "commercial",
  },
  {
    id: 3,
    title: "Art",
    description: "Creative artistic expressions brought to life",
    video: "/examples/videos/base03.mp4",
    category: "creative",
  },
  {
    id: 4,
    title: "City",
    description: "Urban scenes with dynamic movement",
    video: "/examples/videos/base01.mp4",
    category: "urban",
  },
  {
    id: 5,
    title: "Food",
    description: "Delicious food presentations with appetizing effects",
    video: "/examples/videos/base02.mp4",
    category: "food",
  },
  {
    id: 6,
    title: "Fashion",
    description: "Elegant fashion showcases with style",
    video: "/examples/videos/base03.mp4",
    category: "fashion",
  },
  {
    id: 7,
    title: "Travel",
    description: "Breathtaking travel moments captured in motion",
    video: "/examples/videos/base01.mp4",
    category: "travel",
  },
  {
    id: 8,
    title: "Architecture",
    description: "Stunning architectural designs in motion",
    video: "/examples/videos/base02.mp4",
    category: "architecture",
  },
  {
    id: 9,
    title: "Sports",
    description: "Dynamic sports moments with energy",
    video: "/examples/videos/base03.mp4",
    category: "sports",
  },
];

export default function ExamplesPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredExamples = selectedCategory
    ? examples.filter((example) => example.category === selectedCategory)
    : examples;

  const categories = Array.from(
    new Set(examples.map((example) => example.category))
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
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
              <Video className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              {t.examples.title}
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl">
            {t.examples.description}
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-4 mb-8">
          <Button
            variant={selectedCategory === null ? "default" : "ghost"}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-none"
            onClick={() => setSelectedCategory(null)}
          >
            {t.examples.categories.all}
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "ghost"}
              className={
                selectedCategory === category
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-none"
                  : ""
              }
              onClick={() => setSelectedCategory(category)}
            >
              {
                t.examples.categories[
                  category as keyof typeof t.examples.categories
                ]
              }
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExamples.map((example, index) => (
            <motion.div
              key={example.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <Card className="h-full overflow-hidden bg-white/50 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="aspect-video relative bg-gray-100">
                  <video
                    src={example.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                      {example.title}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {
                        t.examples.categories[
                          example.category as keyof typeof t.examples.categories
                        ]
                      }
                    </span>
                  </div>
                  <p className="text-gray-600">{example.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Button asChild size="lg" variant="ghost" className="group">
            <Link href="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              {t.examples.backToHome}
            </Link>
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
