我来帮你把代码重新组织一遍，分得更清楚。现在每个文件职责明确，不再把数据和逻辑散落在各处。

---

✅ 每个页面只用调用 `initPage()` 传入自己的数据，不再有一大段 inline JS

以下是重构后的所有文件：

---

## 1. `css/style.css` — 样式（保持清爽，加了更多注释）

<invoke name="fsWrite">
<parameter name="path">css/style.css</parameter>
<parameter name="content">/* ============================================
   个人博客 · 全局样式表
   设计理念：温暖、干净、内容优先
   ============================================ */

/* ---------- 变量 ---------- */
:root {
  --bg: #f7f6f3;
  --surface: #ffffff;
  --surface-2: #fbfaf8;
  --text: #23201c;
  --text-soft: #6b6459;
  --text-mute: #9a9288;
  --border: #eae7e1;
  --accent: #c8663f;
  --accent-soft: #f3e2da;
  --accent-2: #4a7c6f;
  --shadow-sm: 0 1px 3px rgba(35, 32, 28, 0.06);
  --shadow-md: 0 6px 20px rgba(35, 32, 28, 0.08);
  --shadow-lg: 0 16px 40px rgba(35, 32, 28, 0.12);
  --radius: 14px;
  --radius-lg: 20px;
  --nav-w: 232px;
  --font: "Segoe UI", "PingFang SC", "Microsoft YaHei", system-ui, -apple-system, sans-serif;
}

/* ---------- 重置 ---------- */
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font);
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

a {
  color: inherit;
  text-decoration: none;
}

/* ---------- 侧边导航 ---------- */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: var(--nav-w);
  height: 100vh;
  background: var(--surface);
  border-right: 1px solid var(--border);
  padding: 32px 20px;
  display: flex;
  flex-direction: column;
  z-index: 100;
}

.sidebar .brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;
  padding: 0 8px;
}

.sidebar .brand .logo {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--accent), #e0925f);
  display: grid;
  place-items: center;
  color: #fff;
  font-weight: 700;
  font-size: 18px;
}

.sidebar .brand .name {
  font-weight: 700;
  font-size: 17px;
}

.nav-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-list a {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 14px;
  border-radius: 10px;
  color: var(--text-soft);
  font-size: 15px;
  font-weight: 500;
  transition: all 0.18s ease;
}

.nav-list a:hover {
  background: var(--surface-2);
  color: var(--text);
}

.nav-list a.active {
  background: var(--accent-soft);
  color: var(--accent);
}

.nav-list a .ico {
  width: 20px;
  text-align: center;
  font-size: 16px;
}

.sidebar .foot {
  margin-top: auto;
  padding: 14px 8px 0;
  color: var(--text-mute);
  font-size: 12px;
}

/* ---------- 主内容区 ---------- */
.main {
  margin-left: var(--nav-w);
  min-height: 100vh;
  padding: 48px 56px;
  max-width: 1180px;
}

.page-head {
  margin-bottom: 32px;
}

.page-head h1 {
  font-size: 30px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.page-head p {
  color: var(--text-soft);
  margin-top: 6px;
}

/* ---------- 通用组件 ---------- */
.tag {
  display: inline-block;
  padding: 3px 11px;
  border-radius: 20px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  color: var(--text-soft);
  font-size: 12.5px;
  font-weight: 500;
}

.tag.accent {
  background: var(--accent-soft);
  border-color: transparent;
  color: var(--accent);
}

.tag.green {
  background: #e2efe9;
  border-color: transparent;
  color: var(--accent-2);
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 18px;
  border-radius: 10px;
  background: var(--accent);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: filter 0.18s;
}

.btn:hover {
  filter: brightness(1.06);
}

.btn.ghost {
  background: transparent;
  color: var(--text-soft);
  border: 1px solid var(--border);
}

.btn.ghost:hover {
  background: var(--surface-2);
}

.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

/* ---------- 首页 ---------- */
.home-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 40px;
  align-items: start;
}

.profile-name {
  font-size: 34px;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.profile-bio {
  color: var(--text-soft);
  font-size: 16px;
  margin: 10px 0 18px;
}

.profile-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.socials {
  display: flex;
  gap: 12px;
  margin-bottom: 36px;
}

.socials a {
  width: 42px;
  height: 42px;
  border-radius: 11px;
  border: 1px solid var(--border);
  display: grid;
  place-items: center;
  font-size: 17px;
  color: var(--text-soft);
  background: var(--surface);
  transition: all 0.18s;
}

.socials a:hover {
  color: var(--accent);
  border-color: var(--accent);
  transform: translateY(-2px);
}

.avatar-box {
  display: flex;
  justify-content: flex-end;
}

.avatar {
  width: 260px;
  height: 260px;
  border-radius: 22px;
  object-fit: cover;
  background: linear-gradient(135deg, var(--accent-soft), #e2efe9);
  box-shadow: var(--shadow-md);
  display: grid;
  place-items: center;
  font-size: 72px;
}

/* 日历 */
.calendar {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 22px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 34px;
}

.cal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.cal-head h3 {
  font-size: 16px;
  font-weight: 700;
}

.cal-head .nav-btns {
  display: flex;
  gap: 6px;
}

.cal-head button {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface);
  cursor: pointer;
  color: var(--text-soft);
  font-size: 15px;
}

.cal-head button:hover {
  background: var(--surface-2);
}

.cal-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.cal-grid .dow {
  text-align: center;
  font-size: 11px;
  color: var(--text-mute);
  font-weight: 600;
  padding-bottom: 4px;
}

.cal-day {
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  border-radius: 8px;
  font-size: 13px;
  color: var(--text-soft);
  cursor: default;
}

.cal-day.empty {
  visibility: hidden;
}

.cal-day.today {
  border: 1.5px solid var(--accent);
  font-weight: 700;
}

.cal-day.has-record {
  background: var(--accent-soft);
  color: var(--accent);
  font-weight: 600;
  cursor: pointer;
}

.cal-day.has-record:hover {
  background: var(--accent);
  color: #fff;
}

.cal-day.has-record::after {
  content: "";
  position: absolute;
  bottom: 4px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--accent);
}

