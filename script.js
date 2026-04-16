// ══════════════════════════════════════
// GSAP — Best Practices from gsap-skills
// ══════════════════════════════════════
gsap.registerPlugin(ScrollTrigger);

// Global defaults
gsap.defaults({ ease: "power3.out" });

// ── Responsive matchMedia ──────────────
const mm = gsap.matchMedia();

mm.add(
  {
    isDesktop: "(min-width: 768px)",
    isMobile: "(max-width: 767px)",
    reduceMotion: "(prefers-reduced-motion: reduce)"
  },
  (context) => {
    const { isDesktop, isMobile, reduceMotion } = context.conditions;
    const dur = reduceMotion ? 0 : 1;

    // ════════════════════
    // 1. HERO — entrance timeline
    // ════════════════════
    const tlHero = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Split title into lines for a word-by-word reveal
    const titleWords = document.querySelectorAll(".hero-word");
    if (titleWords.length > 0) {
      tlHero
        .from(".navbar", { y: -40, autoAlpha: 0, duration: dur * 0.7 })
        .from(
          titleWords,
          {
            y: 80,
            autoAlpha: 0,
            duration: dur * 0.9,
            stagger: { amount: reduceMotion ? 0 : 0.5, from: "start" }
          },
          "-=0.3"
        )
        .from(".hero-subtitle", { y: 30, autoAlpha: 0, duration: dur * 0.7 }, "-=0.4")
        .from(
          ".hero-meta-item",
          { y: 20, autoAlpha: 0, duration: dur * 0.5, stagger: 0.12 },
          "-=0.4"
        );
    } else {
      tlHero
        .from(".navbar", { y: -40, autoAlpha: 0, duration: dur * 0.7 })
        .from(".hero-title", { y: 80, autoAlpha: 0, duration: dur })
        .from(".hero-subtitle", { y: 30, autoAlpha: 0, duration: dur * 0.7 }, "-=0.5")
        .from(
          ".hero-meta-item",
          { y: 20, autoAlpha: 0, duration: dur * 0.5, stagger: 0.12 },
          "-=0.4"
        );
    }

    // ════════════════════
    // 2. HERO PARALLAX — scrub
    //    Text moves slower than scroll = satisfying depth
    // ════════════════════
    if (!reduceMotion && isDesktop) {
      gsap.to(".hero-content", {
        y: 120,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.5
        }
      });

      gsap.to(".hero-bg", {
        y: 150,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 2
        }
      });
    }

    // ════════════════════
    // 3. NAVBAR — toggleClass on scroll past hero
    // ════════════════════
    ScrollTrigger.create({
      trigger: ".hero",
      start: "bottom 72px",
      toggleClass: { targets: ".navbar", className: "navbar-scrolled" },
      onEnter: () =>
        gsap.to(".navbar", {
          backgroundColor: "rgba(255,255,255,0.97)",
          borderBottomColor: "rgba(0,0,0,0.08)",
          duration: 0.3,
          ease: "power2.out"
        }),
      onLeaveBack: () =>
        gsap.to(".navbar", {
          backgroundColor: "rgba(10, 14, 39, 0.85)",
          borderBottomColor: "rgba(255,255,255,0.06)",
          duration: 0.3,
          ease: "power2.out"
        })
    });

    // ════════════════════
    // 4. SECTION LABELS & HEADINGS — scroll-triggered
    // ════════════════════
    gsap.utils.toArray(".section-icon").forEach((el) => {
      gsap.from(el, {
        scale: 0,
        autoAlpha: 0,
        duration: reduceMotion ? 0 : 0.5,
        ease: "back.out(2)",
        scrollTrigger: { trigger: el, start: "top 88%" }
      });
    });

    gsap.utils.toArray(".section-heading").forEach((el) => {
      gsap.from(el, {
        y: reduceMotion ? 0 : 50,
        autoAlpha: 0,
        duration: reduceMotion ? 0 : 0.9,
        scrollTrigger: { trigger: el, start: "top 85%" }
      });
    });

    gsap.utils.toArray(".section-desc").forEach((el) => {
      gsap.from(el, {
        y: reduceMotion ? 0 : 25,
        autoAlpha: 0,
        duration: reduceMotion ? 0 : 0.7,
        scrollTrigger: { trigger: el, start: "top 87%" }
      });
    });

    // ════════════════════
    // 5. FEATURE CARDS — ScrollTrigger.batch()
    //    Best practice: coordinates staggered reveal of
    //    all cards that enter the viewport at once
    // ════════════════════
    gsap.set(".gsap-feature", { autoAlpha: 0, y: 50 });

    ScrollTrigger.batch(".gsap-feature", {
      interval: 0.08,
      batchMax: 6,
      onEnter: (batch) =>
        gsap.to(batch, {
          autoAlpha: 1,
          y: 0,
          duration: reduceMotion ? 0 : 0.7,
          stagger: { each: 0.1, from: "start" },
          ease: "power3.out",
          overwrite: true
        }),
      start: "top 82%"
    });

    // ════════════════════
    // 6. OUTCOME ITEMS — horizontal slide-in
    // ════════════════════
    gsap.from(".gsap-outcome", {
      x: reduceMotion ? 0 : -60,
      autoAlpha: 0,
      duration: reduceMotion ? 0 : 0.75,
      stagger: 0.15,
      scrollTrigger: { trigger: ".outcomes-grid", start: "top 80%" }
    });

    gsap.from(".method-badge", {
      y: reduceMotion ? 0 : 20,
      autoAlpha: 0,
      duration: reduceMotion ? 0 : 0.45,
      stagger: 0.07,
      scrollTrigger: { trigger: ".methodology-badges", start: "top 88%" }
    });

    // ════════════════════
    // 7. SPEAKER — clip-path image reveal (spectacular)
    //    Reveal from left using clip-path polygon wipe
    // ════════════════════
    if (!reduceMotion) {
      gsap.set(".gsap-speaker-img", {
        clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)"
      });

      const tlSpeaker = gsap.timeline({
        scrollTrigger: {
          trigger: "#ponente",
          start: "top 65%"
        }
      });

      tlSpeaker
        .to(".gsap-speaker-img", {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.4,
          ease: "power4.inOut"
        })
        .from(
          ".gsap-speaker-img img",
          { scale: 1.25, duration: 1.8, ease: "power3.out" },
          "-=1.4"
        )
        .from(".speaker-tag", { y: 12, autoAlpha: 0, duration: 0.45 }, "-=0.6")
        .from(".speaker-name", { y: 30, autoAlpha: 0, duration: 0.7 }, "-=0.35")
        .from(".speaker-role", { y: 18, autoAlpha: 0, duration: 0.5 }, "-=0.4")
        .from(".speaker-bio", { y: 18, autoAlpha: 0, duration: 0.5 }, "-=0.35")
        .from(".btn-toggle", { y: 10, autoAlpha: 0, duration: 0.4 }, "-=0.2")
        .from(".speaker-actions", { y: 20, autoAlpha: 0, duration: 0.5 }, "-=0.2");
    } else {
      // Reduced motion: just fade
      gsap.from(["#ponente .speaker-content-col"], {
        autoAlpha: 0,
        duration: 0,
        scrollTrigger: { trigger: "#ponente", start: "top 80%" }
      });
    }

    // ════════════════════
    // 8. INVESTMENT — scale + fade
    // ════════════════════
    gsap.from(".gsap-investment", {
      y: reduceMotion ? 0 : 80,
      scale: reduceMotion ? 1 : 0.97,
      autoAlpha: 0,
      duration: reduceMotion ? 0 : 1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".gsap-investment", start: "top 82%" }
    });

    // ════════════════════
    // 9. FLOATING effect on investment card (after reveal)
    //    Only desktop to avoid mobile jank
    // ════════════════════
    if (isDesktop && !reduceMotion) {
      ScrollTrigger.create({
        trigger: ".gsap-investment",
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(".gsap-investment", {
            y: -10,
            duration: 3.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 1
          });
        }
      });
    }

    // ════════════════════
    // 10. FOOTER
    // ════════════════════
    gsap.from(".site-footer", {
      autoAlpha: 0,
      y: reduceMotion ? 0 : 30,
      duration: reduceMotion ? 0 : 0.7,
      scrollTrigger: { trigger: ".site-footer", start: "top 95%" }
    });
  }
);

