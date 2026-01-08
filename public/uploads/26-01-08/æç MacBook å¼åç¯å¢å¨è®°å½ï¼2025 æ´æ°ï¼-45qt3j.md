# 我的 MacBook 前端开发环境配置全记录（2025 年版）

> 一名前端开发者的 macOS 开发实践、工作流与工具习惯整理，兼具轻量、实用、可复制性

---

## 🧩 前言：写在前面

从 2024 年 11 月首发入手 M4 MacBook Pro 到现在，已经过去了大半年。期间经历了系统数次迭代，项目也从本地开发转向了更多容器化、AI 辅助开发的方式。

本文将完整分享我当前的 MacBook 开发环境，包括：

- 设备配置与 macOS 系统习惯
- Node.js + Docker 全 JS 开发环境
- 科学上网与代理方案
- 各类效率工具与插件
- 我的极简硬件使用策略

希望这篇记录对准备换机、迁移环境或重构开发流程的你有所帮助。

---

## 💻 设备与系统版本

- **设备型号**：MacBook Pro M4 Pro 14 寸
- **配置参数**：24GB RAM + 512GB SSD
- **系统版本**：macOS 15.5

这台 Mac 的性能和能耗表现十分平衡，对于前端日常开发、容器运行、图形工具来说绰绰有余。

我选择不连接外接显示器，也不外接键盘，保持设备轻量、工作流清爽，专注于“移动办公 + 桌面轻使用”的平衡。

---

## 🧰 系统环境与开发工具链

### 📦 Homebrew 安装管理

我不追求“装一堆工具”，而是只装最基础必需：

```bash
brew install node
```

其它语言环境一律通过 Docker 隔离。

### 🧱 Node.js 与 JavaScript

- 只使用 Node.js + JavaScript 做前后端开发
- 前端项目中常使用 `pnpm`、`vite`、`next.js`
- 后端接口/服务用 `express` / `hono` 搭建（在 Docker 中）

Node.js 是我开发栈的核心，简单直接，依赖少，部署方便。

### 🐳 Docker 服务环境

所有后端环境服务统一容器管理，包括：

- MySQL
- PostgreSQL
- Redis

配置用 `.env` 和 `docker-compose.yml` 组织，例如：

```yaml
version: "3"
services:
  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: root
    ports:
      - "3306:3306"

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
```

如果对 Dockerfile 不熟，直接使用 ChatGPT / Copilot 生成即可，足够稳定高效。

---

## 🖥️ 终端配置与习惯

- **终端程序**：macOS 默认终端
- **Shell 环境**：Oh My Zsh（使用默认配置）
- **字体主题**：系统默认字体
- **插件管理**：未做额外美化，追求简洁和响应速度

```bash
alias dev='pnpm dev'
alias dcu='docker compose up -d'
alias dcd='docker compose down'
```

没有刻意折腾终端的 fancy 配置，专注于功能。

---

## ✨ 编辑器与 AI 辅助工具

### 主力开发工具：Cursor

- 一款结合 Copilot、GPT 模型的编辑器
- 支持 AI 自动补全、代码片段、重构建议
- 在 JS/TS 项目中体验极佳

### 辅助提示工具：Augment

- 一个为 AI 提示工程优化的侧边工具
- 能提升 ChatGPT、Claude、Cursor 内部模型的“理解能力”

---

## 🌐 网络与科学上网设置

- **macOS**：使用 Clash Verge Rev

  - 开启 TUN 模式即可获得完整全局代理
  - 适合 terminal、brew、npm 全部代理访问

- **iPhone / iPad**：使用 Shadowrocket，配置相同订阅链接

建议使用第三方订阅服务（如机场），并搭配 rule 分流规则优化访问速度。

Terminal 可选设置：

```bash
export ALL_PROXY=socks5://127.0.0.1:7890
```

---

## 🧱 外设使用与便携策略

### 家中办公配置

- **显示器**：华硕 ASUS PA279CV（4K / 色准专业向）
- **鼠标**：雷蛇 Razer 炼狱蝰蛇 V2 X 极速版
- **连接方式**：Type-C to Type-A 转接器（解决无 USB-A 接口问题）

### 移动使用方案

- 通常只携带 MacBook 本体 + 鼠标（甚至鼠标都可省）
- Mac 的触控板已能胜任大部分操作
- 鼠标仅用于长时间操作时的舒适性

相比配齐设备，我更喜欢轻装出行。

---

## ⚙️ 系统辅助工具与插件推荐

| 工具名称          | 用途说明                            | 安装命令                                      |
| ----------------- | ----------------------------------- | --------------------------------------------- |
| **PixPin**        | 截图 + OCR，适合图注与文本识别      | [官网下载](https://pixpinapp.com)             |
| **Stats**         | 菜单栏监控 CPU/内存/网络等指标      | `brew install --cask stats`                   |
| **Mac Mouse Fix** | 自定义鼠标侧键/滚轮等行为，适配雷蛇 | `brew install --cask mac-mouse-fix`           |
| **Notion**        | 文档、学习笔记、项目管理            | `brew install --cask notion`                  |
| **Lark (飞书)**   | 团队协作、任务进度管理              | `brew install --cask lark`                    |
| **Bitwarden**     | 开源密码管理器                      | `brew install --cask bitwarden`               |
| **沉浸式翻译**    | 浏览器插件，支持网页自动翻译        | [Chrome 商店](https://immersivetranslate.com) |
| **Dark Reader**   | 网页暗黑模式                        | [Chrome 商店](https://darkreader.org)         |

---

## 🔁 开发工作流小结

- 全部前后端用 JavaScript 实现，统一技术栈
- Node + Docker 管理服务，简洁、可复制
- 编辑器 + AI 提示让开发更高效
- 环境配置不繁琐，但保持可维护、可迁移
- 鼠标、终端、终端主题一切从简，实用优先

---

## ✅ 总结与建议

- **轻量胜过复杂**：折腾配置要适度，能用就好
- **环境即服务**：用 Docker 隔离一切后端依赖
- **终端够用就行**：Oh My Zsh + 默认配置即可
- **系统工具选精不选多**：别把时间浪费在装插件上
- **硬件极简主义**：MacBook 一台走天下不是梦

## 参考

- [**Mac**终极配置教程](https://g4ti0r.github.io/wiki/Mac/index.html)

## 加入我们

欢迎加入前端技术交流圈，与 10000+开发者一起：

- 探讨前端最新技术趋势
- 解决开发难题
- 分享职场经验
- 获取优质学习资源

添加方式：[掘金摸鱼沸点](https://juejin.cn/pin/7480860616153923594) 👈 扫码进群