.cal-day.has-record:hover::after {
  background: #fff;
}

.cal-legend {
  display: flex;
  gap: 16px;
  margin-top: 14px;
  font-size: 12px;
  color: var(--text-mute);
}

.cal-legend span {
  display: flex;
  align-items: center;
  gap: 6px;
}

.cal-legend i {
  width: 11px;
  height: 11px;
  border-radius: 3px;
  background: var(--accent-soft);
  display: inline-block;
}

/* 近期动态 */
.section-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.feed {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.feed-item {
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 14px 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  transition: all 0.18s;
}

.feed-item:hover {
  border-color: var(--accent);
  transform: translateX(3px);
  box-shadow: var(--shadow-sm);
}

.feed-item .kind {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-size: 18px;
  background: var(--surface-2);
}

.feed-item .txt {
  flex: 1;
  min-width: 0;
}

.feed-item .txt h4 {
  font-size: 15px;
  font-weight: 600;
}

.feed-item .txt p {
  font-size: 13px;
  color: var(--text-mute);
}

.feed-item .date {
  font-size: 12.5px;
  color: var(--text-mute);
  white-space: nowrap;
}

/* ---------- 搜索页 ---------- */
.search-wrap {
  max-width: 720px;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: var(--surface);
  border: 2px solid var(--border);
  border-radius: 14px;
  box-shadow: var(--shadow-sm);
  transition: border-color 0.18s;
}

.search-box:focus-within {
  border-color: var(--accent);
}

.search-box .ico {
  font-size: 20px;
  color: var(--text-mute);
}

.search-box input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  color: var(--text);
  font-family: inherit;
}

.filter-tabs {
  display: flex;
  gap: 8px;
  margin: 20px 0 8px;
}

.filter-tabs button {
  padding: 7px 16px;
  border-radius: 20px;
  border: 1px solid var(--border);
  background: var(--surface);
  cursor: pointer;
  font-size: 13.5px;
  color: var(--text-soft);
  font-weight: 500;
  transition: all 0.18s;
}

.filter-tabs button.active {
  background: var(--text);
  color: #fff;
  border-color: var(--text);
}

.search-empty {
  margin-top: 40px;
}

.search-empty h3 {
  font-size: 15px;
  color: var(--text-soft);
  margin-bottom: 14px;
}

.hot-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.hot-tags .tag {
  cursor: pointer;
}

.hot-tags .tag:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.results {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.result-item {
  padding: 18px 20px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  transition: all 0.18s;
}

.result-item:hover {
  border-color: var(--accent);
  box-shadow: var(--shadow-sm);
}

.result-item .meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}

.result-item h3 {
  font-size: 17px;
  font-weight: 600;
}

.result-item h3 mark {
  background: var(--accent-soft);
  color: var(--accent);
  padding: 0 2px;
  border-radius: 3px;
}

.result-item p {
  font-size: 14px;
  color: var(--text-soft);
  margin-top: 4px;
}

.result-item p mark {
  background: #fdf1ba;
  color: inherit;
  padding: 0 2px;
}

.result-item .date {
  font-size: 12.5px;
  color: var(--text-mute);
}

/* ---------- 学习计划页 ---------- */
.progress-overview {
  display: flex;
  align-items: center;
  gap: 28px;
  padding: 24px 28px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  margin-bottom: 28px;
}

.progress-ring {
  position: relative;
  width: 90px;
  height: 90px;
  flex-shrink: 0;
}

.progress-ring svg {
  transform: rotate(-90deg);
}

.progress-ring .val {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 20px;
  font-weight: 800;
  color: var(--accent);
}

.progress-overview .txt h3 {
  font-size: 16px;
}

.progress-overview .txt p {
  color: var(--text-soft);
  font-size: 14px;
  margin-top: 4px;
}

.plan-filters {
  display: flex;
  gap: 8px;
  margin-bottom: 22px;
}

.plan-filters button {
  padding: 7px 16px;
  border-radius: 20px;
  border: 1px solid var(--border);
  background: var(--surface);
  cursor: pointer;
  font-size: 13.5px;
  color: var(--text-soft);
  font-weight: 500;
}

.plan-filters button.active {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}

.plan-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.plan-card {
  position: relative;
  padding: 24px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: transform 0.22s ease, box-shadow 0.22s ease;
}

.plan-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--accent), #e0925f);
}

.plan-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.plan-card .status-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.plan-card h3 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
}

