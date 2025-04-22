import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export function usePollVideoStatus(videoId: string, status: string) {
  const router = useRouter();
  const pollIntervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (status === "processing") {
      // 每5秒检查一次视频状态
      pollIntervalRef.current = setInterval(async () => {
        try {
          const response = await fetch(`/api/videos/${videoId}/status`);
          const data = await response.json();

          if (data.status !== "processing") {
            // 如果视频状态不再是处理中，清除轮询并刷新页面
            clearInterval(pollIntervalRef.current);
            router.refresh();
          }
        } catch (error) {
          console.error("检查视频状态失败:", error);
          clearInterval(pollIntervalRef.current);
        }
      }, 5000);

      // 设置5分钟超时
      const timeoutId = setTimeout(() => {
        clearInterval(pollIntervalRef.current);
        router.refresh();
      }, 300000);

      return () => {
        clearInterval(pollIntervalRef.current);
        clearTimeout(timeoutId);
      };
    }
  }, [videoId, status, router]);
}
