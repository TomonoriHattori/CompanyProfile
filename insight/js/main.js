// main.js

document.addEventListener("DOMContentLoaded", function() {

    // --- 1. 左側のテキスト用Swiperの設定 ---
    var textSwiper = new Swiper(".myTextSwiper", {
        effect: "fade",            // フェードエフェクトを適用
        fadeEffect: {
            crossFade: true       // スライド同士が重なってフェードする設定
        },
        loop: true,               // ループ有効
        speed: 1000,              // 切り替えにかける時間（フェードの速さ）
        allowTouchMove: false,    // テキストエリア自体のスワイプ操作を無効化（誤作動防止）
    });

    // --- 2. 右側の画像用Swiperの設定 ---
    var imageSwiper = new Swiper(".myImageSwiper", {
        effect: "slide",          // 直線的なデザインに合わせて通常のスライド移動
        loop: true,               // ループ有効
        speed: 800,               // 切り替えにかける時間
        autoplay: {
            delay: 5000,          // 5秒ごとに切り替え
            disableOnInteraction: false, // ユーザーが操作しても自動再生を止めない
        },
        // コントロール（矢印・ドット）は画像Swiperに紐付ける
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,      // ドットをクリック可能に
        },
    });

    // --- 3. 2つのSwiperを同期させる（Controllerモジュール） ---
    // 画像Swiperが動いたらテキストSwiperを動かす
    imageSwiper.controller.control = textSwiper;
    // テキストSwiperが動いたら画像Swiperを動かす（念のため双方向同期）
    textSwiper.controller.control = imageSwiper;


    // --- 4. tsParticles の設定（背景パーティクル） ---
    tsParticles.load("tsparticles", {
        fullScreen: { enable: false }, // CSSのサイズ指定を優先させる魔法の1行
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: "#cccccc" },
            shape: { type: "circle" },
            opacity: { value: 0.5 },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#00bbe0", opacity: 0.3, width: 1 },
            move: { enable: true, speed: 1.5, out_mode: "out" }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" } },
            modes: { grab: { distance: 140, line_linked: { opacity: 1 } } }
        },
        retina_detect: true
    });

});