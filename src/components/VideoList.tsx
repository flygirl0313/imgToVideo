import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Trash2 } from "lucide-react";

interface Video {
  id: string;
  url: string;
  status: "processing" | "completed" | "failed";
  createdAt: string;
}

interface VideoListProps {
  videos: Video[];
}

export function VideoList({ videos }: VideoListProps) {
  if (videos.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-gray-600 mb-4">您还没有创建任何视频</p>
        <Button asChild>
          <a href="/create">开始创建</a>
        </Button>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <Card key={video.id} className="overflow-hidden">
          <div className="aspect-video relative bg-gray-100">
            {video.status === "completed" ? (
              <video
                src={video.url}
                className="w-full h-full object-cover"
                controls
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
                  <p className="text-gray-600">
                    {video.status === "processing"
                      ? "视频生成中..."
                      : "生成失败"}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold">视频 #{video.id.slice(0, 6)}</h3>
              <span
                className={`text-sm ${
                  video.status === "completed"
                    ? "text-green-500"
                    : video.status === "processing"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {video.status === "completed"
                  ? "已完成"
                  : video.status === "processing"
                  ? "处理中"
                  : "失败"}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              {new Date(video.createdAt).toLocaleString()}
            </p>
            <div className="flex gap-2 mt-4">
              {video.status === "completed" && (
                <Button variant="outline" size="sm" asChild>
                  <a href={video.url} download>
                    <Download className="w-4 h-4 mr-2" />
                    下载
                  </a>
                </Button>
              )}
              <Button variant="outline" size="sm" className="text-red-500">
                <Trash2 className="w-4 h-4 mr-2" />
                删除
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
