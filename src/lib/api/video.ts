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
}

interface LumaTaskResponse {
  id: string;
  state: string;
  created_at: string;
  request: {
    prompt: string;
    aspect_ratio: string;
  };
  video?: {
    url: string;
  };
}

export async function generateVideoFromImage(
  imageBuffer: Buffer,
  userPrompt: string
): Promise<{ taskId: string }> {
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
        timeout: 30000, // 设置 30 秒超时，因为只需要等待任务创建
      }
    );

    if (!response.data || !response.data.id) {
      throw new Error("Failed to create video generation task");
    }

    // 返回任务ID，让前端轮询任务状态
    return { taskId: response.data.id };
  } catch (error) {
    console.error("Error creating video generation task:", error);
    throw error;
  }
}

export async function checkVideoGenerationStatus(
  taskId: string
): Promise<{ status: string; videoUrl?: string }> {
  try {
    const response = await axios.get<LumaTaskResponse>(
      `${API_BASE_URL}/luma/generations/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
        timeout: 30000, // 设置 30 秒超时
      }
    );

    if (response.data.state === "completed" && response.data.video?.url) {
      return {
        status: "completed",
        videoUrl: response.data.video?.url,
      };
    }

    if (response.data.state === "failed") {
      return { status: "failed" };
    }

    return { status: "processing" };
  } catch (error) {
    console.error("Error checking video generation status:", error);
    throw error;
  }
}
