# 图片转视频

一个使用 AI 技术将图片转换为精美动画视频的 Web 应用。

## 功能特点

- 🎨 AI 视频生成：使用先进的 AI 技术将图片转换为精美的动画视频
- 🎥 高质量输出：支持高分辨率视频，流畅的动画效果
- 🚀 简单易用：直观的界面设计，无需专业技能
- 💳 积分系统：支持购买积分，解锁更多功能
- 👤 用户管理：支持 GitHub 登录，管理个人作品

## 技术栈

- **前端框架**: Next.js 14
- **样式**: Tailwind CSS
- **数据库**: PostgreSQL
- **ORM**: Prisma
- **认证**: NextAuth.js
- **支付**: Stripe
- **AI 服务**: Replicate

## 快速开始

### 环境要求

- Node.js 18.17.0 或更高版本
- PostgreSQL 数据库

### 安装步骤

1. 克隆仓库

```bash
git clone https://github.com/yourusername/imgtovideo.git
cd imgtovideo
```

2. 安装依赖

```bash
npm install
```

3. 配置环境变量
   创建 `.env` 文件并添加以下配置：

```env
# 数据库
DATABASE_URL="postgresql://username:password@localhost:5432/imgtovideo?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_nextauth_secret"

# GitHub OAuth
GITHUB_ID="your_github_client_id"
GITHUB_SECRET="your_github_client_secret"

# Stripe
STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"
STRIPE_SECRET_KEY="your_stripe_secret_key"
STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"

# Replicate API
REPLICATE_API_TOKEN="your_replicate_api_token"
```

4. 初始化数据库

```bash
npx prisma migrate dev
```

5. 启动开发服务器

```bash
npm run dev
```

## 项目结构

```
src/
├── app/                    # Next.js 应用路由
│   ├── api/               # API 路由
│   ├── create/            # 创建视频页面
│   ├── dashboard/         # 用户仪表盘
│   └── pricing/           # 价格方案页面
├── components/            # React 组件
│   ├── ui/               # UI 组件
│   └── ...               # 其他组件
├── lib/                   # 工具函数和配置
└── types/                 # TypeScript 类型定义
```

## 部署

项目可以部署到 Vercel、Netlify 或其他支持 Next.js 的平台。

### Vercel 部署

1. 将项目推送到 GitHub
2. 在 Vercel 上导入项目
3. 配置环境变量
4. 部署

## 贡献

欢迎提交 Pull Request 或创建 Issue 来改进项目。

## 许可证

MIT License
