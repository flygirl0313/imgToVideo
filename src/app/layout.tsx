import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/components/Providers";
import { StripeProvider } from "@/components/StripeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "图片转视频 - 轻松将图片转换为动画视频",
  description:
    "使用 AI 技术将您的图片转换为精美的动画视频，支持多种风格和效果。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <Providers>
          <StripeProvider>{children}</StripeProvider>
        </Providers>
      </body>
    </html>
  );
}
