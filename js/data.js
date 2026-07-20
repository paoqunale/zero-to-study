
/* ============================================
   模拟数据：文章 / 作品 / 计划 / 推荐
   后续接入后端后，替换这里的数组即可
   ============================================ */

// ---------- 首页动态列表 ----------
const FEED_ITEMS = [
  { type: "article", icon: "📝", title: "从零搭建一个响应式布局",   date: "2025-02-18", excerpt: "记录用 CSS Grid 与 Flexbox 组合完成自适应界面的思路。", id: "p1" },
  { type: "article", icon: "📝", title: "理解 JavaScript 的事件循环", date: "2025-02-12", excerpt: "宏任务、微任务到底怎么排队，一次讲清楚。",           id: "p2" },
  { type: "work",    icon: "🎨", title: "天气卡片组件",              date: "2025-02-15", excerpt: "一个带动效的天气展示组件，纯前端实现。",               id: "w1" },
  { type: "plan",    icon: "📋", title: "完成 React 进阶学习",       date: "2025-02-10", excerpt: "本周更新：完成 Hooks 深入部分。",                    id: "pl1" },
];

// ---------- 日历中有记录的日期（当前月） ----------
const RECORD_DAYS = [3, 5, 8, 12, 15, 18, 22, 25];

// ---------- 搜索数据集 ----------
const SEARCH_DATA = [
  { type: "article", id: "p1", title: "从零搭建一个响应式布局",        date: "2025-02-18", body: "使用 CSS Grid 与 Flexbox 完成自适应布局，处理断点与媒体查询。" },
  { type: "article", id: "p2", title: "理解 JavaScript 的事件循环",     date: "2025-02-12", body: "深入 JavaScript 的宏任务与微任务，讲清楚事件循环的排队机制。" },
  { type: "work",    id: "w1", title: "天气卡片组件",                   date: "2025-02-15", body: "带动画效果的天气展示组件，纯前端实现，可复用。" },
  { type: "work",    id: "w2", title: "Todo 应用",                     date: "2025-01-28", body: "用 React 构建的任务管理应用，支持拖拽排序。" },
  { type: "plan",    id: "pl1", title: "完成 React 进阶学习",          date: "2025-02-10", body: "系统学习 React Hooks、性能优化与组件设计模式。" },
  { type: "plan",    id: "pl2", title: "CSS 动画专项练习",             date: "2025-02-05", body: "每周完成两个 CSS 动画 demo，掌握过渡与关键帧动画。" },
];

// ---------- 学习计划 ----------
const PLANS = [
  {
    id: "pl1", title: "完成 React 进阶学习", status: "doing", statusText: "进行中",
    start: "2025-02-01", end: "2025-02-28", pct: 65,
    checklist: [
      { text: "掌握 useState / useEffect", done: true },
      { text: "深入 useMemo / useCallback", done: true },
      { text: "自定义 Hooks 实践", done: false },
      { text: "性能优化专题", done: false },
    ],
    links: [{ label: "学习笔记", href: "detail.html?type=article&id=p2" }],
  },
  {
    id: "pl2", title: "CSS 动画专项练习", status: "doing", statusText: "进行中",
    start: "2025-02-05", end: "2025-03-05", pct: 40,
    checklist: [
      { text: "transition 基础", done: true },
      { text: "keyframes 关键帧", done: false },
      { text: "复杂交互动画", done: false },
    ],
    links: [{ label: "相关作品", href: "detail.html?type=work&id=w1" }],
  },
  {
    id: "pl3", title: "读完《JavaScript 高级程序设计》", status: "done", statusText: "已完成",
    start: "2025-01-01", end: "2025-01-31", pct: 100,
    checklist: [
      { text: "基础语法与类型", done: true },
      { text: "面向对象与原型", done: true },
      { text: "异步编程", done: true },
    ],
    links: [{ label: "读书笔记", href: "detail.html?type=article&id=p1" }],
  },
  {
    id: "pl4", title: "学习 TypeScript", status: "todo", statusText: "待开始",
    start: "2025-03-01", end: "2025-03-31", pct: 0,
    checklist: [
      { text: "类型系统入门", done: false },
      { text: "泛型与工具类型", done: false },
      { text: "在 React 中使用 TS", done: false },
    ],
    links: [],
  },
];

// ---------- 作品集 ----------
const WORKS = [
  { id: "w1", cat: "tool",    cover: "🌤️", title: "天气卡片组件",    desc: "带动效的天气展示组件，支持多城市切换。",            techs: ["HTML", "CSS", "JS"],  demo: "#", src: "#" },
  { id: "w2", cat: "website", cover: "✅",  title: "Todo 应用",       desc: "用 React 构建的任务管理应用，支持拖拽排序与本地存储。", techs: ["React", "TypeScript"], demo: "#", src: "#" },
  { id: "w3", cat: "design",  cover: "🎨",  title: "个人品牌视觉",     desc: "一套完整的个人视觉规范，包含配色、字体与图标。",      techs: ["Figma", "设计系统"],     demo: "#", src: "#" },
  { id: "w4", cat: "website", cover: "📖",  title: "在线文档站",       desc: "基于静态生成器搭建的技术文档站点，支持全文搜索。",    techs: ["Vue", "Vite"],          demo: "#", src: "#" },
];

