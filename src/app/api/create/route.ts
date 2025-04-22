import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateVideoFromImage } from "@/lib/api/video";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const imageFile = formData.get("image") as File;

    if (!imageFile) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // 验证文件类型
    if (!imageFile.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload an image." },
        { status: 400 }
      );
    }

    // 验证文件大小（最大 10MB）
    if (imageFile.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 10MB." },
        { status: 400 }
      );
    }

    // 将 File 转换为 Buffer
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 1. 创建视频记录
    const video = await prisma.video.create({
      data: {
        user: {
          connect: {
            id: session.user.id,
          },
        },
        title: imageFile.name.split(".")[0] || "New Video",
        status: "processing",
        url: "", // 初始为空，后续更新
      },
    });

    try {
      // 2. 调用视频生成 API
      const videoUrl = await generateVideoFromImage(buffer);

      // 3. 更新视频记录
      await prisma.video.update({
        where: { id: video.id },
        data: {
          status: "completed",
          url: videoUrl,
        },
      });

      return NextResponse.json({
        id: video.id,
        status: "completed",
        url: videoUrl,
      });
    } catch (error) {
      console.error("Video generation error:", error);

      // 如果视频生成失败，更新视频状态
      await prisma.video.update({
        where: { id: video.id },
        data: {
          status: "failed",
        },
      });

      return NextResponse.json(
        {
          error:
            error instanceof Error ? error.message : "Failed to generate video",
          id: video.id,
          status: "failed",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error creating video:", error);
    return NextResponse.json(
      { error: "Failed to create video" },
      { status: 500 }
    );
  }
}
