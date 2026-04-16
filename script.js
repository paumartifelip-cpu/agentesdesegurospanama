// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ════════════════════
// 1. Hero Entrance
// ════════════════════
const tlHero = gsap.timeline({ defaults: { ease: "power3.out" } });

tlHero
    .from(".navbar", {
        y: -30,
        autoAlpha: 0,
        duration: 0.8
    })
    .from(".hero-title", {
        y: 80,
        autoAlpha: 0,
        duration: 1.2,
    }, "-=0.4")
    .from(".hero-subtitle", {
        y: 40,
        autoAlpha: 0,
        duration: 0.9
    }, "-=0.8")
    .from(".hero-meta", {
        y: 30,
        autoAlpha: 0,
        duration: 0.8
    }, "-=0.6")
    .from(".hero-meta-item", {
        y: 20,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.12
    }, "-=0.5");

// ════════════════════
// 2. Section Icons + Headings (scroll-triggered)
// ════════════════════
gsap.utils.toArray(".section-icon").forEach(icon => {
    gsap.from(icon, {
        scrollTrigger: {
            trigger: icon,
            start: "top 85%"
        },
        scale: 0,
        autoAlpha: 0,
        duration: 0.6,
        ease: "back.out(2)"
    });
});

gsap.utils.toArray(".section-heading").forEach(heading => {
    gsap.from(heading, {
        scrollTrigger: {
            trigger: heading,
            start: "top 85%"
        },
        y: 50,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out"
    });
});

gsap.utils.toArray(".section-desc").forEach(desc => {
    gsap.from(desc, {
        scrollTrigger: {
            trigger: desc,
            start: "top 85%"
        },
        y: 30,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power2.out"
    });
});

// ════════════════════
// 3. Feature Cards (Staggered)
// ════════════════════
gsap.from(".gsap-feature", {
    scrollTrigger: {
        trigger: ".features-grid",
        start: "top 75%"
    },
    y: 60,
    autoAlpha: 0,
    duration: 0.7,
    stagger: {
        amount: 0.6,
        from: "start"
    },
    ease: "power3.out"
});

// ════════════════════
// 4. Outcomes (Horizontal reveal)
// ════════════════════
gsap.from(".gsap-outcome", {
    scrollTrigger: {
        trigger: ".outcomes-grid",
        start: "top 80%"
    },
    x: -60,
    autoAlpha: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: "power3.out"
});

gsap.from(".method-badge", {
    scrollTrigger: {
        trigger: ".methodology-badges",
        start: "top 85%"
    },
    y: 20,
    autoAlpha: 0,
    duration: 0.5,
    stagger: 0.08,
    ease: "power2.out"
});

// ════════════════════
// 5. Speaker Section (Image clip-path reveal)
// ════════════════════
const tlSpeaker = gsap.timeline({
    scrollTrigger: {
        trigger: "#ponente",
        start: "top 65%"
    }
});

tlSpeaker
    .from(".gsap-speaker-img", {
        clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
        duration: 1.4,
        ease: "power4.inOut"
    })
    .from(".gsap-speaker-img img", {
        scale: 1.3,
        duration: 1.8,
        ease: "power3.out"
    }, "-=1.4")
    .from(".speaker-tag", {
        y: 20,
        autoAlpha: 0,
        duration: 0.5
    }, "-=0.8")
    .from(".speaker-name", {
        y: 30,
        autoAlpha: 0,
        duration: 0.7
    }, "-=0.5")
    .from(".speaker-role", {
        y: 20,
        autoAlpha: 0,
        duration: 0.5
    }, "-=0.4")
    .from(".speaker-bio", {
        y: 20,
        autoAlpha: 0,
        duration: 0.5
    }, "-=0.3")
    .from(".btn-toggle", {
        y: 10,
        autoAlpha: 0,
        duration: 0.4
    }, "-=0.2")
    .from(".speaker-actions", {
        y: 20,
        autoAlpha: 0,
        duration: 0.5
    }, "-=0.2");

// ════════════════════
// 6. Investment Card
// ════════════════════
gsap.from(".gsap-investment", {
    scrollTrigger: {
        trigger: ".gsap-investment",
        start: "top 80%"
    },
    y: 80,
    autoAlpha: 0,
    duration: 1,
    ease: "power3.out"
});

// ════════════════════
// 7. Read More Toggle
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
                opacity: 1,
                duration: 0.5,
                ease: "power2.out",
                onComplete: () => ScrollTrigger.refresh()
            });
            btnReadMore.textContent = "Leer menos";
        } else {
            gsap.to(bioExtended, {
                height: 0,
                opacity: 0,
                duration: 0.4,
                ease: "power2.inOut",
                onComplete: () => ScrollTrigger.refresh()
            });
            btnReadMore.textContent = "Leer más";
        }
    });
}

// ════════════════════
// 8. Parallax Hero Background
// ════════════════════
gsap.to(".hero-bg", {
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    },
    y: 200,
    ease: "none"
});

// ════════════════════
// 9. Navbar Background Change on Scroll
// ════════════════════
ScrollTrigger.create({
    trigger: ".hero",
    start: "bottom 72px",
    onEnter: () => {
        gsap.to(".navbar", {
            background: "rgba(255,255,255,0.95)",
            color: "#1a1f3d",
            duration: 0.3
        });
        document.querySelector(".navbar").classList.add("navbar-light");
    },
    onLeaveBack: () => {
        gsap.to(".navbar", {
            background: "rgba(10, 14, 39, 0.85)",
            color: "#ffffff",
            duration: 0.3
        });
        document.querySelector(".navbar").classList.remove("navbar-light");
    }
});

// ════════════════════
// 10. Resize Handler
// ════════════════════
window.addEventListener("resize", () => ScrollTrigger.refresh());