// ---------- 推荐网页 ----------
const RECOMMENDATIONS = [
  {
    cat: "🛠️ 工具", items: [
      { fav: "🎨", name: "Coolors",       reason: "快速生成配色方案，做设计的好帮手。", tag: "配色",     url: "https://coolors.co" },
      { fav: "📐", name: "Can I use",     reason: "查询 CSS / JS 特性的浏览器兼容性。",  tag: "兼容性",   url: "https://caniuse.com" },
      { fav: "✂️", name: "Squoosh",       reason: "在线图片压缩，效果好又直观。",        tag: "图片",     url: "https://squoosh.app" },
    ],
  },
  {
    cat: "📚 学习资源", items: [
      { fav: "📘", name: "MDN Web Docs",          reason: "前端开发者的权威文档，遇事不决就查它。", tag: "文档", url: "https://developer.mozilla.org" },
      { fav: "🎓", name: "freeCodeCamp",           reason: "免费的编程学习平台，练手项目丰富。",       tag: "课程", url: "https://www.freecodecamp.org" },
      { fav: "💡", name: "JavaScript.info",        reason: "现代 JavaScript 教程，讲得深入浅出。",      tag: "教程", url: "https://javascript.info" },
    ],
  },
  {
    cat: "🎨 设计", items: [
      { fav: "🖼️", name: "Dribbble",              reason: "设计灵感聚集地，看看别人怎么做界面。",      tag: "灵感", url: "https://dribbble.com" },
      { fav: "🔤", name: "Google Fonts",          reason: "免费开源字体库，网页排版必备。",            tag: "字体", url: "https://fonts.google.com" },
    ],
  },
  {
    cat: "✨ 灵感", items: [
      { fav: "🌟", name: "Awwwards",               reason: "全球优秀网站奖项，审美天花板。",            tag: "网站", url: "https://www.awwwards.com" },
      { fav: "📦", name: "CodePen",               reason: "看别人写的前端小 demo，可直接调试。",        tag: "代码", url: "https://codepen.io" },
    ],
  },
];

// ---------- 详细页内容 ----------
const DETAIL_CONTENTS = {
  p1: {
    type: "article", icon: "📝", title: "从零搭建一个响应式布局", date: "2025-02-18", source: "index.html",
    html: `
      <p>响应式布局是现代前端的基本功。这篇笔记记录我从零开始，用 <code>CSS Grid</code> 和 <code>Flexbox</code> 搭建自适应界面的完整思路。</p>
      <h2 id="s1">为什么需要响应式</h2>
      <p>用户的设备五花八门，从手机到超宽显示器都要照顾到。与其为每种设备写一套页面，不如让布局自己"流动"起来。</p>
      <blockquote>好的响应式设计，是让内容在任何屏幕上都保持清晰和舒适。</blockquote>
      <h2 id="s2">核心工具</h2>
      <h3 id="s2-1">Flexbox 一维布局</h3>
      <p>适合处理一行或一列的排布，比如导航栏、卡片内的元素对齐。</p>
      <pre><code>.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}</code></pre>
      <h3 id="s2-2">Grid 二维布局</h3>
      <p>适合整体页面结构，可以同时控制行和列。</p>
      <pre><code>.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}</code></pre>
      <h2 id="s3">断点与媒体查询</h2>
      <p>在关键宽度处调整布局，常用断点：</p>
      <ul>
        <li>768px 以下：移动端，单列布局</li>
        <li>1024px 以下：平板，两列</li>
        <li>更大：桌面，多列</li>
      </ul>
      <h2 id="s4">小结</h2>
      <p>响应式的核心不是记住多少断点，而是理解内容优先。先让内容自然流动，再在必要处微调。</p>`,
  },
  p2: {
    type: "article", icon: "📝", title: "理解 JavaScript 的事件循环", date: "2025-02-12", source: "index.html",
    html: `
      <p>事件循环（Event Loop）是理解 JavaScript 异步行为的关键。</p>
      <h2 id="s1">调用栈</h2>
      <p>JS 是单线程的，所有同步代码在调用栈中依次执行。</p>
      <h2 id="s2">宏任务与微任务</h2>
      <p>异步任务分为两类，微任务优先级高于宏任务。</p>
      <ul>
        <li>宏任务：<code>setTimeout</code>、<code>setInterval</code></li>
        <li>微任务：<code>Promise.then</code>、<code>queueMicrotask</code></li>
      </ul>
      <h2 id="s3">执行顺序</h2>
      <p>每轮循环：执行一个宏任务 → 清空所有微任务 → 渲染 → 下一轮。</p>`,
  },
  w1: {
    type: "work", icon: "🌤️", title: "天气卡片组件", date: "2025-02-15", source: "works.html",
    html: `
      <p>一个带动效的天气展示组件，纯前端实现，可以嵌入任何项目。</p>
      <h2 id="s1">项目信息</h2>
      <ul>
        <li>技术栈：HTML / CSS / JavaScript</li>
        <li><a href="#" target="_blank">在线预览</a> · <a href="#" target="_blank">查看源码</a></li>
      </ul>
      <h2 id="s2">功能特点</h2>
      <ul>
        <li>支持多城市切换</li>
        <li>天气图标带过渡动画</li>
        <li>响应式，适配移动端</li>
      </ul>
      <h2 id="s3">实现思路</h2>
      <p>用 CSS 动画实现天气图标的动态效果，数据层预留接口，方便接入真实天气 API。</p>`,
  },
  pl1: {
    type: "plan", icon: "📋", title: "完成 React 进阶学习", date: "2025-02-10", source: "plans.html",
    html: `
      <p>系统学习 React 进阶知识，目标是能独立设计可维护的组件架构。</p>
      <h2 id="s1">学习目标</h2>
      <ul>
        <li>掌握核心 Hooks 的原理与使用</li>
        <li>理解性能优化手段</li>
        <li>能封装可复用的自定义 Hooks</li>
      </ul>
      <h2 id="s2">进度</h2>
      <p>当前完成 65%，正在攻克自定义 Hooks 部分。</p>
      <h2 id="s3">关联笔记</h2>
      <p>相关笔记见 <a href="detail.html?type=article&id=p2">理解 JavaScript 的事件循环</a>。</p>`,
  },
};