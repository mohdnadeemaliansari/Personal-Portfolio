(() => {
  const root = document.documentElement;
  const body = document.body;
  const header = document.querySelector(".site-header");

  /* ---------- Theme toggle ---------- */
  const themeToggle = document.getElementById("themeToggle");

  function syncThemeLabel() {
    const dark = root.dataset.theme === "dark";
    themeToggle.setAttribute(
      "aria-label",
      dark ? "Switch to light theme" : "Switch to dark theme",
    );
  }

  themeToggle.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch (e) {
      /* storage unavailable — theme still applies for this visit */
    }
    syncThemeLabel();
  });
  syncThemeLabel();

  /* ---------- Mobile menu ---------- */
  const navToggle = document.getElementById("navToggle");
  const mobilePanel = document.getElementById("mobilePanel");

  function setMenu(open) {
    mobilePanel.classList.toggle("open", open);
    body.classList.toggle("menu-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  navToggle.addEventListener("click", () =>
    setMenu(!mobilePanel.classList.contains("open")),
  );

  mobilePanel
    .querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", () => setMenu(false)));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobilePanel.classList.contains("open")) {
      setMenu(false);
      navToggle.focus();
    }
  });

  window
    .matchMedia("(min-width: 1001px)")
    .addEventListener("change", (e) => e.matches && setMenu(false));

  /* ---------- Save as PDF (print) ---------- */
  ["printBtn", "printBtnMobile"].forEach((id) => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener("click", () => {
      setMenu(false);
      window.print();
    });
  });

  /* ---------- Header border on scroll ---------- */
  const onScroll = () =>
    header.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Project filter ---------- */
  const filters = document.querySelectorAll(".filter");
  const cards = document.querySelectorAll(".project");

  filters.forEach((btn) =>
    btn.addEventListener("click", () => {
      const type = btn.dataset.filter;
      filters.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      cards.forEach((card) => {
        const match = type === "all" || card.dataset.category === type;
        card.hidden = !match;
        card.classList.remove("show");
        if (match) {
          void card.offsetWidth; /* restart the fade-in */
          card.classList.add("show");
        }
      });
    }),
  );

  /* ---------- Photo fallback (shows initials if image.jpg is missing) ---------- */
  const photo = document.querySelector(".snap-photo img");
  if (photo) {
    const drop = () => photo.remove();
    photo.addEventListener("error", drop);
    if (photo.complete && photo.naturalWidth === 0) drop();
  }

  /* ---------- Footer year ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
