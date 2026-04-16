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
    imageSwiper.on("slideChange", function () {
        textSwiper.slideToLoop(imageSwiper.realIndex, 0);
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

    // --- ホワイトペーパーのアコーディオン機能 ---
    const foldBtn = document.querySelector('.link-btn.fold');
    const hideSection = document.querySelector('.wp-main.hide');

    // ページの言語を判定 (html要素のlang属性)
    const isEnglish = document.documentElement.lang === 'en';

    if (foldBtn && hideSection) {
        // 初期状態のテキストを言語に応じて設定
        foldBtn.textContent = isEnglish ? "Show All" : "全て見る";

        foldBtn.addEventListener('click', function (e) {
            e.preventDefault();

            hideSection.classList.toggle('open');
            foldBtn.classList.toggle('is-open');

            if (hideSection.classList.contains('open')) {
                foldBtn.textContent = isEnglish ? "Show Less" : "一部表示にする";
            } else {
                foldBtn.textContent = isEnglish ? "Show All" : "全て見る";

                const topPos = document.querySelector('.white-paper').offsetTop;
                window.scrollTo({ top: topPos, behavior: 'smooth' });
            }
        });
    }

    // head02 の制御は style_header.js に統合済み
});