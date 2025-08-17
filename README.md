# 前端工程师进阶指南

这是一个使用VitePress构建的前端技术博客，涵盖HTML、CSS、JavaScript、React和前端工程化等多个方面的内容。

## 部署状态

[![Deploy VitePress site to GitHub Pages](https://github.com/Adorrain/fronted/actions/workflows/deploy.yml/badge.svg)](https://github.com/Adorrain/fronted/actions/workflows/deploy.yml)

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run docs:dev

# 构建静态文件
npm run docs:build

# 预览构建结果
npm run docs:preview
```

## 目录结构

- `docs/`: 文档源文件
  - `html-css/`: HTML和CSS相关文档
  - `javascript/`: JavaScript相关文档
  - `react/`: React相关文档
  - `engineering/`: 前端工程化相关文档
  - `.vitepress/`: VitePress配置文件

## 技术栈

- [VitePress](https://vitepress.dev/): 基于Vue的静态站点生成器
- [GitHub Pages](https://pages.github.com/): 静态网站托管服务
- [GitHub Actions](https://github.com/features/actions): 自动化工作流程