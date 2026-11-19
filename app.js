const SITE_CONFIG = {
  brand: "anfim.io",
  name: "Anfim",
  avatarUrl: "./avatar.jpeg",
  telegramHandle: "@real_chert",
  githubUser: "kernelhistory",

  socials: [
    {
      title: "Telegram",
      handle: "@real_chert",
      url: "https://t.me/real_chert",
      icon: "send",
      primary: true
    },
    {
      title: "GitHub",
      handle: "@kernelhistory",
      url: "https://github.com/kernelhistory",
      icon: "code",
      primary: false
    }
  ],

  projects: [
    {
      title: "SpiderPulse",
      badge: "Featured · Android & Security",
      language: "Kotlin",
      status: "Open Source",
      description:
        "Модульный Local-First OSINT-агрегатор и криминалистический анализатор для Android. Построен с упором на автономную работу, криптографическую защиту данных AES-256-GCM и нативный интерфейс в стиле Material Design 3.",
      highlights: [
        "Локальное шифрованное хранилище на базе <strong>AES-256-GCM</strong>",
        "Модульная архитектура сбора и корреляции OSINT / Forensic-данных",
        "Современный тёмный интерфейс по гайдлайнам <strong>Google Material 3</strong>"
      ],
      tags: [
        "Kotlin",
        "Android SDK",
        "AES-256-GCM",
        "Material Design 3",
        "OSINT & Forensics",
        "Local-First"
      ],
      repoUrl: "https://github.com/kernelhistory/SpiderPulse",
      releasesUrl: "https://github.com/kernelhistory/SpiderPulse/releases",
      githubRepo: "kernelhistory/SpiderPulse",
      featured: true
    }
  ]
};

function renderSocials() {
  const container = document.getElementById("socials-container");
  if (!container) return;

  container.innerHTML = SITE_CONFIG.socials
    .map(
      (item) => `
      <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="social-tile ${
        item.primary ? "primary-tile" : ""
      }">
        <div class="social-left">
          <div class="social-icon-box">
            <span class="material-symbols-rounded">${item.icon}</span>
          </div>
          <div class="social-info">
            <h4>${item.title}</h4>
            <span>${item.handle}</span>
          </div>
        </div>
        <span class="material-symbols-rounded">arrow_outward</span>
      </a>
    `
    )
    .join("");
}

