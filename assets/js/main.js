/*===== MENU SHOW + HIDE (Mobile Friendly) =====*/
const toggleMenu = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

if (toggleMenu && navMenu) {
  toggleMenu.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });
}

/*===== CLOSE MENU ON LINK CLICK (Mobile UX fix) =====*/
const navLinks = document.querySelectorAll(".nav__link");

navLinks.forEach(link =>
  link.addEventListener("click", () => {
    navMenu.classList.remove("show");
  })
);

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollY = window.scrollY;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 60; // smoother offset on mobile
    const sectionId = current.getAttribute("id");
    const navItem = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navItem?.classList.add("active-link");
    } else {
      navItem?.classList.remove("active-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);

/*===== SCROLL REVEAL ANIMATION ====*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  delay: 200,
});

/*===== SKILLS BAR ANIMATION + COUNT-UP % =====*/
(function animateSkillsOnScroll() {
  const rows = document.querySelectorAll('.skills__data');
  if (!rows.length) return;

  const barFillDurationMs = 1200; 
  const countDurationMs   = 900;   

  function countUpPercent(span, target, duration) {
    if (!span || span.dataset.counted === 'true') return;

    span.dataset.counted = 'true';
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      span.textContent = Math.round(target * eased) + "%";
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if (!('IntersectionObserver' in window)) {
    rows.forEach(row => {
      row.classList.add('is-visible');
      const span = row.querySelector('.skills__percentage');
      const target = parseInt(span.textContent, 10) || 0;
      span.textContent = '0%';
      setTimeout(() => countUpPercent(span, target, countDurationMs), barFillDurationMs);
    });
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const row = entry.target;
      row.classList.add('is-visible');
      
      const span = row.querySelector('.skills__percentage');
      const target = parseInt(span.textContent, 10) || 0;
      span.textContent = '0%';

      setTimeout(() => countUpPercent(span, target, countDurationMs), barFillDurationMs);
      observer.unobserve(row);
    });
  }, { threshold: 0.35 });

  rows.forEach(row => observer.observe(row));
})();

/*===== COURSE CARDS FLIP =====*/
document.querySelectorAll(".course-card").forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("is-flipped");
  });
});
function openVideo() {
  document.getElementById("videoModal").style.display = "flex";
  document.getElementById("driveVideo").src =
    "https://drive.google.com/file/d/1W-oRQuqkpvYnmtdvbEOkGtkkrkxFHglG/preview";
}

function closeVideo() {
  document.getElementById("videoModal").style.display = "none";
  document.getElementById("driveVideo").src = "";
}
