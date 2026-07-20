/* ============================================
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
        <span class="name">迷図的博客</span>
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
  document.title = data.title + " · 迷図的博客";

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
