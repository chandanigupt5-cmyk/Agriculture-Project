/* =====================================================
   AGRIVISION - JAVASCRIPT
   Agriculture Management Project
   ===================================================== */


/* =====================================================
   1. DOM READY
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  initMobileMenu();

  initDarkMode();

  initActiveNavigation();

  initRevealAnimation();

  initCounters();

  initCropSearch();

  initCropFilters();

  initYieldCalculator();

  initContactForm();

  initCurrentYear();

});


/* =====================================================
   2. MOBILE MENU
   ===================================================== */

function initMobileMenu() {

  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  if (!menuBtn || !navLinks) {
    return;
  }

  menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuBtn.textContent = isOpen ? "✕" : "☰";

  });


  // Close menu after clicking a navigation link

  navLinks.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      navLinks.classList.remove("active");

      menuBtn.textContent = "☰";

    });

  });

}


/* =====================================================
   3. DARK MODE
   ===================================================== */

function initDarkMode() {

  const themeBtn = document.getElementById("themeBtn");

  if (!themeBtn) {
    return;
  }


  // Check previously saved theme

  const savedTheme = localStorage.getItem("agrivision-theme");

  if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeBtn.textContent = "☀️";

  } else {

    themeBtn.textContent = "🌙";

  }


  themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const darkMode =
      document.body.classList.contains("dark");


    if (darkMode) {

      themeBtn.textContent = "☀️";

      localStorage.setItem(
        "agrivision-theme",
        "dark"
      );

    } else {

      themeBtn.textContent = "🌙";

      localStorage.setItem(
        "agrivision-theme",
        "light"
      );

    }

  });

}


/* =====================================================
   4. ACTIVE NAVIGATION
   ===================================================== */

function initActiveNavigation() {

  const currentPage =
    window.location.pathname.split("/").pop() ||
    "index.html";

  const navLinks =
    document.querySelectorAll(".nav-links a");


  navLinks.forEach(link => {

    const linkPage =
      link.getAttribute("href").split("/").pop();


    if (linkPage === currentPage) {

      link.classList.add("active");

    }

  });

}


/* =====================================================
   5. SCROLL REVEAL ANIMATION
   ===================================================== */

function initRevealAnimation() {

  const elements =
    document.querySelectorAll(
      ".info-card, .technology-card, .objective, .crop-card, .dashboard-card"
    );


  if (!elements.length) {
    return;
  }


  elements.forEach(element => {

    element.classList.add("reveal");

  });


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  elements.forEach(element => {

    observer.observe(element);

  });

}


/* =====================================================
   6. ANIMATED COUNTERS
   ===================================================== */

function initCounters() {

  const counters =
    document.querySelectorAll("[data-target]");


  if (!counters.length) {
    return;
  }


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) {
            return;
          }


          const counter = entry.target;

          const target =
            Number(counter.dataset.target);


          let current = 0;

          const duration = 1200;

          const startTime =
            performance.now();


          function updateCounter(currentTime) {

            const elapsed =
              currentTime - startTime;


            const progress =
              Math.min(elapsed / duration, 1);


            // Smooth easing

            const eased =
              1 - Math.pow(1 - progress, 3);


            current =
              Math.floor(target * eased);


            counter.textContent = current;


            if (progress < 1) {

              requestAnimationFrame(updateCounter);

            } else {

              counter.textContent = target;

            }

          }


          requestAnimationFrame(updateCounter);

          observer.unobserve(counter);

        });

      },
      {
        threshold: 0.5
      }
    );


  counters.forEach(counter => {

    observer.observe(counter);

  });

}


/* =====================================================
   7. CROP SEARCH
   ===================================================== */

function initCropSearch() {

  const search =
    document.getElementById("cropSearch") ||
    document.getElementById("cropSearchInput");


  const cards =
    document.querySelectorAll(".crop-card");


  if (!search || !cards.length) {
    return;
  }


  search.addEventListener("input", () => {

    const query =
      search.value.trim().toLowerCase();


    cards.forEach(card => {

      const searchableText =
        (
          card.dataset.name ||
          card.textContent
        ).toLowerCase();


      const matches =
        searchableText.includes(query);


      card.style.display =
        matches ? "" : "none";

    });

  });

}


/* =====================================================
   8. CROP CATEGORY FILTER
   ===================================================== */

function initCropFilters() {

  const filterButtons =
    document.querySelectorAll(".filter-btn");

  const cards =
    document.querySelectorAll(".crop-card");


  if (!filterButtons.length || !cards.length) {
    return;
  }


  filterButtons.forEach(button => {

    button.addEventListener("click", () => {

      filterButtons.forEach(btn => {

        btn.classList.remove("active");

      });


      button.classList.add("active");


      const category =
        button.dataset.filter;


      cards.forEach(card => {

        const cardCategory =
          card.dataset.category;


        if (
          category === "all" ||
          !category
        ) {

          card.style.display = "";

          return;

        }


        card.style.display =
          cardCategory === category
            ? ""
            : "none";

      });

    });

  });

}


