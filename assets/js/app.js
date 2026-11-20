/* Interactivity only — all content is already in the HTML (built by scripts/build.js). */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  /* ---------- Mobile nav ---------- */
  const toggle = $("#navToggle"), links = $("#navLinks");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });
    $$("a", links).forEach(a => a.addEventListener("click", () => {
      links.classList.remove("open"); toggle.setAttribute("aria-expanded", false);
    }));
  }

  /* ---------- Toast + copy ---------- */
  const toast = $("#toast");
  let toastT;
  const showToast = msg => {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(() => toast.classList.remove("show"), 1800);
  };
  const fallbackCopy = text => {
    const ta = Object.assign(document.createElement("textarea"), { value: text });
    ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.append(ta); ta.select(); ta.setSelectionRange(0, text.length);
    document.execCommand("copy"); ta.remove();
  };
  async function copy(text) {
    try {
      if (!navigator.clipboard) throw 0;
      await Promise.race([navigator.clipboard.writeText(text), new Promise((_, rej) => setTimeout(rej, 800))]);
    } catch { fallbackCopy(text); }
  }

  /* ---------- Home: category filters ---------- */
  const filters = $("#filters");
  if (filters) {
    filters.addEventListener("click", e => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      $$(".chip", filters).forEach(c => { c.classList.toggle("is-active", c === chip); c.setAttribute("aria-selected", c === chip); });
      const cat = chip.dataset.cat;
      $$("#promptGrid .card").forEach(card => {
        card.hidden = cat !== "all" && (card.dataset.cat || "") !== cat;
      });
    });
  }

  /* ---------- Instagram reel: load Instagram's embed script only when the reel is near the screen ---------- */
  const reel = $("[data-reel]");
  if (reel) {
    const load = () => {
      if (window.instgrm) return window.instgrm.Embeds.process();
      const s = document.createElement("script");
      s.src = "https://www.instagram.com/embed.js";
      s.async = true;
      s.onload = () => window.instgrm && window.instgrm.Embeds.process();
      document.body.append(s);
    };
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(entries => {
        if (entries.some(e => e.isIntersecting)) { io.disconnect(); load(); }
      }, { rootMargin: "600px" });
      io.observe(reel);
    } else load();
  }

  /* ---------- Prompt page ---------- */
  const promptEl = $("#promptText");
  if (!promptEl) return;

  // Customizer
  const data = JSON.parse($("#promptData").textContent);
  const builder = $("#builder");
  const readValues = () => {
    const v = {};
    data.fields.forEach(f => {
      if (f.type === "list") v[f.key] = $$(`input[data-key="${f.key}"]:checked`, builder).map(i => +i.value);
      else v[f.key] = ($(`[data-key="${f.key}"]`, builder) || {}).value || "";
    });
    return v;
  };
  const update = () => {
    promptEl.textContent = window.PromptTemplate.render(data.template, data.fields, readValues());
    promptEl.classList.remove("flash"); void promptEl.offsetWidth; promptEl.classList.add("flash");
  };
  if (builder && data.fields.length && window.PromptTemplate) {
    builder.addEventListener("input", update);
    builder.addEventListener("change", e => {
      // keep at least one item ticked in a list
      const box = e.target;
      if (box.type === "checkbox" && !$$(`input[data-key="${box.dataset.key}"]:checked`, builder).length) {
        box.checked = true;
        showToast("Keep at least one scene");
        update();
      }
    });
    $(".js-reset", builder).addEventListener("click", () => {
      data.fields.forEach(f => {
        if (f.type === "list") $$(`input[data-key="${f.key}"]`, builder).forEach(i => (i.checked = true));
        else $(`[data-key="${f.key}"]`, builder).value = f.default || "";
      });
      update();
    });
  }

  // Copy / share / lightbox
  const lb = $("#lightbox"), lbImg = $("img", lb);
  const openLightbox = (src, alt) => { lbImg.src = src; lbImg.alt = alt; lb.hidden = false; document.body.style.overflow = "hidden"; };
  const closeLightbox = () => { lb.hidden = true; document.body.style.overflow = ""; };
  lb.addEventListener("click", e => { if (e.target !== lbImg) closeLightbox(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !lb.hidden) closeLightbox(); });

  document.addEventListener("click", async e => {
    const copyBtn = e.target.closest(".js-copy");
    if (copyBtn) {
      await copy(promptEl.textContent);
      const old = copyBtn.textContent;
      copyBtn.textContent = "Copied ✓";
      setTimeout(() => (copyBtn.textContent = old), 1600);
      showToast("Prompt copied");
      return;
    }
    if (e.target.closest(".js-share")) {
      const url = location.origin + location.pathname;
      if (navigator.share) { try { await navigator.share({ title: document.title, url }); } catch {} }
      else { await copy(url); showToast("Link copied"); }
      return;
    }
    const shot = e.target.closest(".shot-btn");
    if (shot) openLightbox(shot.dataset.src, $("img", shot).alt);
  });
})();