// ════════════════════
// 11. READ MORE toggle — GSAP animated expand
// ════════════════════
const btnReadMore = document.getElementById("btnReadMore");
const bioExtended = document.getElementById("bioExtended");

if (btnReadMore && bioExtended) {
  let isOpen = false;

  btnReadMore.addEventListener("click", () => {
    isOpen = !isOpen;

    if (isOpen) {
      gsap.to(bioExtended, {
        height: "auto",
        autoAlpha: 1,
        duration: 0.55,
        ease: "power2.out",
        onComplete: () => ScrollTrigger.refresh()
      });
      btnReadMore.textContent = "Leer menos";
    } else {
      gsap.to(bioExtended, {
        height: 0,
        autoAlpha: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => ScrollTrigger.refresh()
      });
      btnReadMore.textContent = "Leer más";
    }
  });
}

// ════════════════════
// 12. MOBILE NAV TOGGLE
// ════════════════════
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.contains("open");
    navLinks.classList.toggle("open");

    // Animate the hamburger bars
    const spans = navToggle.querySelectorAll("span");
    if (!isOpen) {
      gsap.to(spans[0], { y: 7, rotation: 45, duration: 0.3, ease: "power2.out" });
      gsap.to(spans[1], { autoAlpha: 0, duration: 0.2 });
      gsap.to(spans[2], { y: -7, rotation: -45, duration: 0.3, ease: "power2.out" });
    } else {
      gsap.to(spans[0], { y: 0, rotation: 0, duration: 0.3, ease: "power2.out" });
      gsap.to(spans[1], { autoAlpha: 1, duration: 0.2 });
      gsap.to(spans[2], { y: 0, rotation: 0, duration: 0.3, ease: "power2.out" });
    }
  });

  // Close on link click
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      const spans = navToggle.querySelectorAll("span");
      gsap.to(spans[0], { y: 0, rotation: 0, duration: 0.3 });
      gsap.to(spans[1], { autoAlpha: 1, duration: 0.2 });
      gsap.to(spans[2], { y: 0, rotation: 0, duration: 0.3 });
    });
  });
}

// ════════════════════
// 13. RESIZE — refresh ScrollTrigger
// ════════════════════
window.addEventListener("resize", () => ScrollTrigger.refresh());