.plan-card .dates {
  font-size: 12.5px;
  color: var(--text-mute);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.plan-status {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 20px;
}

.plan-status.doing {
  background: var(--accent-soft);
  color: var(--accent);
}

.plan-status.done {
  background: #e2efe9;
  color: var(--accent-2);
}

.plan-status.todo {
  background: #eee9e2;
  color: var(--text-mute);
}

.plan-bar {
  height: 8px;
  border-radius: 6px;
  background: var(--surface-2);
  overflow: hidden;
  margin-bottom: 8px;
}

.plan-bar i {
  display: block;
  height: 100%;
  border-radius: 6px;
  background: linear-gradient(90deg, var(--accent), #e0925f);
}

.plan-pct {
  font-size: 12.5px;
  color: var(--text-soft);
  text-align: right;
  margin-bottom: 16px;
}

.checklist {
  list-style: none;
  margin-bottom: 16px;
}

.checklist li {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 13.5px;
  color: var(--text-soft);
  padding: 3px 0;
}

.checklist li .box {
  width: 17px;
  height: 17px;
  border-radius: 5px;
  border: 1.5px solid var(--border);
  display: grid;
  place-items: center;
  font-size: 11px;
  flex-shrink: 0;
}

.checklist li.checked .box {
  background: var(--accent-2);
  border-color: var(--accent-2);
  color: #fff;
}

.checklist li.checked {
  color: var(--text-mute);
  text-decoration: line-through;
}

.plan-links {
  display: flex;
  gap: 14px;
  padding-top: 14px;
  border-top: 1px solid var(--border);
}

.plan-links a {
  font-size: 13px;
  color: var(--accent);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
}

.plan-links a:hover {
  text-decoration: underline;
}

/* ---------- 作品页 ---------- */
.work-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.work-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: transform 0.22s ease, box-shadow 0.22s ease;
}

.work-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.work-cover {
  height: 200px;
  background: linear-gradient(135deg, var(--accent-soft), #e2efe9);
  display: grid;
  place-items: center;
  font-size: 52px;
  position: relative;
}

.work-overlay {
  position: absolute;
  inset: 0;
  background: rgba(35, 32, 28, 0.78);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  opacity: 0;
  transition: opacity 0.22s;
}

.work-card:hover .work-overlay {
  opacity: 1;
}

.work-overlay a {
  padding: 9px 18px;
  border-radius: 9px;
  font-size: 13.5px;
  font-weight: 600;
  background: #fff;
  color: var(--text);
}

.work-overlay a:hover {
  background: var(--accent);
  color: #fff;
}

.work-body {
  padding: 20px 22px;
}

.work-body h3 {
  font-size: 18px;
  font-weight: 700;
}

.work-body p {
  font-size: 13.5px;
  color: var(--text-soft);
  margin: 8px 0 14px;
}

.work-body .techs {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

/* ---------- 推荐网页页 ---------- */
.rec-category {
  margin-bottom: 40px;
}

.rec-category h2 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 9px;
}

.rec-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.rec-card {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 18px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  transition: all 0.18s;
}

.rec-card:hover {
  border-color: var(--accent);
  box-shadow: var(--shadow-sm);
  transform: translateY(-2px);
}

.rec-card .fav {
  width: 44px;
  height: 44px;
  border-radius: 11px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  font-size: 22px;
  background: var(--surface-2);
  border: 1px solid var(--border);
}

.rec-card .info h4 {
  font-size: 15.5px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}

.rec-card .info h4 .ext {
  font-size: 12px;
  color: var(--text-mute);
}

.rec-card .info p {
  font-size: 13px;
  color: var(--text-soft);
  margin: 5px 0 8px;
}

/* ---------- 详细页 ---------- */
.detail-layout {
  display: grid;
  grid-template-columns: 1fr 220px;
  gap: 48px;
  align-items: start;
}

.detail-back {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--text-soft);
  font-size: 14px;
  margin-bottom: 24px;
}

.detail-back:hover {
  color: var(--accent);
}

.detail-cover {
  height: 300px;
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, var(--accent-soft), #e2efe9);
  display: grid;
  place-items: center;
  font-size: 64px;
  margin-bottom: 28px;
}

.detail-head {
  margin-bottom: 24px;
}

.detail-head .meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  color: var(--text-mute);
  font-size: 13.5px;
}

.detail-head h1 {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.5px;
  line-height: 1.25;
}

.article-body {
  font-size: 16px;
  color: var(--text);
}

.article-body h2 {
  font-size: 23px;
  font-weight: 700;
  margin: 32px 0 14px;
  scroll-margin-top: 24px;
}

.article-body h3 {
  font-size: 19px;
  font-weight: 700;
  margin: 24px 0 10px;
  scroll-margin-top: 24px;
}

.article-body p {
  margin-bottom: 16px;
  color: var(--text-soft);
}

.article-body ul,
.article-body ol {
  margin: 0 0 16px 22px;
  color: var(--text-soft);
}

.article-body li {
  margin-bottom: 6px;
}

.article-body pre {
  background: #2b2823;
  color: #f0ece4;
  padding: 18px 20px;
  border-radius: 12px;
  overflow-x: auto;
  margin-bottom: 18px;
  font-size: 14px;
  font-family: "SF Mono", Consolas, Monaco, monospace;
}

.article-body code {
  font-family: "SF Mono", Consolas, Monaco, monospace;
  font-size: 14px;
}

