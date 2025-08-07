# Extious - 在线简历网站

一个功能完整的在线简历网站，支持中英文切换、在线编辑和导出功能。

## 功能特性

- ✅ **双路由系统**：查看模式 (`/`) 和编辑模式 (`/edit`)
- ✅ **中英文切换**：支持简体中文和英文两种语言
- ✅ **导出功能**：可导出为 PDF 或 PNG 格式
- ✅ **在线编辑**：实时编辑简历内容
- ✅ **响应式设计**：适配各种屏幕尺寸
- ✅ **现代化界面**：使用 Tailwind CSS 构建的美观界面

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **导出**: html2canvas + jsPDF
- **图标**: Lucide React

## 项目结构

```
├── app/                    # Next.js App Router
│   ├── edit/              # 编辑页面
│   │   └── page.tsx
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx          # 主页面 (查看模式)
├── components/            # React 组件
│   ├── CVDisplay.tsx     # 简历显示组件
│   └── Navbar.tsx        # 导航栏组件
├── contexts/             # React Context
│   └── LanguageContext.tsx # 语言上下文
├── types/               # TypeScript 类型定义
│   └── cv.ts           # 简历数据类型和示例数据
├── public/             # 静态资源
└── package.json       # 项目配置
```

## 安装和运行

1. **安装依赖**:
   ```bash
   npm install
   ```

2. **运行开发服务器**:
   ```bash
   npm run dev
   ```

3. **访问应用**:
   打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 使用说明

### 查看简历
- 访问主页面 `/` 可查看简历
- 点击右上角的语言切换按钮可在中英文之间切换
- 点击 "导出PDF" 或 "导出PNG" 按钮可下载简历文件

### 编辑简历
- 访问 `/edit` 页面进入编辑模式
- 点击任意文本内容可进行编辑
- 点击 "保存" 按钮保存更改到本地存储
- 点击 "取消" 按钮重置到原始数据

## 自定义内容

要自定义简历内容，请编辑 `types/cv.ts` 文件中的 `cvDataZh` (中文数据) 和 `cvDataEn` (英文数据) 对象。

### 数据结构

```typescript
interface CVData {
  personalInfo: {
    name: string;        // 姓名
    phone: string;       // 电话
    email: string;       // 邮箱
    website: string;     // 网站
    avatar: string;      // 头像路径
  };
  objective: string;     // 求职意向
  education: {           // 教育经历
    degree: string;
    school: string;
    period: string;
    gpa: string;
    details: string[];
  };
  honors: Array<{        // 荣誉奖项
    title: string;
    year: string;
  }>;
  research: Array<{      // 科研经历
    title: string;
    description: string;
  }>;
  projects: Array<{      // 项目经历
    title: string;
    description: string;
  }>;
  skills: {              // 技能和其他
    technical: string[];
    languages: string[];
    activities: string[];
  };
}
```

## 部署

### Vercel 部署 (推荐)

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 上导入项目
3. 自动部署完成

### 其他平台

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 许可证

MIT License

## 作者

Extious - 赵展

---

### 更新日志

- **v1.0.0** - 初始版本，包含所有基础功能
