import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardContent } from "@/components/DashboardContent";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  // 获取用户信息和视频列表
  const [user, videos] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { credits: true },
    }),
    prisma.video.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
        status: true,
        title: true,
        description: true,
        url: true,
        thumbnail: true,
      },
    }),
  ]);

  return <DashboardContent session={session} user={user} videos={videos} />;
}
