import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

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
  imageBuffer: Buffer,
  userPrompt: string
): Promise<string> {
  try {
    // 将图片转换为 base64
    const base64Image = imageBuffer.toString("base64");
    const dataUrl = `data:image/jpeg;base64,${base64Image}`;

    // 调用 Luma API 生成视频
    const output = await replicate.run("lucataco/luma:latest", {
      input: {
        image: dataUrl,
        user_prompt: userPrompt,
        expand_prompt: true,
      },
    });

    if (!output || typeof output !== "string") {
      throw new Error("Failed to generate video");
    }

    return output;
  } catch (error) {
    console.error("Error generating video:", error);
    throw error;
  }
}
