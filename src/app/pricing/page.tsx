"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const plans = [
  {
    name: "基础版",
    price: 9.9,
    description: "单次视频生成",
    features: ["1 次视频生成", "基础动画效果", "标准分辨率"],
  },
  {
    name: "专业版",
    price: 199,
    description: "永久无限次",
    features: ["无限次视频生成", "高级动画效果", "4K 超高清分辨率", "优先处理"],
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">选择您的方案</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`p-8 ${
              selectedPlan === plan.name ? "border-2 border-primary" : ""
            }`}
          >
            <h2 className="text-2xl font-bold mb-4">{plan.name}</h2>
            <p className="text-4xl font-bold mb-4">
              ¥{plan.price}
              <span className="text-lg font-normal text-gray-600">
                {plan.name === "基础版" ? "/次" : "/永久"}
              </span>
            </p>
            <p className="text-gray-600 mb-6">{plan.description}</p>
            <ul className="space-y-2 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <svg
                    className="w-5 h-5 text-primary mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              className="w-full"
              onClick={() => handlePurchase(plan)}
              disabled={isLoading}
            >
              {isLoading ? "处理中..." : "立即购买"}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
