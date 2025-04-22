const API_KEY = process.env.VIDEO_API_KEY;
const API_BASE_URL = "https://api.gpt.ge";

if (!API_KEY) {
  throw new Error("Missing required environment variables for video API");
}

interface LumaGenerationResponse {
  id: string;
  state: string;
  created_at: string;
  request: {
    prompt: string;
    aspect_ratio: string;
  };
  result?: {
    video_url: string;
  };
}

export async function generateVideoFromImage(
  imageBuffer: Buffer
): Promise<string> {
  try {
    // 1. 将图片转换为 base64
    const base64Image = imageBuffer.toString("base64");

    // 2. 调用 Luma API 生成视频
    const response = await fetch(`${API_BASE_URL}/luma/generations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        image_url: `data:image/jpeg;base64,${base64Image}`,
        expand_prompt: true,
        loop: true, // 循环播放
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error?.message || "Failed to generate video");
    }

    const data: LumaGenerationResponse = await response.json();

    if (!data.result?.video_url) {
      throw new Error("No video URL in response");
    }

    return data.result.video_url;
  } catch (error) {
    console.error("Video generation error:", error);
    throw error;
  }
}
