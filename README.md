# Simplex Knowledge Base

基于 Vue 3、Vite、Vue Router 和 `@simplex2/element-plus-frame` 构建的配置驱动知识库。页面不再加载 JavaScript Buzz 配置或调用配置生成工具函数：所有知识库内容均来自可由接口直接返回的标准 JSON Mock 数据。

## 技术与运行时

| 能力 | 实现 |
| --- | --- |
| 页面框架 | Vue 3 + Vite |
| 路由 | Vue Router 4，HTML5 History |
| UI 渲染 | Element Plus + `@simplex2/element-plus-frame` |
| 页面协议 | Simplex `type` / `kind` / `version` 节点树 |
| Mock 数据 | `public/mock/buzz/Buzz*.json` |
| 样式 | `src/styles/knowledge.scss` |

`@simplex2/element-plus-frame` 和 `@simplex2/framework` 是运行时依赖，负责页面校验、模型创建、递归渲染及 Element Plus 组件适配。本项目不复制其组件定义、模型或 Vue 组件实现。

## 开发

环境要求：Node.js `^22.18.0` 或 `>=24.12.0`。

```sh
npm install
npm run dev
```

生产构建：

```sh
npm run build
```

## GitHub Pages 部署

推送到 `dev` 分支会触发 `.github/workflows/deploy-pages.yml`。工作流使用仓库名设置 Vite base，构建后发布到：

```text
https://yangguifnag.github.io/simplex2-knowledge/
```

首次部署前，在仓库 **Settings → Pages** 中将 Source 设为 **GitHub Actions**。工作流会将 `dist/index.html` 复制为 `dist/404.html`，使直接访问知识库深层 History 路由时仍能加载单页应用。

本地构建默认以根路径运行。要模拟 GitHub Pages 的仓库子路径：

```sh
VITE_BASE=/simplex2-knowledge/ npm run build
```

## 页面加载链路

```text
Vue Router
  -> Buzz / BuzzRoutePage
  -> resolvePageConfig(buzzNo)
  -> GET /mock/buzz/Buzz<十位编号>.json
  -> SimplexElementPage
  -> @simplex2/element-plus-frame
  -> Element Plus
```

- 知识库入口：`/buzz/2026092702`
- 专题文章：`/buzz/2026092702/<专题路径>`
- 直接 Buzz 页面：`/buzz/<十位编号>`
- 未匹配路径：重定向到知识库入口。

`src/config/knowledge-routes.json` 保存入口路径及 49 条知识专题的 `key`、`path`、`title`、`buzzNo` 映射。路由代码只读取这份 JSON，不再生成或拼接页面内容。

## Mock JSON 数据

`public/mock/buzz/` 中有 51 份独立的 `Buzz<十位编号>.json` 文件，包含：

- 知识库框架与导航入口 `Buzz2026092702.json`
- 项目、架构、组件、开发与集成专题
- 组件案例总页 `Buzz2026092729.json`
- 各组件的配置说明与展示案例
- 原始组件集成案例 `Buzz1234567890.json`

每份文件均为严格 JSON，可通过接口原样返回。页面根节点使用当前兼容的 Buzz 结构：

```json
{
  "type": "Knowledge",
  "kind": "Article",
  "version": "1.0.0",
  "title": "文章标题",
  "children": []
}
```

节点必须包含非空的 `type`、`kind`、`version`。`children` 必须是数组；值只能使用 JSON 基础类型、数组和普通对象。日期、时间等动态值必须以字符串表示，不应在接口数据中传递 `Date`、函数、`Map`、`Set` 或循环引用。

## 从 Mock 切换到接口

唯一的数据加载边界是 `src/config/pages/index.js` 中的 `resolvePageConfig(buzzNo)`：

1. 它验证十位 Buzz 编号。
2. 它请求 `${BASE_URL}mock/buzz/Buzz<编号>.json`。
3. HTTP 404 返回 `null`，其他非成功响应抛出带状态码的错误。
4. `Buzz.vue` 和 `BuzzRoutePage.vue` 将加载和渲染错误显示在页面中。

接入后端时，仅将该函数中的 `fetch` URL 改为业务 API；保持接口响应为单个 Buzz JSON 对象即可，无需修改路由、页面组件或 `SimplexElementPage` 的调用方式。

## 目录

```text
public/
  mock/buzz/                 # 51 份纯 JSON Mock 响应
src/
  Buzz/                      # JSON 加载、错误展示与滚动位置控制
  config/
    knowledge-routes.json    # 知识库专题与 Buzz 编号映射
    pages/index.js           # 统一的 Mock/API 请求入口
  router/                    # 知识库与单 Buzz 页面路由
  styles/knowledge.scss      # 知识库布局、背景与滚动条样式
  main.js                    # Element Plus、Simplex 插件与 Router 注册
```