/* =====================================================
   9. CROP YIELD CALCULATOR
   ===================================================== */

function initYieldCalculator() {

  const calculateBtn =
    document.getElementById("calculateBtn");


  const areaInput =
    document.getElementById("area");


  const cropSelect =
    document.getElementById("cropType");


  const result =
    document.getElementById("result") ||
    document.getElementById("yieldResult");


  if (
    !calculateBtn ||
    !areaInput ||
    !cropSelect ||
    !result
  ) {
    return;
  }


  calculateBtn.addEventListener(
    "click",
    calculateYield
  );


  function calculateYield() {

    const area =
      parseFloat(areaInput.value);


    const yieldPerHectare =
      parseFloat(cropSelect.value);


    if (
      Number.isNaN(area) ||
      area <= 0
    ) {

      showCalculatorResult(
        result,
        "Please enter a valid farm area."
      );

      return;

    }


    if (
      Number.isNaN(yieldPerHectare) ||
      yieldPerHectare <= 0
    ) {

      showCalculatorResult(
        result,
        "Please select a valid crop."
      );

      return;

    }


    const estimatedYield =
      area * yieldPerHectare;


    result.classList.add("show");


    result.innerHTML = `
      <span>Estimated Production</span>

      <span class="result-number">
        ${estimatedYield.toFixed(2)} tonnes
      </span>

      <small>
        This is an educational estimate and may vary
        according to crop, soil, weather, and farm conditions.
      </small>
    `;

  }

}


/* =====================================================
   10. CALCULATOR RESULT HELPER
   ===================================================== */

function showCalculatorResult(
  result,
  message
) {

  result.classList.add("show");

  result.innerHTML = `
    <strong>⚠️</strong>
    <p>${message}</p>
  `;

}


/* =====================================================
   11. CONTACT FORM
   ===================================================== */

function initContactForm() {

  const form =
    document.getElementById("contactForm");


  if (!form) {
    return;
  }


  form.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const nameInput =
        document.getElementById("name");


      const emailInput =
        document.getElementById("email");


      const messageInput =
        document.getElementById("message");


      const name =
        nameInput
          ? nameInput.value.trim()
          : "";


      const email =
        emailInput
          ? emailInput.value.trim()
          : "";


      const message =
        messageInput
          ? messageInput.value.trim()
          : "";


      if (!name || !email || !message) {

        showNotification(
          "Please fill in all fields."
        );

        return;

      }


      if (!validateEmail(email)) {

        showNotification(
          "Please enter a valid email address."
        );

        return;

      }


      showNotification(
        `Thank you, ${name}! Your message has been submitted.`
      );


      form.reset();

    }
  );

}


/* =====================================================
   12. EMAIL VALIDATION
   ===================================================== */

function validateEmail(email) {

  const pattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  return pattern.test(email);

}


/* =====================================================
   13. NOTIFICATION
   ===================================================== */

function showNotification(message) {

  const oldAlert =
    document.querySelector(".custom-alert");


  if (oldAlert) {
    oldAlert.remove();
  }


  const alert =
    document.createElement("div");


  alert.className =
    "custom-alert";


  alert.textContent =
    message;


  document.body.appendChild(alert);


  setTimeout(() => {

    alert.style.opacity = "0";

    alert.style.transform =
      "translateX(30px)";


    setTimeout(() => {

      alert.remove();

    }, 300);

  }, 3000);

}


/* =====================================================
   14. CURRENT YEAR
   ===================================================== */

function initCurrentYear() {

  const yearElements =
    document.querySelectorAll("#year");


  yearElements.forEach(element => {

    element.textContent =
      new Date().getFullYear();

  });

}


/* =====================================================
   15. SMOOTH SCROLL
   ===================================================== */

document.addEventListener(
  "click",
  event => {

    const link =
      event.target.closest(
        'a[href^="#"]'
      );


    if (!link) {
      return;
    }


    const targetId =
      link.getAttribute("href");


    if (
      !targetId ||
      targetId === "#"
    ) {
      return;
    }


    const target =
      document.querySelector(targetId);


    if (!target) {
      return;
    }


    event.preventDefault();


    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }
);


/* =====================================================
   16. ESCAPE KEY
   ===================================================== */

document.addEventListener(
  "keydown",
  event => {

    if (event.key !== "Escape") {
      return;
    }


    const navLinks =
      document.getElementById("navLinks");


    const menuBtn =
      document.getElementById("menuBtn");


    if (navLinks) {

      navLinks.classList.remove("active");

    }


    if (menuBtn) {

      menuBtn.textContent = "☰";

    }

  }
);