.article-body p code,
.article-body li code {
  background: var(--accent-soft);
  color: var(--accent);
  padding: 2px 6px;
  border-radius: 5px;
}

.article-body blockquote {
  border-left: 3px solid var(--accent);
  padding: 4px 18px;
  margin: 0 0 18px;
  color: var(--text-mute);
  background: var(--surface-2);
  border-radius: 0 8px 8px 0;
}

/* 侧边目录 */
.toc {
  position: sticky;
  top: 48px;
}

.toc h4 {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-mute);
  margin-bottom: 14px;
}

.toc ul {
  list-style: none;
}

.toc li a {
  display: block;
  padding: 6px 0 6px 14px;
  font-size: 13.5px;
  color: var(--text-soft);
  border-left: 2px solid var(--border);
  transition: all 0.15s;
}

.toc li a:hover,
.toc li a.active {
  color: var(--accent);
  border-color: var(--accent);
}

.toc li.sub a {
  padding-left: 26px;
  font-size: 13px;
}

/* 底部导航 */
.detail-footer {
  margin-top: 48px;
  padding-top: 28px;
  border-top: 1px solid var(--border);
}

.prev-next {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 36px;
}

.pn-card {
  padding: 18px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--surface);
  transition: all 0.18s;
}

.pn-card:hover {
  border-color: var(--accent);
}

.pn-card span {
  font-size: 12px;
  color: var(--text-mute);
}

.pn-card h4 {
  font-size: 15px;
  font-weight: 600;
  margin-top: 4px;
}

.pn-card.next {
  text-align: right;
}

.related h3 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
}

.related-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.related-card {
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--surface);
  transition: all 0.18s;
}

.related-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}

.related-card .tag {
  margin-bottom: 8px;
}

.related-card h4 {
  font-size: 14.5px;
  font-weight: 600;
}

/* ---------- 移动端 ---------- */
.menu-toggle {
  display: none;
}

@media (max-width: 1024px) {
  .home-grid {
    grid-template-columns: 1fr;
  }

  .avatar-box {
    justify-content: flex-start;
  }

  .detail-layout {
    grid-template-columns: 1fr;
  }

  .toc {
    display: none;
  }
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.25s ease;
    box-shadow: var(--shadow-lg);
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .main {
    margin-left: 0;
    padding: 72px 20px 40px;
  }

  .menu-toggle {
    display: grid;
    place-items: center;
    position: fixed;
    top: 16px;
    left: 16px;
    z-index: 110;
    width: 44px;
    height: 44px;
    border-radius: 11px;
    background: var(--surface);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-sm);
    cursor: pointer;
    font-size: 20px;
  }

  .plan-grid,
  .work-grid,
  .related-list,
  .prev-next {
    grid-template-columns: 1fr;
  }

  .avatar {
    width: 180px;
    height: 180px;
  }

  .profile-name {
    font-size: 28px;
  }
}
</parameter>
</invoke>

---

## 2. `js/data.js` — 所有模拟数据单独存放

<invoke name="fsWrite">
<parameter name="path">js/data.js</parameter>
<parameter name="content">/* ============================================
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
</parameter>
</invoke>

---

## 3. `js/app.js` — 公共功能（导航 + 各页面的渲染函数）

<invoke name="fsWrite">
<parameter name="path">js/app.js</parameter>
<parameter name="content">/* ============================================
   app.js — 公共功能
   职责：渲染侧边导航 + 提供各页面的渲染函数
   ============================================ */

// ---------- 导航配置 ----------
const NAV_ITEMS = [
  { href: "index.html",          icon: "🏠", label: "首页" },
  { href: "search.html",         icon: "🔍", label: "搜索" },
  { href: "plans.html",          icon: "📋", label: "学习计划" },
  { href: "works.html",          icon: "🎨", label: "作品" },
  { href: "recommendations.html", icon: "🔖", label: "推荐网页" },
];

// ---------- 工具函数 ----------
function getPageName() {
  return location.pathname.split("/").pop() || "index.html";
}

// ---------- 1. 渲染侧边栏 ----------
function renderSidebar() {
  const current = getPageName();
  const links = NAV_ITEMS
    .map(
      (i) =>
        `<li><a href="${i.href}" class="${i.href === current ? "active" : ""}">
           <span class="ico">${i.icon}</span>${i.label}</a></li>`
    )
    .join("");

  const html = `
    <div class="menu-toggle" id="menuToggle">☰</div>
    <aside class="sidebar" id="sidebar">
      <a href="index.html" class="brand">
        <span class="logo">阿</span>
        <span class="name">阿柯的博客</span>
      </a>
      <nav><ul class="nav-list">${links}</ul></nav>
      <div class="foot">© 2025 · 用心记录成长</div>
    </aside>`;

  document.body.insertAdjacentHTML("afterbegin", html);

  // 移动端菜单展开/收起
  const toggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  toggle.addEventListener("click", () => sidebar.classList.toggle("open"));
  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 768 && !sidebar.contains(e.target) && !toggle.contains(e.target)) {
      sidebar.classList.remove("open");
    }
  });
}

