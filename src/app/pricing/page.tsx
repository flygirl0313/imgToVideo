"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle, Zap, Crown } from "lucide-react";
import { Navbar } from "@/components/Navbar";

const plans = [
  {
    name: "基础版",
    price: 9.9,
    description: "单次视频生成",
    features: ["1 次视频生成", "基础动画效果", "标准分辨率"],
    icon: Zap,
  },
  {
    name: "专业版",
    price: 199,
    description: "永久无限次",
    features: ["无限次视频生成", "高级动画效果", "4K 超高清分辨率", "优先处理"],
    icon: Crown,
  },
];

export default function PricingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async (plan: (typeof plans)[0]) => {
    if (!session) {
      router.push("/api/auth/signin");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan: plan.name,
          amount: plan.price,
        }),
      });

      if (!response.ok) {
        throw new Error("创建订单失败");
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error(error);
      alert("创建订单失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar />

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
              选择您的方案
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            选择最适合您需求的方案，开启您的创意之旅
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className={`p-8 bg-white/50 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300 ${
                    selectedPlan === plan.name ? "ring-2 ring-purple-500" : ""
                  }`}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6">
                    <plan.icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                    {plan.name}
                  </h2>
                  <p className="text-4xl font-bold mb-4">
                    ¥{plan.price}
                    <span className="text-lg font-normal text-gray-600">
                      {plan.name === "基础版" ? "/次" : "/永久"}
                    </span>
                  </p>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-purple-500 mr-2" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-none"
                    onClick={() => handlePurchase(plan)}
                    disabled={isLoading}
                  >
                    {isLoading ? "处理中..." : "立即购买"}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
