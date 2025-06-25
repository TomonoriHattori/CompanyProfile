document.addEventListener('DOMContentLoaded', function() {
    const linkElement = document.getElementById('link');
    let lastScrollY = 0; // 前回のスクロール位置を記録する変数

    // レスポンシブな設定値
    const desktopSettings = {
        initialTop: 60,
        scrollThreshold: 100, // デスクトップ時のスクロールしきい値
        // heightもJSで制御する場合はここに設定
        // height: 60
    };
    const mobileSettings = {
        initialTop: 45,
        scrollThreshold: 50, // モバイル時のスクロールしきい値 (小さめに設定することも多い)
        // height: 45
    };

    let currentSettings = desktopSettings; // 現在適用される設定

    // ウィンドウサイズに基づいて設定を更新する関数
    function updateResponsiveSettings() {
        if (window.innerWidth <= 768) { // モバイルと見なすブレークポイント
            currentSettings = mobileSettings;
        } else {
            currentSettings = desktopSettings;
        }

        // 初期状態で正しいtop値を設定 (JSでtopを制御する場合)
        // スクロール位置がしきい値以下の場合にのみ初期topを適用
        if (window.scrollY <= currentSettings.scrollThreshold) {
            if (linkElement) {
                linkElement.style.top = currentSettings.initialTop + 'px';
            }
        }
        // ここでheightもJSで制御する場合は追加
        // if (linkElement && currentSettings.height) {
        //     linkElement.style.height = currentSettings.height + 'px';
        //     linkElement.style.lineHeight = currentSettings.height + 'px'; // テキスト中央揃え用
        // }
    }

    // 初期ロード時とリサイズ時に設定を更新
    updateResponsiveSettings();
    window.addEventListener('resize', updateResponsiveSettings);

    // linkElement が存在するか確認
    if (linkElement) {
        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;

            // スクロール量がしきい値を超えている場合のみ処理を開始
            if (currentScrollY > currentSettings.scrollThreshold) {
                // スクロールが下方向か？
                if (currentScrollY > lastScrollY) {
                    // 下にスクロールしている間は top: 0px にする
                    linkElement.style.top = '0px';
                }
                // スクロールが上方向か？
                else if (currentScrollY < lastScrollY) {
                    // 上にスクロールしている間は現在のinitialTopに戻す
                    linkElement.style.top = currentSettings.initialTop + 'px';
                }
            } else {
                // スクロール量がしきい値以下の場合は常に currentSettings.initialTop に戻す
                linkElement.style.top = currentSettings.initialTop + 'px';
            }

            // 現在のスクロール位置を次回のために保存
            lastScrollY = currentScrollY;
        });
    } else {
        console.warn("ID 'link' を持つ要素が見つかりませんでした。");
    }
});


//フェードインアニメーション
document.addEventListener('DOMContentLoaded', () => {
    // アニメーション対象の要素をすべて取得
    const animTargets = document.querySelectorAll('.anim01, .title');

    // Intersection Observerの設定
    const options = {
        root: null, // ビューポートをルート（監視領域）とする
        rootMargin: '0px', // ビューポートの余白（デフォルト）
        threshold: 0.2 // 要素の20%が見えたら発火（必要に応じて調整）
    };

    // Intersection Observerのインスタンスを作成
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // 要素がビューポートに入ったら
            if (entry.isIntersecting) {
                // is-visibleクラスを追加してアニメーションをトリガー
                entry.target.classList.add('is-visible');
                // 一度アニメーションしたら、その要素の監視を停止
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // すべてのアニメーション対象要素を監視
    animTargets.forEach(target => {
        observer.observe(target);
    });
});
