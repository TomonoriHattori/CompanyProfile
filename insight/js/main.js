document.addEventListener("DOMContentLoaded", function () {

    // --- 画像スライダー ---
    var imageSwiper = new Swiper(".myImageSwiper", {
        effect: "slide",
        loop: true,
        speed: 800,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    // --- テキストスライダー ---
    var textSwiper = new Swiper(".myTextSwiper", {
        effect: "fade",
        fadeEffect: { crossFade: true },
        loop: true,
        speed: 1000,
        allowTouchMove: false,
        simulateTouch: false,
    });

    // --- 同期: 画像が動いたらテキストも動かす ---
    // loop時は slideTo() ではなく slideToLoop() で realIndex を使う
    imageSwiper.on("slideChange", function () {
        textSwiper.slideToLoop(imageSwiper.realIndex, 0); // 第2引数0でテキストは瞬時に切替え、フェードはSwiperに任せる
    });

    // --- tsParticles ---
    tsParticles.load("tsparticles", {
        fullScreen: { enable: false },
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: "#cccccc" },
            shape: { type: "circle" },
            opacity: { value: 0.5 },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#00bbe0", opacity: 0.3, width: 1 },
            move: { enable: true, speed: 1.5, out_mode: "out" },
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "grab" },
                onclick: { enable: true, mode: "push" },
            },
            modes: { grab: { distance: 140, line_linked: { opacity: 1 } } },
        },
        retina_detect: true,
    });
});