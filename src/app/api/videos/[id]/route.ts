import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// PATCH /api/videos/[id] - Update a video
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "未登录" }, { status: 401 });
    }

    const body = await request.json();
    const { url, images, status } = z
      .object({
        url: z.string().url().optional(),
        images: z.array(z.string().url()).optional(),
        status: z.enum(["processing", "completed", "failed"]).optional(),
      })
      .parse(body);

    // 检查视频是否存在且属于当前用户
    const video = await prisma.video.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    });

    if (!video) {
      return NextResponse.json({ error: "视频不存在" }, { status: 404 });
    }

    // 更新视频记录
    const updatedVideo = await prisma.video.update({
      where: { id: params.id },
      data: {
        ...(url && { url }),
        ...(images && { images }),
        ...(status && { status }),
      },
    });

    return NextResponse.json(updatedVideo);
  } catch (error) {
    console.error("Error updating video:", error);
    return NextResponse.json(
      { error: "Failed to update video" },
      { status: 500 }
    );
  }
}
