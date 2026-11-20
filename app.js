(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // ---------- Instagram links (open profile in new tab / the app on phones) ----------
  $$(".js-ig").forEach(a => { a.href = SITE.instagram; a.target = "_blank"; a.rel = "noopener"; });
  $$(".js-handle").forEach(el => (el.textContent = "@" + SITE.handle));
  $("#year").textContent = new Date().getFullYear();

  // ---------- Prompt blocks ----------
  const list = $("#promptList");
  list.innerHTML = PROMPTS.map((p, i) => `
    <article class="feature">
      <div class="feature-media">
        ${(p.images || []).map(img => `
          <figure class="shot">
            <button class="shot-btn" data-src="${esc(img.src)}" aria-label="View ${esc(img.caption)} full size">
              <img src="${esc(img.src)}" alt="${esc(img.caption)} — ${esc(p.title)}" loading="lazy" />
            </button>
            <figcaption>${esc(img.caption)}</figcaption>
          </figure>`).join("")}
      </div>

      <div class="feature-body">
        <span class="badge">${esc(p.tag)}</span>
        <h3>${esc(p.title)}</h3>
        <p class="sub">${esc(p.description)}</p>
        <div class="tools">${(p.tools || []).map(t => `<span>${esc(t)}</span>`).join("")}</div>

        <div class="prompt-wrap">
          <div class="prompt-bar">
            <span>prompt.txt</span>
            <button class="copy-mini js-copy" data-i="${i}">Copy</button>
          </div>
          <pre class="prompt">${esc(p.prompt)}</pre>
        </div>

        <div class="feature-actions">
          <button class="btn btn-primary js-copy" data-i="${i}">Copy full prompt</button>
          ${p.reel
            ? `<a class="btn btn-ghost" href="${esc(p.reel)}" target="_blank" rel="noopener">Watch the reel</a>`
            : `<a class="btn btn-ghost" href="#how">How to make the reel →</a>`}
        </div>
      </div>
    </article>`).join("");

  // ---------- Copy ----------
  const toast = $("#toast");
  let toastT;
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
  list.addEventListener("click", async e => {
    const btn = e.target.closest(".js-copy");
    if (btn) {
      await copy(PROMPTS[btn.dataset.i].prompt);
      const old = btn.textContent;
      btn.textContent = "Copied ✓";
      setTimeout(() => (btn.textContent = old), 1600);
      toast.classList.add("show");
      clearTimeout(toastT);
      toastT = setTimeout(() => toast.classList.remove("show"), 1800);
      return;
    }
    const shot = e.target.closest(".shot-btn");
    if (shot) openLightbox(shot.dataset.src, $("img", shot).alt);
  });

  // ---------- Lightbox ----------
  const lb = $("#lightbox"), lbImg = $("img", lb);
  function openLightbox(src, alt) { lbImg.src = src; lbImg.alt = alt; lb.hidden = false; document.body.style.overflow = "hidden"; }
  function closeLightbox() { lb.hidden = true; document.body.style.overflow = ""; }
  lb.addEventListener("click", e => { if (e.target !== lbImg) closeLightbox(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !lb.hidden) closeLightbox(); });

  // ---------- Steps ----------
  $("#steps").innerHTML = STEPS.map((s, i) => `
    <li class="step">
      <span class="step-num">${String(i + 1).padStart(2, "0")}</span>
      <h3>${esc(s.title)}</h3>
      <p>${esc(s.text)}</p>
      <span class="tag">${esc(s.tag)}</span>
    </li>`).join("");

  // ---------- Facts ----------
  const labels = { ai: "AI fact", bike: "Biker fact", tip: "Pro tip" };
  $("#factsGrid").innerHTML = FACTS.map(f =>
    `<div class="fact"><span class="fact-type ${f.type}">${labels[f.type] || f.type}</span><p>${esc(f.text)}</p></div>`
  ).join("");

  // ---------- Mobile nav ----------
  const toggle = $("#navToggle"), links = $("#navLinks");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  $$("a", links).forEach(a => a.addEventListener("click", () => {
    links.classList.remove("open"); toggle.setAttribute("aria-expanded", false);
  }));
})();
