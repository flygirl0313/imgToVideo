import axios from "axios";

const API_KEY = process.env.VIDEO_API_KEY;
const API_BASE_URL = process.env.VIDEO_API_BASE_URL || "https://api.gpt.ge";

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
  imageBuffer: Buffer,
  userPrompt: string
): Promise<string> {
  try {
    // 将图片转换为 base64
    const base64Image = imageBuffer.toString("base64");

    // 调用 Luma API 生成视频
    const response = await axios.post<LumaGenerationResponse>(
      `${API_BASE_URL}/luma/generations`,
      {
        user_prompt: userPrompt,
        expand_prompt: true,
        image_url: `data:image/jpeg;base64,${base64Image}`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    if (!response.data || !response.data.id) {
      throw new Error("Failed to generate video");
    }

    // 等待视频生成完成
    const videoUrl = await waitForVideoGeneration(response.data.id);
    return videoUrl;
  } catch (error) {
    console.error("Error generating video:", error);
    throw error;
  }
}

async function waitForVideoGeneration(taskId: string): Promise<string> {
  const maxAttempts = 30; // 最多等待30次
  const interval = 2000; // 每2秒检查一次

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const response = await axios.get<LumaGenerationResponse>(
      `${API_BASE_URL}/luma/generations/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    if (
      response.data.state === "completed" &&
      response.data.result?.video_url
    ) {
      return response.data.result.video_url;
    }

    if (response.data.state === "failed") {
      throw new Error("Video generation failed");
    }

    // 等待一段时间后再次检查
    await new Promise((resolve) => setTimeout(resolve, interval));
  }

  throw new Error("Video generation timeout");
}
