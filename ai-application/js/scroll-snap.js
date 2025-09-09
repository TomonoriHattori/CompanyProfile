//スライドのアニメーション

// GSAPのプラグインを登録
gsap.registerPlugin(ScrollToPlugin);

// DOM要素の取得
const sections = document.querySelectorAll('section');
const scrollDownElement = document.querySelector('.scroll_down'); // ★変更点: .scroll_down要素を取得

// 変数の初期化
let currentSectionIndex = 0;
let isScrolling = false; // アニメーション中の多重実行を防ぐフラグ
const lastSectionIndex = sections.length - 1;
const animationDuration = 1; // アニメーションの時間（秒）
const scrollCooldown = 500; // ★追加: スクロール後の待機時間（ミリ秒）。500 = 0.5秒


/**
 * 指定されたインデックスのセクションへスクロールする関数
 * @param {number} index - スクロール先のセクションのインデックス
 */
function scrollToSection(index) {
// インデックスが範囲内かチェック
if (index < 0 || index >= sections.length) {
    isScrolling = false; // フラグをリセット
    return;
}

// ★変更点: .scroll_downの色を制御
if (index > 1) {
    // 2ページ目以降は 'is-scrolled' クラスを追加して白にする
    scrollDownElement.classList.add('is-scrolled');
} else {
    // 1ページ目ではクラスを削除して黒に戻す
    scrollDownElement.classList.remove('is-scrolled');
}

// 最後のセクション（通常スクロール）に移動する場合
if (index === lastSectionIndex) {
    document.body.style.overflow = 'auto'; // 通常スクロールを許可
} else {
    document.body.style.overflow = 'hidden'; // スナップモードのためスクロールを禁止
}

const targetSection = sections[index];
currentSectionIndex = index;

// GSAPを使ってアニメーション実行
gsap.to(window, {
    scrollTo: {
    y: targetSection.offsetTop, // 目標のY座標
    autoKill: false // スクロール中にユーザーが操作した場合でもアニメーションを継続
    },
    duration: animationDuration,
    ease: "power4.out", // イージングの種類
    // アニメーション完了時にフラグをリセット
    onComplete: () => {
      setTimeout(() => {
        isScrolling = false;
      }, scrollCooldown); // 設定した待機時間だけ遅らせる
    }
});
}

/**
 * マウスホイールイベントの処理
 */
window.addEventListener('wheel', (event) => {
  // ★★★ 修正点 ★★★
  // ブラウザのデフォルトのスクロール動作をキャンセル
  event.preventDefault();

  // アニメーション中は処理を中断
  if (isScrolling) {
    return;
  }

  const delta = event.deltaY; // ホイールの移動量（下: 正, 上: 負）

  // 現在が最後のセクション（通常スクロールモード）の場合
  if (currentSectionIndex === lastSectionIndex) {
    // 最後のセクションの最上部で、さらに上にスクロールしようとした時
    if (window.scrollY <= sections[lastSectionIndex].offsetTop && delta < 0) {
      isScrolling = true;
      scrollToSection(currentSectionIndex - 1); // 一つ前のセクションへ
    }
    // それ以外の通常スクロール中はなにもしない
    return;
  }

  // スナップモード中の処理
  isScrolling = true; // アニメーション開始フラグを立てる

  if (delta > 0) {
    // 下にスクロール
    scrollToSection(currentSectionIndex + 1);
  } else {
    // 上にスクロール
    scrollToSection(currentSectionIndex - 1);
  }
}, { passive: false }); // ★補足: preventDefaultを確実に機能させるためpassive: falseを指定

// ページ読み込み完了時に最初のセクションへ移動（任意）
window.addEventListener('load', () => {
  scrollToSection(0);
});


//innerとヒーローのアニメーション

// 監視対象の要素をすべて取得
const targets = document.querySelectorAll('.section-inner2, .section-inner3, .section-inner4, .hero1, .hero2, .hero3, .hero4');

// Intersection Observerのコールバック関数
const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    // 監視対象の要素（entry.target）がどのクラスを持っているか判定

    // もし .section-inner2 クラスを持っていたら
    if (entry.target.matches('[class*="section-inner"]')) {
      // is-animated クラスを付け外しする
      entry.target.classList.toggle('is-animated', entry.isIntersecting);
    
    // もし hero1, hero2... いずれかのクラスを持っていたら
    } else if (entry.target.matches('[class*="hero"]')) {
      // is-visible クラスを付け外しする
      entry.target.classList.toggle('is-visible', entry.isIntersecting);
    }
  });
};

// Intersection Observerのオプション
const observerOptions = {
  root: null, // ビューポートをルートとする
  rootMargin: '0px',
  threshold: 0.3 // 要素が30%見えたらトリガー
};

// Intersection Observerのインスタンスを作成
const observer = new IntersectionObserver(observerCallback, observerOptions);

// 各ターゲット要素の監視を開始
targets.forEach(target => {
  observer.observe(target);
});

// ★追加: ページ最下部を監視して .scroll_down を非表示にする
const sentinel = document.querySelector('#page-bottom-sentinel');
if (sentinel) {
    const bottomObserverCallback = (entries) => {
        entries.forEach(entry => {
            // 最下部要素が画面内に入ったら .scroll_down に 'is-hidden' クラスを追加
            scrollDownElement.classList.toggle('is-hidden', entry.isIntersecting);
        });
    };
    const bottomObserverOptions = {
        root: null,
        rootMargin: '0px',
        // 画面に少しでも入ったら発火
        threshold: 0.1
    };
    const bottomObserver = new IntersectionObserver(bottomObserverCallback, bottomObserverOptions);
    bottomObserver.observe(sentinel);
}