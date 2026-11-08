
/* =========================================
   MAIN JAVASCRIPT
   SIGNAL IN THE NOISE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  // 1. PRELOADER
  const preloader = document.getElementById("preloader");
  const progress = document.querySelector(".loader-progress");
  const number = document.querySelector(".loader-number");

  let loading = 0;

  const loadingInterval = setInterval(() => {
    loading += Math.floor(Math.random() * 12) + 5;

    if (loading >= 100) {
      loading = 100;
      clearInterval(loadingInterval);

      setTimeout(() => {
        preloader.classList.add("loader-hidden");
      }, 400);
    }

    progress.style.width = `${loading}%`;
    number.textContent = `${String(loading).padStart(2, "0")}%`;

  }, 100);


  // 2. MOBILE NAVIGATION
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");

      const icon = menuToggle.querySelector("i");

      if (icon) {
        icon.setAttribute(
          "data-lucide",
          navLinks.classList.contains("active") ? "x" : "menu"
        );

        if (window.lucide) {
          lucide.createIcons();
        }
      }
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        if (icon) {
          icon.setAttribute("data-lucide", "menu");

          if (window.lucide) {
            lucide.createIcons();
          }
        }
      });
    });
  }


  // 3. SCROLL PROGRESS INDICATOR
  const scrollBar = document.createElement("div");

  scrollBar.className = "scroll-progress";
  document.body.appendChild(scrollBar);

  window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const pageHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const scrollPercentage =
      pageHeight > 0 ? (scrollTop / pageHeight) * 100 : 0;

    scrollBar.style.width = `${scrollPercentage}%`;

  });


  // 4. SCROLL REVEAL ANIMATIONS
  const revealElements = document.querySelectorAll(
    ".content-section, .project-card, .skill-group, .timeline-item, .certification-item"
  );

  revealElements.forEach(element => {
    element.classList.add("reveal");
  });

  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }

    });

  }, {
    threshold: 0.12
  });

  revealElements.forEach(element => {
    observer.observe(element);
  });


  // 5. CURRENT YEAR IN FOOTER
  const footerYear = document.querySelector(".footer span");

  if (footerYear) {
    footerYear.textContent =
      `© ${new Date().getFullYear()} ANUJ KUMAR DUBEY`;
  }


  // 6. LUCIDE ICONS
  if (window.lucide) {
    lucide.createIcons();
  }


  // 7. CONSOLE MESSAGE
  console.log(
    "%c SIGNAL IN THE NOISE ",
    "background:#7ce7ff;color:#080b16;padding:10px;font-weight:bold;"
  );

  console.log("Portfolio initialized successfully.");

});