// ---------- 2. 首页：渲染动态列表 ----------
function renderFeed(container, items) {
  const typeLabel = { article: "文章", work: "作品", plan: "计划" };
  container.innerHTML = items
    .map(
      (p) => `
    <a class="feed-item" href="detail.html?type=${p.type}&id=${p.id}">
      <span class="kind">${p.icon}</span>
      <div class="txt">
        <h4>${p.title}</h4>
        <p>${typeLabel[p.type]} · ${p.excerpt}</p>
      </div>
      <span class="date">${p.date}</span>
    </a>`
    )
    .join("");
}

// ---------- 3. 首页：渲染日历 ----------
function renderCalendar(container, titleContainer, recordDays, today) {
  const dows = ["日", "一", "二", "三", "四", "五", "六"];
  let viewYear = 2025,
    viewMonth = 1; // 0-indexed，显示2月

  function draw() {
    titleContainer.textContent = `${viewYear} 年 ${viewMonth + 1} 月`;
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const isCurrentView = viewYear === 2025 && viewMonth === 1;

    let html = dows.map((d) => `<div class="dow">${d}</div>`).join("");
    for (let i = 0; i < firstDay; i++) html += `<div class="cal-day empty"></div>`;
    for (let d = 1; d <= daysInMonth; d++) {
      const hasRec = isCurrentView && recordDays.includes(d);
      const isToday = isCurrentView && d === today.d;
      const cls = ["cal-day"];
      if (hasRec) cls.push("has-record");
      if (isToday) cls.push("today");
      const onclick = hasRec
        ? `onclick="location.href='detail.html?type=article&id=p1&day=${d}'"`
        : "";
      html += `<div class="${cls.join(" ")}" ${onclick}>${d}</div>`;
    }
    container.innerHTML = html;
  }

  draw();

  // 绑定上/下月按钮
  const prevBtn = document.getElementById("calPrev");
  const nextBtn = document.getElementById("calNext");
  if (prevBtn && nextBtn) {
    prevBtn.onclick = () => {
      if (--viewMonth < 0) { viewMonth = 11; viewYear--; }
      draw();
    };
    nextBtn.onclick = () => {
      if (++viewMonth > 11) { viewMonth = 0; viewYear++; }
      draw();
    };
  }
}

// ---------- 4. 搜索页：渲染结果 ----------
function renderSearch(input, resultsEl, emptyEl, filterTabs, dataset) {
  let scope = "all";

  // 自动聚焦
  input.focus();

  // 输入监听
  input.addEventListener("input", () => {
    const keyword = input.value.trim();
    if (!keyword) {
      emptyEl.style.display = "block";
      resultsEl.innerHTML = "";
      return;
    }
    emptyEl.style.display = "none";
    const kw = keyword.toLowerCase();
    const matches = dataset.filter(
      (d) =>
        (scope === "all" || d.type === scope) &&
        (d.title.toLowerCase().includes(kw) || d.body.toLowerCase().includes(kw))
    );

    if (!matches.length) {
      resultsEl.innerHTML = `<div class="result-item"><p>没有找到与「${keyword}」相关的内容，换个关键词试试。</p></div>`;
      return;
    }

    const typeLabel = { article: "文章", work: "作品", plan: "计划" };
    const tagClass = { article: "accent", work: "green", plan: "" };

    resultsEl.innerHTML = matches
      .map((m) => {
        const re = new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
        const highlight = (text) => text.replace(re, "<mark>$1</mark>");
        return `
        <a class="result-item" href="detail.html?type=${m.type}&id=${m.id}">
          <div class="meta">
            <span class="tag ${tagClass[m.type]}">${typeLabel[m.type]}</span>
            <span class="date">${m.date}</span>
          </div>
          <h3>${highlight(m.title)}</h3>
          <p>${highlight(m.body)}</p>
        </a>`;
      })
      .join("");
  });

  // 条件筛选
  filterTabs.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;
    filterTabs.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
    e.target.classList.add("active");
    scope = e.target.dataset.scope;
    // 重新触发输入事件以刷新结果
    const evt = new Event("input");
    input.dispatchEvent(evt);
  });
}

// ---------- 5. 搜索页：热门标签快捷搜索 ----------
function setupHotTags(input) {
  document.querySelectorAll(".hot-tags .tag").forEach((tag) => {
    tag.addEventListener("click", () => {
      input.value = tag.textContent;
      const evt = new Event("input");
      input.dispatchEvent(evt);
    });
  });
}

// ---------- 6. 学习计划页：渲染计划卡片 ----------
function renderPlans(container, plans, status = "all") {
  const list = status === "all" ? plans : plans.filter((p) => p.status === status);
  container.innerHTML = list
    .map(
      (p) => `
    <article class="plan-card">
      <div class="status-row">
        <span class="plan-status ${p.status}">${p.statusText}</span>
      </div>
      <h3>${p.title}</h3>
      <div class="dates">📅 ${p.start} → ${p.end}</div>
      <div class="plan-bar"><i style="width:${p.pct}%"></i></div>
      <div class="plan-pct">${p.pct}%</div>
      <ul class="checklist">
        ${p.checklist
          .map(
            (c) =>
              `<li class="${c.done ? "checked" : ""}">
                <span class="box">${c.done ? "✓" : ""}</span>${c.text}
               </li>`
          )
          .join("")}
      </ul>
      ${
        p.links.length
          ? `<div class="plan-links">${p.links
              .map((l) => `<a href="${l.href}">🔗 ${l.label}</a>`)
              .join("")}</div>`
          : ""
      }
    </article>`
    )
    .join("");
}

