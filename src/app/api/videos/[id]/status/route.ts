import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("未授权", { status: 401 });
    }

    const video = await prisma.video.findUnique({
      where: {
        id: params.id,
        userId: session.user.id,
      },
      select: {
        status: true,
      },
    });

    if (!video) {
      return new NextResponse("视频不存在", { status: 404 });
    }

    return NextResponse.json({ status: video.status });
  } catch (error) {
    console.error("获取视频状态失败:", error);
    return new NextResponse("服务器错误", { status: 500 });
  }
}
