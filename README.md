# Simplex Knowledge Base

基于 Vue 3、Vite 和本地 `@simplex2/element-plus-frame` 构建的配置驱动知识库。导航、文章和章节内容由 Mock JSON Buzz 配置渲染；页面模型、组件校验和 Element Plus 适配均由 frame 包提供。

## 本地依赖

本项目通过 `file:` 引用相邻工程：

```text
../simplex2-elementUI-frame
../simplex2-frame
```

请保留上述目录关系，并按 frame 工程的要求使用 Node.js `^22.18.0` 或 `>=24.12.0`。

## 开发

```sh
npm install
npm run dev
```

生产构建：

```sh
npm run build
```

## 已迁移内容

- `public/mock/buzz/Buzz*.json`：51 份独立 JSON Mock 响应，包括知识库入口、专题文章和组件案例。
- `src/config/knowledge-routes.json`：知识库路由与 Buzz 编号映射。
- `src/config/pages/index.js`：通过 `fetch` 请求 `/mock/buzz/Buzz<编号>.json`；替换为实际接口时只需调整此处。
- `src/Buzz/`、`src/router/`、`src/styles/knowledge.scss`：加载 Mock 数据、路由和知识库展示所需的宿主代码。

不再保留 JavaScript Buzz 配置或配置生成工具函数。Mock 文件只包含标准 JSON 数据，可直接作为接口响应返回。

本项目**不复制** `simplex2-elementUI-frame` 的组件定义、模型或 Vue 组件实现；它们继续由本地链接的 `@simplex2/element-plus-frame` 运行时包提供。