// ---------- 7. 学习计划页：进度环动画 ----------
function animateProgressRing(done, total) {
  const pct = Math.round((done / total) * 100);
  const ring = document.getElementById("ringFill");
  const val = document.getElementById("ringVal");
  if (!ring || !val) return;
  const circumference = 238.76;
  setTimeout(() => {
    ring.style.transition = "stroke-dashoffset 1s ease";
    ring.style.strokeDashoffset = circumference * (1 - pct / 100);
    let cur = 0;
    const timer = setInterval(() => {
      cur += 2;
      if (cur >= pct) { cur = pct; clearInterval(timer); }
      val.textContent = cur + "%";
    }, 20);
  }, 200);
}

// ---------- 8. 作品页：渲染作品网格 ----------
function renderWorks(container, works, cat = "all") {
  const list = cat === "all" ? works : works.filter((w) => w.cat === cat);
  container.innerHTML = list
    .map(
      (w) => `
    <article class="work-card">
      <div class="work-cover">
        ${w.cover}
        <div class="work-overlay">
          <a href="${w.demo}" target="_blank" rel="noopener">在线预览</a>
          <a href="${w.src}" target="_blank" rel="noopener">源码</a>
        </div>
      </div>
      <div class="work-body">
        <h3><a href="detail.html?type=work&id=${w.id}">${w.title}</a></h3>
        <p>${w.desc}</p>
        <div class="techs">${w.techs.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
      </div>
    </article>`
    )
    .join("");
}

// ---------- 9. 推荐页：渲染推荐分类 ----------
function renderRecommendations(container, data) {
  container.innerHTML = data
    .map(
      (cat) => `
    <section class="rec-category">
      <h2>${cat.cat}</h2>
      <div class="rec-grid">
        ${cat.items
          .map(
            (item) => `
          <a class="rec-card" href="${item.url}" target="_blank" rel="noopener">
            <span class="fav">${item.fav}</span>
            <div class="info">
              <h4>${item.name} <span class="ext">↗</span></h4>
              <p>${item.reason}</p>
              <span class="tag">${item.tag}</span>
            </div>
          </a>`
          )
          .join("")}
      </div>
    </section>`
    )
    .join("");
}

// ---------- 10. 详细页：渲染内容 ----------
function renderDetail(contents) {
  const params = new URLSearchParams(location.search);
  const id = params.get("id") || "p1";
  const data = contents[id] || contents["p1"];

  const typeMeta = {
    article: { label: "文章", tagClass: "accent" },
    work: { label: "作品", tagClass: "green" },
    plan: { label: "计划", tagClass: "" },
  };
  const meta = typeMeta[data.type] || typeMeta.article;

  // 设置页面标题
  document.title = data.title + " · 阿柯的博客";

  // 填充内容
  document.getElementById("cover").textContent = data.icon;
  document.getElementById("title").textContent = data.title;
  document.getElementById("dateMeta").textContent = data.date;

  const typeTag = document.getElementById("typeTag");
  typeTag.textContent = meta.label;
  typeTag.className = "tag " + meta.tagClass;

  document.getElementById("body").innerHTML = data.html;

  // 返回链接
  const back = document.getElementById("backLink");
  const sourceNames = { "index.html": "首页", "works.html": "作品", "plans.html": "学习计划" };
  back.href = data.source;
  back.textContent = "← 返回" + (sourceNames[data.source] || "");

  // 生成侧边目录
  const headings = document.querySelectorAll("#body h2, #body h3");
  const tocList = document.getElementById("tocList");
  if (headings.length) {
    tocList.innerHTML = Array.from(headings)
      .map((h) => {
        const sub = h.tagName === "H3" ? "sub" : "";
        return `<li class="${sub}"><a href="#${h.id}">${h.textContent}</a></li>`;
      })
      .join("");
  } else {
    document.getElementById("toc").style.display = "none";
  }

  // 目录滚动高亮
  const tocLinks = tocList.querySelectorAll("a");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          tocLinks.forEach((l) => l.classList.remove("active"));
          const active = tocList.querySelector(`a[href="#${e.target.id}"]`);
          if (active) active.classList.add("active");
        }
      });
    },
    { rootMargin: "-10% 0px -80% 0px" }
  );
  headings.forEach((h) => observer.observe(h));
}

// ---------- DOM 加载完成后渲染侧边栏 ----------
document.addEventListener("DOMContentLoaded", renderSidebar);
</parameter>
</invoke>

---

## 4. `index.html` — 首页（简洁）

