(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const promptUrl = p => `prompt.html?p=${encodeURIComponent(p.slug)}`;

  /* =================== SHARED =================== */
  function wireInstagram(root = document) {
    $$(".js-ig", root).forEach(a => { a.href = SITE.instagram; a.target = "_blank"; a.rel = "noopener"; });
    $$(".js-dm", root).forEach(a => { a.href = SITE.dm; a.target = "_blank"; a.rel = "noopener"; });
    $$(".js-handle", root).forEach(el => (el.textContent = "@" + SITE.handle));
  }
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav
  const toggle = $("#navToggle"), links = $("#navLinks");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  $$("a", links).forEach(a => a.addEventListener("click", () => {
    links.classList.remove("open"); toggle.setAttribute("aria-expanded", false);
  }));

  // Copy + toast
  const toast = $("#toast");
  let toastT;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(() => toast.classList.remove("show"), 1800);
  }
  function fallbackCopy(text) {
    const ta = Object.assign(document.createElement("textarea"), { value: text });
    ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.append(ta); ta.select(); ta.setSelectionRange(0, text.length);
    document.execCommand("copy"); ta.remove();
  }
  async function copy(text) {
    try {
      if (!navigator.clipboard) throw 0;
      await Promise.race([
        navigator.clipboard.writeText(text),
        new Promise((_, rej) => setTimeout(rej, 800)), // don't hang if the browser stalls
      ]);
    } catch { fallbackCopy(text); }
  }

  // Card used on home + "more prompts"
  const card = (p, i = 0) => `
    <a class="card" href="${promptUrl(p)}" data-cat="${esc(p.category)}" style="animation-delay:${i * 60}ms">
      <div class="card-media">
        <img src="${esc(p.cover)}" alt="${esc(p.title)}" loading="lazy" />
        <span class="badge">${esc(p.category)}</span>
        <span class="price">${esc(p.price || "Free")}</span>
      </div>
      <div class="card-body">
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.summary)}</p>
        <div class="card-foot">
          <div class="tools">${(p.tools || []).map(t => `<span>${esc(t)}</span>`).join("")}</div>
          <span class="arrow">Open →</span>
        </div>
      </div>
    </a>`;

  const comingCard = () => `
    <a class="card card-soon js-ig" href="#">
      <div class="soon-inner">
        <span class="soon-plus">+</span>
        <h3>More drops coming</h3>
        <p>New prompts land with every reel. Follow to get them first.</p>
        <span class="arrow">Follow <span class="js-handle">@crawlwithindrajit</span> →</span>
      </div>
    </a>`;

  /* =================== HOME =================== */
  const grid = $("#promptGrid");
  if (grid) {
    const cats = [...new Set(PROMPTS.map(p => p.category))];
    const filters = $("#filters");
    const renderGrid = (cat = "all") => {
      const list = PROMPTS.filter(p => cat === "all" || p.category === cat);
      grid.innerHTML = list.map(card).join("") + (cat === "all" ? comingCard() : "");
      wireInstagram(grid);
    };
    if (cats.length > 1) {
      filters.innerHTML = ["all", ...cats].map((c, i) =>
        `<button class="chip ${i ? "" : "is-active"}" data-cat="${esc(c)}" role="tab" aria-selected="${!i}">${c === "all" ? "All" : esc(c)}</button>`).join("");
      filters.addEventListener("click", e => {
        const chip = e.target.closest(".chip");
        if (!chip) return;
        $$(".chip", filters).forEach(c => { c.classList.toggle("is-active", c === chip); c.setAttribute("aria-selected", c === chip); });
        renderGrid(chip.dataset.cat);
      });
    } else filters.remove();
    renderGrid();

    // Shop
    $("#products").innerHTML = PRODUCTS.map(p => {
      const live = p.status === "live" && p.link;
      return `<div class="product">
        <span class="product-icon">${esc(p.icon)}</span>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.text)}</p>
        <div class="product-foot">
          <span class="status ${live ? "live" : ""}">${live ? esc(p.price) : "Coming soon"}</span>
          ${live
            ? `<a class="btn btn-primary btn-sm" href="${esc(p.link)}" target="_blank" rel="noopener">Buy now</a>`
            : `<a class="btn btn-ghost btn-sm js-dm" href="#">Get early access</a>`}
        </div>
      </div>`;
    }).join("");

    // Steps + facts
    $("#steps").innerHTML = STEPS.map((s, i) => `
      <li class="step"><span class="step-num">${String(i + 1).padStart(2, "0")}</span>
        <h3>${esc(s.title)}</h3><p>${esc(s.text)}</p><span class="tag">${esc(s.tag)}</span></li>`).join("");
    const labels = { ai: "AI fact", bike: "Biker fact", tip: "Pro tip" };
    $("#factsGrid").innerHTML = FACTS.map(f =>
      `<div class="fact"><span class="fact-type ${f.type}">${labels[f.type] || f.type}</span><p>${esc(f.text)}</p></div>`).join("");

    // Stat counter
    const el = $("#statPrompts"), total = PROMPTS.length;
    let n = 0;
    (function tick() { el.textContent = n; if (n++ < total) setTimeout(tick, 90); })();
  }

  /* =================== PROMPT PAGE =================== */
  const detail = $("#detail");
  if (detail) {
    let openLightbox = () => {};
    const slug = new URLSearchParams(location.search).get("p");
    const p = PROMPTS.find(x => x.slug === slug) || (!slug && PROMPTS[0]);

    if (!p) {
      detail.innerHTML = `<div class="not-found">
        <p class="kicker">404</p><h1>Prompt not found</h1>
        <p class="sub">It may have moved. Browse the full library instead.</p>
        <a class="btn btn-primary" href="index.html#prompts">Go to the library →</a></div>`;
    } else {
      document.title = `${p.title} — CrawlWithIndrajit Prompts`;
      $('meta[name="description"]').setAttribute("content", p.summary);

      detail.innerHTML = `
        <a class="back" href="index.html#prompts">← All prompts</a>
        <header class="detail-head">
          <div class="detail-tags"><span class="badge">${esc(p.category)}</span><span class="price">${esc(p.price || "Free")}</span></div>
          <h1>${esc(p.title)}</h1>
          <p class="sub">${esc(p.summary)}</p>
          <div class="tools">${(p.tools || []).map(t => `<span>${esc(t)}</span>`).join("")}${p.output ? `<span>${esc(p.output)}</span>` : ""}</div>
        </header>

        <div class="feature">
          <div class="feature-media">
            <p class="label">Real results</p>
            ${(p.images || []).map(img => `
              <figure class="shot">
                <button class="shot-btn" data-src="${esc(img.src)}" aria-label="View ${esc(img.caption)} full size">
                  <img src="${esc(img.src)}" alt="${esc(img.caption)} — ${esc(p.title)}" loading="lazy" />
                </button>
                <figcaption>${esc(img.caption)}</figcaption>
              </figure>`).join("")}
          </div>
          <div class="feature-body">
            <p class="label">The prompt</p>
            <div class="prompt-wrap">
              <div class="prompt-bar"><span>prompt.txt</span><button class="copy-mini js-copy">Copy</button></div>
              <pre class="prompt">${esc(p.prompt)}</pre>
            </div>
            <div class="feature-actions">
              <button class="btn btn-primary js-copy">Copy full prompt</button>
              ${p.reel ? `<a class="btn btn-ghost" href="${esc(p.reel)}" target="_blank" rel="noopener">Watch the reel</a>` : ""}
              <button class="btn btn-ghost js-share">Share</button>
            </div>
          </div>
        </div>

        ${p.steps && p.steps.length ? `
        <div class="howto">
          <p class="kicker">How to use it</p>
          <h2>Make the reel</h2>
          <ol class="steps">${p.steps.map((s, i) => `
            <li class="step"><span class="step-num">${String(i + 1).padStart(2, "0")}</span>
              <h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`).join("")}
          </ol>
        </div>` : ""}`;

      detail.addEventListener("click", async e => {
        const copyBtn = e.target.closest(".js-copy");
        if (copyBtn) {
          await copy(p.prompt);
          const old = copyBtn.textContent;
          copyBtn.textContent = "Copied ✓";
          setTimeout(() => (copyBtn.textContent = old), 1600);
          showToast("Prompt copied");
          return;
        }
        if (e.target.closest(".js-share")) {
          const data = { title: p.title, text: p.summary, url: location.href };
          if (navigator.share) { try { await navigator.share(data); } catch {} }
          else { await copy(location.href); showToast("Link copied"); }
          return;
        }
        const shot = e.target.closest(".shot-btn");
        if (shot) openLightbox(shot.dataset.src, $("img", shot).alt);
      });

      const others = PROMPTS.filter(x => x !== p);
      if (others.length) { $("#more").hidden = false; $("#moreGrid").innerHTML = others.slice(0, 3).map(card).join(""); }
    }

    // Lightbox
    const lb = $("#lightbox"), lbImg = $("img", lb);
    openLightbox = (src, alt) => { lbImg.src = src; lbImg.alt = alt; lb.hidden = false; document.body.style.overflow = "hidden"; };
    const close = () => { lb.hidden = true; document.body.style.overflow = ""; };
    lb.addEventListener("click", e => { if (e.target !== lbImg) close(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && !lb.hidden) close(); });
  }

  wireInstagram();
})();
