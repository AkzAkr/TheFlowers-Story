// js/animations.js
(function () {
  "use strict";

  function createPetal() {
    const petal = document.createElement("div");
    petal.className = "petal";
    const flowers = ["🌸", "🌼", "🌺", "🏵️", "💮"];
    petal.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.top = "-50px";
    petal.style.fontSize = Math.random() * 20 + 10 + "px";
    petal.style.animationDuration = Math.random() * 10 + 10 + "s";
    petal.style.animationDelay = Math.random() * 5 + "s";
    document.getElementById("petals-container").appendChild(petal);
    setTimeout(() => petal.remove(), 20000);
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target)
          target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function initNavbarScroll() {
    window.addEventListener("scroll", () => {
      const nav = document.querySelector("nav");
      nav.style.boxShadow =
        window.scrollY > 50
          ? "0 2px 20px rgba(0,0,0,0.1)"
          : "0 2px 20px rgba(0,0,0,0.05)";
    });
  }

  function initIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    document
      .querySelectorAll(".character-card, .gallery-item, .intro-content")
      .forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.6s ease";
        observer.observe(el);
      });
  }

  window.AnimationController = {
    init() {
      setInterval(createPetal, 3000);
      initSmoothScroll();
      initNavbarScroll();
      initIntersectionObserver();
    },
  };
})();
