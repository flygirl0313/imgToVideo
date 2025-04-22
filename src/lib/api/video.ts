const API_KEY = process.env.VIDEO_API_KEY;
const API_BASE_URL = process.env.VIDEO_API_BASE_URL;

if (!API_KEY || !API_BASE_URL) {
  throw new Error("Missing required environment variables for video API");
}

interface VideoGenerationResponse {
  id: string;
  object: string;
  created: number;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export async function generateVideoFromImage(
  imageBuffer: Buffer
): Promise<string> {
  try {
    // 1. 将图片转换为 base64
    const base64Image = imageBuffer.toString("base64");

    // 2. 调用 API 生成视频
    const response = await fetch(`${API_BASE_URL}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "flux",
        messages: [
          {
            role: "system",
            content:
              "你是一个专业的视频生成助手，请根据用户提供的图片生成视频。",
          },
          {
            role: "user",
            content: `请将这张图片转换为视频：[图片]${base64Image}`,
          },
        ],
        stream: false,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error?.message || "Failed to generate video");
    }

    const data: VideoGenerationResponse = await response.json();

    if (!data.choices?.[0]?.message?.content) {
      throw new Error("No video URL in response");
    }

    // 3. 从响应中提取视频 URL
    const content = data.choices[0].message.content;
    const videoUrlMatch = content.match(/\[视频\](.*?)\[/);

    if (!videoUrlMatch?.[1]) {
      throw new Error("Could not extract video URL from response");
    }

    return videoUrlMatch[1];
  } catch (error) {
    console.error("Video generation error:", error);
    throw error;
  }
}
