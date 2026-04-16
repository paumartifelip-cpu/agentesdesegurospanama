// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// 1. Background Orbs Animation
// Smooth infinite floating effect for the orbs to create a dynamic background
gsap.to(".orb-1", {
    x: 100,
    y: 50,
    rotation: 45,
    duration: 15,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1
});

gsap.to(".orb-2", {
    x: -80,
    y: -100,
    rotation: -45,
    duration: 18,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
    delay: 2
});

gsap.to(".orb-3", {
    y: -150,
    scale: 1.2,
    duration: 20,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1
});

// 2. Hero Section (On Load)
const tlHero = gsap.timeline({ defaults: { ease: "power3.out" } });

tlHero.from(".navbar", {
    y: -50,
    opacity: 0,
    duration: 1
})
.from(".badge", {
    y: 20,
    opacity: 0,
    duration: 0.8
}, "-=0.5")
.from(".gsap-title", {
    y: 40,
    opacity: 0,
    duration: 1,
    stagger: 0.1
}, "-=0.6")
.from(".hero-subtitle", {
    y: 20,
    opacity: 0,
    duration: 0.8
}, "-=0.6")
.from(".detail-item", {
    y: 20,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15
}, "-=0.4");

// 3. Intro Section
gsap.from(".intro-content", {
    scrollTrigger: {
        trigger: ".intro",
        start: "top 80%",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
});

// 4. Bento Grid (Use Cases) Stagger
gsap.from(".bento-card", {
    scrollTrigger: {
        trigger: ".use-cases",
        start: "top 75%",
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "back.out(1.2)"
});

// 5. Outcomes Section
const tlOutcomes = gsap.timeline({
    scrollTrigger: {
        trigger: ".outcomes",
        start: "top 75%"
    }
});

tlOutcomes.from(".outcomes h2, .outcomes .subtitle", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2
})
.from(".check-list li", {
    x: -30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out"
}, "-=0.4")
.from(".glass-badge", {
    scale: 0.8,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: "back.out(1.5)"
});

// 6. Investment Card
const tlInvestment = gsap.timeline({
    scrollTrigger: {
        trigger: ".investment",
        start: "top 80%"
    }
});

tlInvestment.from(".investment-card", {
    y: 100,
    scale: 0.95,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});

// Add continuous float effect to the investment card after it appears
tlInvestment.to(".investment-card", {
    y: -10,
    duration: 3,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1
});

// 7. Refresh ScrollTrigger on resize mapping
window.addEventListener("resize", () => ScrollTrigger.refresh());