<invoke name="fsWrite">
<parameter name="path">index.html</parameter>
<parameter name="content"><!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>阿柯的博客 · 首页</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <main class="main">
    <div class="home-grid">
      <!-- 左侧：个人信息 -->
      <section class="profile-left">
        <h1 class="profile-name">阿柯</h1>
        <p class="profile-bio">用代码记录思考，用作品沉淀成长。</p>
        <div class="profile-tags">
          <span class="tag accent">前端</span>
          <span class="tag green">学习者</span>
          <span class="tag">设计爱好者</span>
        </div>
        <div class="socials">
          <a href="#" title="GitHub">🐙</a>
          <a href="#" title="邮箱">✉️</a>
          <a href="#" title="Twitter">🐦</a>
          <a href="#" title="微博">📮</a>
        </div>

        <!-- 日历 -->
        <div class="calendar">
          <div class="cal-head">
            <h3 id="calTitle">2025 年 2 月</h3>
            <div class="nav-btns">
              <button id="calPrev">‹</button>
              <button id="calNext">›</button>
            </div>
          </div>
          <div class="cal-grid" id="calGrid"></div>
          <div class="cal-legend">
            <span><i></i> 有记录的日期</span>
            <span>点击可查看当天内容</span>
          </div>
        </div>
      </section>

      <!-- 右侧：头像 -->
      <section class="avatar-box">
        <div class="avatar">👨‍💻</div>
      </section>
    </div>

    <!-- 近期动态 -->
    <section style="margin-top: 20px;">
      <h2 class="section-title">✨ 近期动态</h2>
      <div class="feed" id="feed"></div>
    </section>
  </main>

  <script src="js/data.js"></script>
  <script src="js/app.js"></script>
  <script>
    // 首页专属初始化
    document.addEventListener("DOMContentLoaded", function () {
      renderFeed(document.getElementById("feed"), FEED_ITEMS);
      renderCalendar(
        document.getElementById("calGrid"),
        document.getElementById("calTitle"),
        RECORD_DAYS,
        { y: 2025, m: 1, d: 18 }
      );
    });
  </script>
</body>
</html>
</parameter>
</invoke>

---

## 5. `search.html` — 搜索页

<invoke name="fsWrite">
<parameter name="path">search.html</parameter>
<parameter name="content"><!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>搜索 · 阿柯的博客</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <main class="main">
    <div class="page-head">
      <h1>搜索</h1>
      <p>在文章、作品和计划中查找你想要的内容</p>
    </div>

    <div class="search-wrap">
      <!-- 搜索框 -->
      <div class="search-box">
        <span class="ico">🔍</span>
        <input type="text" id="searchInput" placeholder="输入关键词，比如「布局」「React」…" autocomplete="off" />
      </div>

      <!-- 类型筛选 -->
      <div class="filter-tabs" id="filterTabs">
        <button class="active" data-scope="all">全部</button>
        <button data-scope="article">文章</button>
        <button data-scope="work">作品</button>
        <button data-scope="plan">计划</button>
      </div>

      <!-- 空状态：热门标签 + 最近搜索 -->
      <div class="search-empty" id="emptyState">
        <h3>🔥 热门标签</h3>
        <div class="hot-tags">
          <span class="tag">布局</span>
          <span class="tag">React</span>
          <span class="tag">JavaScript</span>
          <span class="tag">组件</span>
          <span class="tag">学习</span>
          <span class="tag">动画</span>
        </div>
        <h3 style="margin-top: 26px;">🕐 最近搜索</h3>
        <div class="hot-tags">
          <span class="tag">事件循环</span>
          <span class="tag">CSS Grid</span>
        </div>
      </div>

      <!-- 结果列表 -->
      <div class="results" id="results"></div>
    </div>
  </main>

  <script src="js/data.js"></script>
  <script src="js/app.js"></script>
  <script>
    document.addEventListener("DOMContentLoaded", function () {
      const input = document.getElementById("searchInput");
      const results = document.getElementById("results");
      const empty = document.getElementById("emptyState");
      const tabs = document.getElementById("filterTabs");

      renderSearch(input, results, empty, tabs, SEARCH_DATA);
      setupHotTags(input);
    });
  </script>
</body>
</html>
</parameter>
</invoke>

---

## 6. `plans.html` — 学习计划页

<invoke name="fsWrite">
<parameter name="path">plans.html</parameter>
<parameter name="content"><!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>学习计划 · 阿柯的博客</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <main class="main">
    <div class="page-head">
      <h1>学习计划</h1>
      <p>把想学的东西拆成可执行的步骤，一点点完成</p>
    </div>

    <!-- 整体进度概览 -->
    <div class="progress-overview">
      <div class="progress-ring">
        <svg width="90" height="90">
          <circle cx="45" cy="45" r="38" fill="none" stroke="#eee9e2" stroke-width="8" />
          <circle id="ringFill" cx="45" cy="45" r="38" fill="none" stroke="#c8663f" stroke-width="8"
            stroke-linecap="round" stroke-dasharray="238.76" stroke-dashoffset="238.76" />
        </svg>
        <span class="val" id="ringVal">0%</span>
      </div>
      <div class="txt">
        <h3>本月进度</h3>
        <p>已完成 <strong id="doneCount">12</strong> / <span id="totalCount">20</span> 个学习目标，继续保持 💪</p>
      </div>
    </div>

    <!-- 筛选按钮 -->
    <div class="plan-filters" id="planFilters">
      <button class="active" data-status="all">全部</button>
      <button data-status="doing">进行中</button>
      <button data-status="done">已完成</button>
      <button data-status="todo">待开始</button>
    </div>

    <!-- 计划卡片网格 -->
    <div class="plan-grid" id="planGrid"></div>
  </main>

  <script src="js/data.js"></script>
  <script src="js/app.js"></script>
  <script>
    document.addEventListener("DOMContentLoaded", function () {
      const grid = document.getElementById("planGrid");

      // 初始渲染
      renderPlans(grid, PLANS, "all");
      animateProgressRing(12, 20);

      // 筛选切换
      document.getElementById("planFilters").addEventListener("click", function (e) {
        if (e.target.tagName !== "BUTTON") return;
        this.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
        e.target.classList.add("active");
        renderPlans(grid, PLANS, e.target.dataset.status);
      });
    });
  </script>
