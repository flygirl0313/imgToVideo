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
- **AI 服务**: Luma

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

项目使用环境变量来管理配置。请按照以下步骤设置：

- 复制 `.env.example` 文件为 `.env.local`（用于本地开发）或 `.env`（用于生产环境）
- 填写所有必要的环境变量值
- 确保不要提交包含实际密钥的 `.env` 或 `.env.local` 文件到代码仓库

环境变量说明：

```env
# 数据库
DATABASE_URL="postgresql://username:password@localhost:5432/imgtovideo?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"  # 本地开发
# NEXTAUTH_URL="https://your-domain.com"  # 生产环境
NEXTAUTH_SECRET="your_nextauth_secret"

# GitHub OAuth
GITHUB_ID="your_github_client_id"
GITHUB_SECRET="your_github_client_secret"

# Stripe
STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"  # 本地使用 pk_test_ 开头，生产使用 pk_live_ 开头
STRIPE_SECRET_KEY="your_stripe_secret_key"  # 本地使用 sk_test_ 开头，生产使用 sk_live_ 开头
STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"

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

### 环境变量配置

在部署时，请确保设置所有必要的环境变量。不同平台的环境变量设置方式：

- **Vercel**: 在项目设置中的 Environment Variables 部分添加
- **Netlify**: 在 Site settings > Build & deploy > Environment 中添加
- **其他平台**: 参考相应平台的文档设置环境变量

### 安全注意事项

- 永远不要将包含实际密钥的 `.env` 或 `.env.local` 文件提交到代码仓库
- 使用不同的密钥用于开发和生产环境
- 定期轮换密钥以提高安全性
- 使用环境变量管理工具（如 Vercel 的环境变量管理）来安全地存储生产环境密钥

## 贡献

欢迎提交 Pull Request 或创建 Issue 来改进项目。

## 许可证

MIT License