function renderProjects() {
  const container = document.getElementById("projects-container");
  if (!container) return;

  const cardsHtml = SITE_CONFIG.projects
    .map((p) => {
      const highlightsHtml = (p.highlights || [])
        .map(
          (h) => `
          <li>
            <span class="material-symbols-rounded">check_circle</span>
            <span>${h}</span>
          </li>`
        )
        .join("");

      const tagsHtml = (p.tags || [])
        .map((t) => `<span class="md-chip">${t}</span>`)
        .join("");

      return `
        <article class="md-card project-card-featured">
          <div>
            <div class="project-badge-row">
              <span class="project-badge">
                <span class="material-symbols-rounded" style="font-size:15px">verified</span>
                ${p.badge}
              </span>
              <span class="project-meta-pill">${p.language}</span>
              <span class="project-meta-pill" data-repo-status="${p.githubRepo || ""}">${p.status}</span>
            </div>

            <h3 class="project-title">${p.title}</h3>
            <p class="project-desc">${p.description}</p>

            ${highlightsHtml ? `<ul class="project-highlights">${highlightsHtml}</ul>` : ""}

            <div class="chips-wrap">${tagsHtml}</div>

            <div class="project-actions">
              <a href="${p.repoUrl}" target="_blank" rel="noopener noreferrer" class="md-btn md-btn-filled">
                <span class="material-symbols-rounded">open_in_new</span>
                <span>Открыть на GitHub</span>
              </a>
              ${
                p.releasesUrl
                  ? `<a href="${p.releasesUrl}" target="_blank" rel="noopener noreferrer" class="md-btn md-btn-tonal">
                      <span class="material-symbols-rounded">download</span>
                      <span>Релизы / APK</span>
                    </a>`
                  : ""
              }
            </div>
          </div>

          <div class="project-preview-panel" aria-hidden="true">
            <div class="terminal-top">
              <div class="terminal-dots">
                <span></span><span></span><span></span>
              </div>
              <span>${p.title} · ModuleEngine.kt</span>
            </div>
            <div class="code-lines">
              <div><span class="c">// Local-First Encrypted Forensic Vault</span></div>
              <div><span class="k">object</span> SpiderPulseVault {</div>
              <div>&nbsp;&nbsp;<span class="k">val</span> cipher = <span class="s">"AES/GCM/NoPadding"</span></div>
              <div>&nbsp;&nbsp;<span class="k">val</span> keySize = <span class="s">256</span></div>
              <div>&nbsp;&nbsp;<span class="k">val</span> uiTheme = <span class="s">"MaterialDesign3.DynamicDark"</span></div>
              <div>&nbsp;&nbsp;<span class="k">fun</span> verifyIntegrity(): Boolean = <span class="s">true</span></div>
              <div>}</div>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  const upcomingHtml = `
    <div class="md-card project-card-upcoming">
      <div>
        <h4>Новые релизы и инструменты в разработке</h4>
        <p>Следующие проекты скоро появятся здесь и в профиле GitHub.</p>
      </div>
      <a href="https://github.com/${SITE_CONFIG.githubUser}" target="_blank" rel="noopener noreferrer" class="md-btn md-btn-outlined md-btn-sm">
        <span class="material-symbols-rounded" style="font-size:18px">code</span>
        <span>Следить на GitHub</span>
      </a>
    </div>
  `;

  container.innerHTML = cardsHtml + upcomingHtml;
}

function initThemeSwitcher() {
  const savedTheme = localStorage.getItem("anfim_md3_theme") || "blue";
  document.documentElement.setAttribute("data-theme", savedTheme);

  const buttons = document.querySelectorAll("[data-set-theme]");
  buttons.forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-set-theme") === savedTheme);

    btn.addEventListener("click", () => {
      const theme = btn.getAttribute("data-set-theme");
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("anfim_md3_theme", theme);

      buttons.forEach((b) => b.classList.toggle("active", b === btn));
    });
  });
}

let snackbarTimer = null;
function showSnackbar(message) {
  const snackbar = document.getElementById("snackbar");
  const textEl = document.getElementById("snackbar-text");
  if (!snackbar || !textEl) return;

  textEl.textContent = message;
  snackbar.classList.add("show");

  clearTimeout(snackbarTimer);
  snackbarTimer = setTimeout(() => {
    snackbar.classList.remove("show");
  }, 2800);
}

function initCopyButton() {
  const btn = document.getElementById("copy-tg-btn");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(SITE_CONFIG.telegramHandle);
      showSnackbar(`Контакт ${SITE_CONFIG.telegramHandle} скопирован!`);
    } catch {
      showSnackbar(`Telegram: ${SITE_CONFIG.telegramHandle}`);
    }
  });
}

function initScrollSpy() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener(
    "scroll",
    () => {
      let currentId = "top";
      const scrollY = window.scrollY + 180;

      sections.forEach((sec) => {
        if (scrollY >= sec.offsetTop) {
          currentId = sec.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        const href = link.getAttribute("href").replace("#", "");
        link.classList.toggle("active", href === currentId);
      });
    },
    { passive: true }
  );
}

async function fetchGitHubStats() {
  try {
    const res = await fetch("https://api.github.com/repos/kernelhistory/SpiderPulse");
    if (!res.ok) return;
    const data = await res.json();

    const badgeEl = document.querySelector('[data-repo-status="kernelhistory/SpiderPulse"]');
    if (badgeEl && typeof data.stargazers_count === "number") {
      badgeEl.textContent =
        data.stargazers_count > 0
          ? `★ ${data.stargazers_count} · Open Source`
          : "Open Source · MD3";
    }
  } catch {}
}

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const avatarEl = document.getElementById("profile-avatar");
  if (avatarEl && SITE_CONFIG.avatarUrl) {
    avatarEl.src = SITE_CONFIG.avatarUrl;
  }

  renderProjects();
  renderSocials();
  initThemeSwitcher();
  initCopyButton();
  initScrollSpy();
  fetchGitHubStats();
});