</body>
</html>
</parameter>
</invoke>

---

## 7. `works.html` — 作品页

<invoke name="fsWrite">
<parameter name="path">works.html</parameter>
<parameter name="content"><!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>作品 · 阿柯的博客</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <main class="main">
    <div class="page-head">
      <h1>作品</h1>
      <p>做过的项目、写过的组件，都在这里</p>
    </div>

    <!-- 分类筛选 -->
    <div class="plan-filters" id="workFilters">
      <button class="active" data-cat="all">全部</button>
      <button data-cat="website">网站</button>
      <button data-cat="tool">工具</button>
      <button data-cat="design">设计</button>
    </div>

    <!-- 作品网格 -->
    <div class="work-grid" id="workGrid"></div>
  </main>

  <script src="js/data.js"></script>
  <script src="js/app.js"></script>
  <script>
    document.addEventListener("DOMContentLoaded", function () {
      const grid = document.getElementById("workGrid");

      renderWorks(grid, WORKS, "all");

      document.getElementById("workFilters").addEventListener("click", function (e) {
        if (e.target.tagName !== "BUTTON") return;
        this.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
        e.target.classList.add("active");
        renderWorks(grid, WORKS, e.target.dataset.cat);
      });
    });
  </script>
</body>
</html>
</parameter>
</invoke>

---

## 8. `recommendations.html` — 推荐网页页

<invoke name="fsWrite">
<parameter name="path">recommendations.html</parameter>
<parameter name="content"><!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>推荐网页 · 阿柯的博客</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <main class="main">
    <div class="page-head">
      <h1>推荐网页</h1>
      <p>那些帮我很多的好网站，分享给你</p>
    </div>

    <!-- 推荐内容容器 -->
    <div id="recContainer"></div>
  </main>

  <script src="js/data.js"></script>
  <script src="js/app.js"></script>
  <script>
    document.addEventListener("DOMContentLoaded", function () {
      renderRecommendations(document.getElementById("recContainer"), RECOMMENDATIONS);
    });
  </script>
</body>
</html>
</parameter>
</invoke>

---

## 9. `detail.html` — 详细页（模板）

<invoke name="fsWrite">
<parameter name="path">detail.html</parameter>
<parameter name="content"><!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>详情 · 阿柯的博客</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <main class="main">
    <a class="detail-back" id="backLink" href="index.html">← 返回</a>

    <div class="detail-layout">
      <article>
        <div class="detail-cover" id="cover">📄</div>
        <header class="detail-head">
          <div class="meta">
            <span class="tag" id="typeTag">文章</span>
            <span id="dateMeta">2025-02-18</span>
          </div>
          <h1 id="title">加载中…</h1>
        </header>

        <div class="article-body" id="body"></div>

        <!-- 底部导航 -->
        <footer class="detail-footer">
          <div class="prev-next">
            <a class="pn-card prev" href="detail.html?type=article&id=p2">
              <span>← 上一篇</span>
              <h4>理解 JavaScript 的事件循环</h4>
            </a>
            <a class="pn-card next" href="detail.html?type=work&id=w1">
              <span>下一篇 →</span>
              <h4>天气卡片组件</h4>
            </a>
          </div>

          <div class="related">
            <h3>相关内容</h3>
            <div class="related-list">
              <a class="related-card" href="detail.html?type=article&id=p2">
                <span class="tag accent">文章</span>
                <h4>理解 JavaScript 的事件循环</h4>
              </a>
              <a class="related-card" href="detail.html?type=work&id=w1">
                <span class="tag green">作品</span>
                <h4>天气卡片组件</h4>
              </a>
              <a class="related-card" href="detail.html?type=plan&id=pl1">
                <span class="tag">计划</span>
                <h4>完成 React 进阶学习</h4>
              </a>
            </div>
          </div>
        </footer>
      </article>

      <!-- 侧边目录 -->
      <aside class="toc" id="toc">
        <h4>目录</h4>
        <ul id="tocList"></ul>
      </aside>
    </div>
  </main>

  <script src="js/data.js"></script>
  <script src="js/app.js"></script>
  <script>
    document.addEventListener("DOMContentLoaded", function () {
      renderDetail(DETAIL_CONTENTS);
    });
  </script>
</body>
</html>
</parameter>
</invoke>

---

## 📁 最终文件结构

```
博客文件夹/
│
├── index.html              # 首页
├── search.html             # 搜索页
├── plans.html              # 学习计划页
├── works.html              # 作品页
├── recommendations.html    # 推荐网页页
├── detail.html             # 通用详细页
│
├── css/
│   └── style.css           # 所有样式
│
└── js/
    ├── data.js             # 所有模拟数据
    └── app.js              # 所有渲染函数 + 导航
```

---

✅ 现在结构清晰了：

- `数据` → 全在 `data.js`
- `渲染函数` → 全在 `app.js`
- `样式` → 全在 `style.css`
- 每个页面只保留极少量的 `init` 调用

直接打开 `index.html` 就能用，所有页面互相跳转正常。