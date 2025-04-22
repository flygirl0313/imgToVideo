import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateVideoFromImage } from "@/lib/api/video";

const CREDITS_PER_GENERATION = 9.9;

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "未登录" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        credits: true,
        freeTrialUsed: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "用户不存在" }, { status: 404 });
    }

    // 检查是否有足够的积分或免费试用机会
    if (user.credits < CREDITS_PER_GENERATION && user.freeTrialUsed) {
      return NextResponse.json({ error: "积分不足" }, { status: 402 });
    }

    const formData = await req.formData();
    const image = formData.get("image") as File;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (!image || !title || !description) {
      return NextResponse.json({ error: "缺少必要字段" }, { status: 400 });
    }

    // 验证文件类型
    if (!image.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "无效的文件类型，请上传图片" },
        { status: 400 }
      );
    }

    // 验证文件大小（最大 5MB）
    if (image.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "文件太大，最大支持 5MB" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await image.arrayBuffer());

    // 检查 base64 大小
    const base64Size = buffer.length * 1.37; // base64 字符串大小约为原始大小的 1.37 倍
    if (base64Size > 10 * 1024 * 1024) {
      // 10MB base64 限制
      return NextResponse.json(
        { error: "图片太大，请压缩后重试" },
        { status: 400 }
      );
    }

    const { taskId } = await generateVideoFromImage(buffer, description);

    // 创建视频记录，初始状态为 processing
    const video = await prisma.video.create({
      data: {
        title,
        description,
        userId: user.id,
        images: [], // 初始为空数组，等待任务完成后更新
        status: "processing",
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

    return NextResponse.json({ ...video, taskId });
  } catch (error) {
    console.error("Error creating video:", error);
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 });
  }
}
