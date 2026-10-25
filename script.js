/* ==========================================
   DATA LOADER
   Populates static content from data.js
   ========================================== */
(function loadData() {
  const data = window.PORTFOLIO_DATA;
  if (!data) return;

  /* --- PROJECTS --- */
  const projectsContainer = document.querySelector(".projects");
  if (projectsContainer && Array.isArray(data.projects)) {
    if (data.projects.length === 0) {
      // Show empty state
      projectsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; border: 1px dashed var(--line); border-radius: 18px; background: var(--surface);">
          <p style="color: var(--ink-300); font-family: var(--font-serif); font-size: 1.2rem; margin-bottom: 8px;">No projects published yet.</p>
          <p style="color: var(--ink-400); font-size: 0.9rem;">Check back soon — I'm currently building my first one.</p>
        </div>
      `;
    } else {
      projectsContainer.innerHTML = data.projects.map((p, index) => {
        // Alternate layout: every second project reverses
        const isReverse = index % 2 !== 0;
        const reverseClass = isReverse ? "reverse" : "";
        const featuredClass = p.featured ? "featured" : "";
        
        // Handle the visual (chart)
        let visualContent = "";
        if (p.chart === "line") {
          visualContent = `
            <svg class="line-chart" viewBox="0 0 300 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGrad-${index}" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#059669"/>
                  <stop offset="100%" stop-color="#FBBF24"/>
                </linearGradient>
                <linearGradient id="fillGrad-${index}" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#10B981" stop-opacity="0.35"/>
                  <stop offset="100%" stop-color="#FBBF24" stop-opacity="0"/>
                </linearGradient>
              </defs>
              <path d="M0,90 L60,80 L120,55 L180,65 L240,30 L300,20 L300,120 L0,120 Z" fill="url(#fillGrad-${index})"/>
              <path d="M0,90 L60,80 L120,55 L180,65 L240,30 L300,20" fill="none" stroke="url(#lineGrad-${index})" stroke-width="2.5" stroke-linecap="round"/>
              <circle cx="300" cy="20" r="4" fill="#FBBF24"/>
            </svg>
          `;
        } else if (p.chart !== "none") {
          // Default to bar chart
          visualContent = `
            <div class="mini-chart">
              <div class="bar" style="--h: 55%"></div>
              <div class="bar" style="--h: 75%"></div>
              <div class="bar" style="--h: 40%"></div>
              <div class="bar" style="--h: 90%"></div>
              <div class="bar accent" style="--h: 100%"></div>
              <div class="bar" style="--h: 65%"></div>
              <div class="bar" style="--h: 80%"></div>
            </div>
          `;
        }

        // Handle tags
        const tagsHtml = (p.tags || []).map(t => `<span>${t}</span>`).join("");

        return `
          <article class="project ${featuredClass} ${reverseClass}" data-reveal>
            <div class="project-info">
              <div class="project-tag-row">
                ${p.featured ? '<span class="project-badge">Featured</span>' : ''}
                <span class="project-year">${p.year || '2025'}</span>
              </div>
              <h3 class="project-title">${p.title}</h3>
              <p class="project-desc">${p.description}</p>
              <div class="project-tags">
                ${tagsHtml}
              </div>
              ${p.url ? `
              <a href="${p.url}" target="_blank" rel="noopener" class="project-link">
                View on GitHub
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </a>
              ` : ''}
            </div>
            <div class="project-visual project-visual-${(index % 3) + 1}">
              ${visualContent}
            </div>
          </article>
        `;
      }).join("");
    }
  }

  /* --- NOTES --- */
  const notesGrid = document.querySelector(".notes-grid");
  if (notesGrid && Array.isArray(data.notes)) {
    notesGrid.innerHTML = data.notes
      .map((n) => {
        const linkHtml = n.url
          ? `<a href="${n.url}" class="note-link">
               Read note
               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
             </a>`
          : `<span class="note-link note-link-disabled">Coming soon</span>`;
        const dateText = n.read ? `${n.date} · ${n.read}` : n.date;
        return `
      <article class="note-card" data-reveal>
        <span class="note-date">${dateText}</span>
        <h3 class="note-title">${n.title}</h3>
        <p class="note-excerpt">${n.excerpt}</p>
        ${linkHtml}
      </article>`;
      })
      .join("");
  }

  /* --- CURRENTLY PILLS (only overwrite the first one) --- */
  if (data.currently && data.currently.text) {
    const firstNow = document.querySelector(".hero-now-stack .hero-now:first-child");
    if (firstNow) {
      const label = firstNow.querySelector(".hero-now-label");
      const value = firstNow.querySelector(".hero-now-value");
      if (label) label.textContent = data.currently.label;
      if (value) value.textContent = data.currently.text;
    }
  }

  /* --- LINKS --- */
  if (data.personal) {
    document
      .querySelectorAll('a[href^="mailto:"]')
      .forEach((a) => (a.href = `mailto:${data.personal.email}`));

    document
      .querySelectorAll(".contact-value-email, .contact-quick-text")
      .forEach((el) => {
        el.textContent = data.personal.email;
      });

    const copyBtn = document.getElementById("copyEmail");
    if (copyBtn) copyBtn.dataset.email = data.personal.email;

    document.querySelectorAll(".contact-item").forEach((item) => {
      const label = item.querySelector(".contact-label");
      const value = item.querySelector(".contact-value");
      if (!label || !value) return;

      const name = label.textContent.trim().toLowerCase();

      if (name === "github" && data.personal.github) {
        item.href = data.personal.github;
        const handle = data.personal.github
          .replace(/^https?:\/\/(www\.)?github\.com\//, "")
          .replace(/\/$/, "");
        value.textContent = "@" + handle;
      }

      if (name === "linkedin" && data.personal.linkedin) {
        item.href = data.personal.linkedin;
        const path = data.personal.linkedin
          .replace(/^https?:\/\/(www\.)?linkedin\.com/, "")
          .replace(/\/$/, "");
        value.textContent = path;
      }
    });

    document
      .querySelectorAll('a[href*="github.com"]')
      .forEach((a) => {
        if (data.personal.github) a.href = data.personal.github;
      });
    document
      .querySelectorAll('a[href*="linkedin.com"]')
      .forEach((a) => {
        if (data.personal.linkedin) a.href = data.personal.linkedin;
      });
  }

  /* --- AVAILABILITY --- */
  if (data.availability) {
    const footerStatus = document.querySelector(".footer-status");
    if (footerStatus && data.availability.footerText) {
      footerStatus.innerHTML = `<span class="status-dot"></span> ${data.availability.footerText}`;
    }
    const aboutStatus = document.querySelector(".status-open");
    if (aboutStatus && data.availability.text) {
      aboutStatus.innerHTML = `<span class="status-dot"></span> ${data.availability.text}`;
    }
  }
})();

/* ==========================================
   LOCAL TIME (Nairobi · EAT)
   ========================================== */
(function localTime() {
  const el = document.getElementById("localTime");
  if (!el) return;
  function update() {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const eat = new Date(utc + 3 * 3600000);
    const hh = String(eat.getHours()).padStart(2, "0");
    const mm = String(eat.getMinutes()).padStart(2, "0");
    el.textContent = `${hh}:${mm}`;
  }
  update();
  setInterval(update, 30000);
})();

/* ==========================================
   CUSTOM CURSOR — desktop only
   ========================================== */
(function cursor() {
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  if (isTouch) return;

  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  });

  (function loop() {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      ring.classList.add("hover");
      dot.classList.add("hover");
    });
    el.addEventListener("mouseleave", () => {
      ring.classList.remove("hover");
      dot.classList.remove("hover");
    });
  });

  document.addEventListener("mouseleave", () => {
    dot.style.opacity = "0";
    ring.style.opacity = "0";
  });
  document.addEventListener("mouseenter", () => {
    dot.style.opacity = "1";
    ring.style.opacity = "1";
  });
})();

/* ==========================================
   HEADER + BACK TO TOP
   ========================================== */
(function headerState() {
  const header = document.getElementById("header");
  const backTop = document.getElementById("backTop");
  if (!header) return;

  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 30);
    if (backTop) backTop.classList.toggle("visible", y > 600);
  }, { passive: true });
})();

/* ==========================================
   SCROLL PROGRESS
   ========================================== */
(function progress() {
  const bar = document.getElementById("scrollProgress");
  if (!bar) return;
  window.addEventListener("scroll", () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (window.scrollY / h) * 100 + "%";
  }, { passive: true });
})();

/* ==========================================
   REVEAL
   ========================================== */
(function reveal() {
  const items = document.querySelectorAll("[data-reveal]");
  if (!items.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  items.forEach((el) => obs.observe(el));
})();

/* ==========================================
   ACTIVE NAV + SECTION DOTS
   ========================================== */
(function activeNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const dotLinks = document.querySelectorAll(".section-dots a");
  if (!sections.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute("id");
      navLinks.forEach((l) => l.classList.toggle("active", l.dataset.section === id));
      dotLinks.forEach((d) => d.classList.toggle("active", d.dataset.dot === id));
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  sections.forEach((s) => obs.observe(s));
})();

/* ==========================================
   MOBILE MENU
   ========================================== */
(function mobileMenu() {
  const btn = document.getElementById("menuBtn");
  const menu = document.getElementById("mobileMenu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    btn.classList.toggle("open");
    menu.classList.toggle("open");
    document.body.style.overflow = menu.classList.contains("open") ? "hidden" : "";
  });

  menu.querySelectorAll(".mobile-link").forEach((link) => {
    link.addEventListener("click", () => {
      btn.classList.remove("open");
      menu.classList.remove("open");
      document.body.style.overflow = "";
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("open")) {
      btn.classList.remove("open");
      menu.classList.remove("open");
      document.body.style.overflow = "";
    }
  });
})();

/* ==========================================
   SMOOTH SCROLL
   ========================================== */
(function smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id === "#" || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
})();

/* ==========================================
   BACK TO TOP
   ========================================== */
(function backTop() {
  const btn = document.getElementById("backTop");
  if (!btn) return;
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();

/* ==========================================
   FAQ
   ========================================== */
(function faq() {
  const triggers = document.querySelectorAll(".faq-trigger");
  if (!triggers.length) return;

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const item = trigger.closest(".faq-item");
      const panel = item.querySelector(".faq-panel");
      const isOpen = item.classList.contains("open");

      document.querySelectorAll(".faq-item").forEach((other) => {
        other.classList.remove("open");
        other.querySelector(".faq-panel").style.maxHeight = "0px";
        other.querySelector(".faq-trigger").setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });
})();

/* ==========================================
   HERO PARALLAX — desktop only
   ========================================== */
(function heroParallax() {
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  if (isTouch) return;

  const blobs = document.querySelectorAll(".ambient-blob");
  if (!blobs.length) return;
  window.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    blobs.forEach((blob, i) => {
      const s = (i + 1) * 10;
      blob.style.transform = `translate(${x * s}px, ${y * s}px)`;
    });
  }, { passive: true });
})();

/* ==========================================
   TOAST
   ========================================== */
function showToast(message, icon = "✓") {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.innerHTML = `<span class="toast-check">${icon}</span> ${message}`;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 2400);
}
window.showToast = showToast;

/* ==========================================
   COPY EMAIL
   ========================================== */
(function copyEmail() {
  const btn = document.getElementById("copyEmail");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    const email = btn.dataset.email;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const ta = document.createElement("textarea");
        ta.value = email;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      btn.classList.add("copied");
      btn.querySelector("span").textContent = "Copied!";
      showToast("Email copied to clipboard");
      setTimeout(() => {
        btn.classList.remove("copied");
        btn.querySelector("span").textContent = "Copy email";
      }, 2000);
    } catch {
      showToast("Couldn't copy — please copy manually", "!");
    }
  });
})();

/* ==========================================
   COMMAND PALETTE
   ========================================== */
(function cmdk() {
  const modal = document.getElementById("cmdk");
  const openBtn = document.getElementById("cmdkBtn");
  const input = document.getElementById("cmdkInput");
  const list = document.getElementById("cmdkList");
  const empty = document.getElementById("cmdkEmpty");
  if (!modal || !list) return;

  const items = Array.from(list.querySelectorAll("[data-cmdk-item]"));
  let activeIndex = 0;
  let filteredItems = items.slice();

  function open() {
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    setTimeout(() => input.focus(), 40);
    activeIndex = 0;
    filter("");
  }
  function close() {
    modal.hidden = true;
    document.body.style.overflow = "";
    input.value = "";
  }

  function setActive(i) {
    filteredItems.forEach((el) => el.classList.remove("active"));
    if (filteredItems.length === 0) return;
    activeIndex = (i + filteredItems.length) % filteredItems.length;
    filteredItems[activeIndex].classList.add("active");
    filteredItems[activeIndex].scrollIntoView({ block: "nearest" });
  }

  function filter(query) {
    const q = query.trim().toLowerCase();
    filteredItems = items.filter((el) => {
      const text = el.textContent.toLowerCase();
      const match = text.includes(q);
      el.style.display = match ? "" : "none";
      return match;
    });
    if (filteredItems.length === 0) {
      empty.hidden = false;
      list.style.display = "none";
    } else {
      empty.hidden = true;
      list.style.display = "";
      setActive(0);
    }
  }

  openBtn?.addEventListener("click", open);
  input?.addEventListener("input", (e) => filter(e.target.value));

  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      modal.hidden ? open() : close();
      return;
    }
    if (modal.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowDown") { e.preventDefault(); setActive(activeIndex + 1); }
    if (e.key === "ArrowUp") { e.preventDefault(); setActive(activeIndex - 1); }
    if (e.key === "Enter" && filteredItems[activeIndex]) {
      e.preventDefault();
      filteredItems[activeIndex].click();
      close();
    }
  });

  modal.querySelectorAll("[data-cmdk-close]").forEach((el) => {
    el.addEventListener("click", close);
  });

  list.querySelectorAll("[data-cmdk-item]").forEach((el) => {
    el.addEventListener("click", () => close());
  });
})();

/* ==========================================
   KEYBOARD SHORTCUTS
   ========================================== */
(function keyboardShortcuts() {
  const order = ["top", "work", "services", "about", "notes", "faq", "contact"];
  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const n = parseInt(e.key, 10);
    if (n >= 1 && n <= 7) {
      const id = order[n - 1];
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
})();