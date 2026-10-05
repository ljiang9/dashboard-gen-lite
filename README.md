# dashboard-gen-lite

**单文件离线 HTML 仪表盘生成器**：把内嵌的 JSON 数据（指标卡 + 渠道访问量）渲染成一个带指标卡和柱状图的静态仪表盘。无任何外部依赖，双击 `index.html` 即可在浏览器打开。配套 `test.js` 用 Node 断言校验数据与渲染结构。

## 功能简介

- 从内嵌 JSON 自动渲染**指标卡**（标签 / 数值 / 涨跌幅度）。
- 按渠道访问量渲染**纯 DOM 柱状图**，自动按最大值归一。
- 完全离线：无 CDN、无外链 CSS/JS。

## 快速开始

```bash
# 直接用浏览器打开
open index.html        # macOS
# 或：在本目录起个静态服务后访问
```

运行断言测试：

```bash
node test.js
```

输出形如：

```
PASS: 指标卡数量 = 4
PASS: 渠道数量 = 4
...
全部断言通过
```

## 如何替换成自己的数据

编辑 `index.html` 里 `<script id="dashboard-data" type="application/json">` 块中的 JSON：
- `metrics`：指标卡数组，每项 `{label, value, delta, up}`；
- `channels`：柱状图数据，每项 `{name, value}`。

## 目录说明

```
dashboard-gen-lite/
├── index.html   # 单文件仪表盘（内嵌数据 + 渲染脚本）
├── test.js      # Node 断言聚合
├── README.md
├── LICENSE
└── .gitignore
```

## License

MIT License，Copyright (c) 2026 ljiang9。
