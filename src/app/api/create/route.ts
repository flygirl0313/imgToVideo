import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateVideoFromImage } from "@/lib/api/video";

const CREDITS_PER_GENERATION = 9.9;

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 检查是否有足够的积分或免费试用机会
    if (user.credits < CREDITS_PER_GENERATION && user.freeTrialUsed) {
      return NextResponse.json(
        { error: "Insufficient credits" },
        { status: 402 }
      );
    }

    const formData = await req.formData();
    const image = formData.get("image") as File;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (!image || !title) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 验证文件类型
    if (!image.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload an image." },
        { status: 400 }
      );
    }

    // 验证文件大小（最大 10MB）
    if (image.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 10MB." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    const videoUrl = await generateVideoFromImage(buffer);

    // 创建视频记录
    const video = await prisma.video.create({
      data: {
        title,
        description,
        url: videoUrl,
        userId: user.id,
        images: [videoUrl], // 存储视频URL作为图片
        status: "completed",
      },
    });

    // 更新用户积分和免费试用状态
    await prisma.user.update({
      where: { id: user.id },
      data: {
        credits: user.freeTrialUsed
          ? user.credits - CREDITS_PER_GENERATION
          : user.credits,
        freeTrialUsed: true,
      },
    });

    return NextResponse.json(video);
  } catch (error) {
    console.error("Error creating video:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
