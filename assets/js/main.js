/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

// Animate Skills bars when they enter the viewport + percentage count-up
(function animateSkillsOnScroll() {
  const rows = document.querySelectorAll('.skills__data');
  if (!rows.length) return;

  const barFillDurationMs = 1200;  // must match your CSS width transition (1.2s)
  const countDurationMs   = 900;   // how long the number counts up

  function countUpPercent(span, target, duration) {
    if (!span) return;
    // Prevent re-running
    if (span.dataset.counted === 'true') return;
    span.dataset.counted = 'true';

    const start = performance.now();
    const startVal = 0;

    function tick(now) {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 1);
      // ease-out
      const eased = 1 - Math.pow(1 - p, 3);
      const value = Math.round(startVal + (target - startVal) * eased);
      span.textContent = value + '%';
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // Fallback if IntersectionObserver isn't supported
  if (!('IntersectionObserver' in window)) {
    rows.forEach(r => {
      r.classList.add('is-visible');
      const span = r.querySelector('.skills__percentage');
      if (span) {
        const target = parseInt(span.textContent, 10) || 0;
        span.textContent = '0%';
        setTimeout(() => countUpPercent(span, target, countDurationMs), barFillDurationMs);
      }
    });
    return;
  }

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const row = entry.target;
      row.classList.add('is-visible');

      // After the bar fill finishes, start counting up the %.
      const span = row.querySelector('.skills__percentage');
      if (span) {
        const target = parseInt(span.textContent, 10) || 0;
        span.textContent = '0%';
        setTimeout(() => countUpPercent(span, target, countDurationMs), barFillDurationMs);
      }

      obs.unobserve(row); // animate once
    });
  }, { threshold: 0.35 });

  rows.forEach(r => io.observe(r));
})();

// Flip cards on click (toggle)
document.querySelectorAll('.course-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('is-flipped');
  });
});
