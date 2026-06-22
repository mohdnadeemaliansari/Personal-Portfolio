const navToggle = document.getElementById("navToggle");
const mobileMenu = document.getElementById("mobileMenu");
navToggle.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open);
});
mobileMenu.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }),
);

document
  .getElementById("printBtn")
  .addEventListener("click", () => window.print());

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const reveals = document.querySelectorAll(".reveal");
if (reduceMotion) {
  reveals.forEach((el) => el.classList.add("in-view"));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  reveals.forEach((el) => io.observe(el));
}
