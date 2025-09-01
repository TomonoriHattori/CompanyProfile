// すべてのsection要素を取得
        const sections = document.querySelectorAll('section');
        let currentSectionIndex = 0;
        let isScrolling = false; // スクロール中の連続イベントを防ぐフラグ

        // スクロールを実行する関数
        function scrollToSection(index) {
        if (index >= 0 && index < sections.length) {
            sections[index].scrollIntoView({ behavior: 'smooth' });
            currentSectionIndex = index;
        }
        }

        // マウスホイールイベントのリスナー
        window.addEventListener('wheel', event => {
        // isScrollingがtrueの間は処理をしない
        if (isScrolling) return;

        const delta = event.deltaY; // ホイールの移動量を取得

        if (delta > 0) {
            // 下にスクロールした場合
            scrollToSection(currentSectionIndex + 1);
        } else {
            // 上にスクロールした場合
            scrollToSection(currentSectionIndex - 1);
        }

        // スクロールアニメーション中の多重発火を防ぐ
        isScrolling = true;
        setTimeout(() => {
            isScrolling = false;
        }, 1000); // 1秒後にフラグをリセット
        });