/* ============================================================
   HEADER — スクロール制御 + head02 同期
   ============================================================
   元の header.js (nav.js) の仕様を完全再現:
     - スクロール量が 100px を超えたら .navArea に .hide を付与
     - .hide 付与から 5秒後に自動で .hide を解除（上スクロール不要）
     - 上スクロールしたら即解除
     - #head02 は .navArea の .hide に合わせて translateY で追従
     - SPナビ開閉・subNavDetailArea の開閉も含む
   ============================================================ */

var scrollpos;
var startPos = 0;
var navTimer;

$(function () {
  'use strict';

  /* ------ 現在ページのナビアイテムをアクティブ表示 ------ */
  var current = location.pathname.split('/')[1];
  $('.navList>li>a').each(function () {
    if ($(this).hasClass(current)) {
      $(this).addClass('current');
    }
  });

  var pageID = $('body').attr('id');
  $('.subNav .linkWrap a').each(function () {
    if ($(this).hasClass(pageID)) {
      $(this).addClass('current');
    }
  });

  if ($('body').hasClass('serviceDetail')) {
    $('.subNav .service').addClass('current');
  }

  /* ------ スクロール監視を開始 ------ */
  onScroll();

  /* ------ 初期表示時の最上部判定（背景透明化用の .at-top を付与） ------ */
  updateHead02TopState($(window).scrollTop());

  /* ------ subNav の詳細エリア開閉 ------ */
  $('.subNav .service').on('click', function () {
    if (!$(this).hasClass('active')) {
      $(this).addClass('active');
      $('.subNavDetailArea').addClass('active');
    } else {
      $(this).removeClass('active');
      subNavClose();
    }
  });

  /* ------ SPハンバーガーメニュー開閉 ------ */
  $('.spNavBtn').on('click', function () {
    if ($(this).hasClass('active')) {
      navClose();
    } else {
      scrollpos = $(window).scrollTop();
      $('body').addClass('fixed').css({ 'top': -scrollpos });

      $(this).addClass('active');
      $('.navArea .inner').addClass('active');
      $('.navArea .navList').addClass('active');
      $('.navArea .navList').css('height', $(window).innerHeight() + 'px');

      setTimeout(function () {
        $('.navArea .navList>li').addClass('visible');
      }, 300);
    }
  });

});

/* ============================================================
   onScroll — メインヘッダーの hide / show + head02 同期
   ============================================================ */
function onScroll() {
  $(window).on('scroll.onScroll', function () {
    var scTop = $(window).scrollTop();
    clearTimeout(navTimer);

    /* scrolled クラス（背景色変化などに使用） */
    if (scTop > $('header').height()) {
      if (!$('.navArea').hasClass('scrolled')) {
        $('.navArea').addClass('scrolled');
      }
    } else {
      if (!$('body').hasClass('fixed')) {
        $('.navArea').removeClass('scrolled');
      }
    }

    /* ---- hide クラスの付け外し ---- */
    if (scTop >= startPos && scTop > 100) {
      /* 下スクロール中 or 停止中（100px 超）→ ヘッダーを隠す */
      $('.navArea').addClass('hide');

      /* 5秒後に自動で元に戻す（元の仕様通り） */
      navTimer = setTimeout(function () {
        $('.navArea').removeClass('hide');
        syncHead02();
      }, 5000);

    } else {
      /* 上スクロール → ヘッダーを即座に表示 */
      $('.navArea').removeClass('hide');
    }

    startPos = scTop;

    /* ページ最上部かどうかを判定して .at-top を付け外し（背景透明化用） */
    updateHead02TopState(scTop);

    /* head02 を毎スクロールで同期 */
    syncHead02();
  });
}

/* ============================================================
   syncHead02 — #head02 を .navArea の hide 状態に追従させる
   ============================================================
   ヘッダーは transition なしで即時切替のため、head02 も同様に top を即時変更
   ============================================================ */
function syncHead02() {
  var head02 = document.getElementById('head02');
  if (!head02) return;

  var navAreaEl = document.querySelector('.navArea');
  var navH = navAreaEl ? navAreaEl.offsetHeight : 60;
  var isHidden = navAreaEl ? navAreaEl.classList.contains('hide') : false;

  head02.style.top = isHidden ? '0px' : navH + 'px';
}

/* ============================================================
   updateHead02TopState — ページ最上部かどうかで #head02 に .at-top を付与
   ============================================================
   背景を完全透明にする見た目の切替は CSS 側（PCウィンドウ幅のみ）が担当。
   ここではスクロール位置の判定とクラスの付け外しのみを行うため、
   タブレット以下では .at-top が付いても CSS が反応せず現状動作を維持する。
   ============================================================ */
function updateHead02TopState(scTop) {
  var head02 = document.getElementById('head02');
  if (!head02) return;

  if (scTop <= 0) {
    head02.classList.add('at-top');
  } else {
    head02.classList.remove('at-top');
  }
}

/* ============================================================
   ヘルパー関数
   ============================================================ */
function navClose() {
  $('.spNavBtn').removeClass('active');
  $('.navArea .inner').removeClass('active');
  $('.navArea .navList').removeClass('active');
  $('.navArea .navList>li').removeClass('visible');
  $('.navArea .navList').attr('style', '');
  $('.navArea .navList>li>a').off('click');

  $('body').removeClass('fixed').css({ 'top': '' });
  window.scrollTo(0, scrollpos);
}

function subNavClose() {
  $('.subNavDetailArea').removeClass('active');
}

/* ============================================================
   言語切替モーダル
   ============================================================ */
function openLangModal() {
  var modal = document.getElementById('langModal');
  if (modal) {
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
}

function closeLangModal(e) {
  var modal = document.getElementById('langModal');
  if (!modal) return;
  if (!e || e.target === modal) {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeLangModal();
});