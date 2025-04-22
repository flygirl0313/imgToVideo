import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { checkVideoGenerationStatus } from "@/lib/api/video";

export async function GET(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "未登录" }, { status: 401 });
    }

    const { taskId } = params;
    const status = await checkVideoGenerationStatus(taskId);

    return NextResponse.json(status);
  } catch (error) {
    console.error("Error checking video status:", error);
    return NextResponse.json({ error: "检查视频状态失败" }, { status: 500 });
  }
}
