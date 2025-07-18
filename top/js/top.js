var timer = 0;
    var currentWidth = window.innerWidth;
	$(window).resize(function(){
        if (currentWidth == window.innerWidth) {
            return;
        }
        if (timer > 0) {
            clearTimeout(timer);
        }
 
        timer = setTimeout(function () {
            location.reload();
        }, 200);
		
	});

$(function() {
	$('.mvnav01').on('click',function(){	
		$('.nav01').toggleClass('open');
		return false;
	});

	$('.mvnav02').on('click',function(){	
		$('.nav02').toggleClass('open');
		return false;
	});
	
	$('.mvnav03').on('click',function(){	
		$('.nav03').toggleClass('open');
		return false;
	});
	
	$('#blog .morebtn').on('click',function(){	
		$('#blog .postmore').slideDown();
		$('#blog .morebtn').hide();
		$('#blog .morebtn.close').show();
		return false;
	});

		$('#blog .morebtn.close').on('click',function(){	
		$('#blog .postmore').slideUp();
		$('#blog .morebtn').show();
		$('#blog .morebtn.close').hide();
		return false;
	});

	$('#whitepaper .morebtn').on('click',function(){	
		$('#whitepaper .wpmore').slideDown();
		$('#whitepaper .morebtn').hide();
		$('#whitepaper .morebtn.close').show();
		return false;
	});

		$('#whitepaper .morebtn.close').on('click',function(){	
		$('#whitepaper .wpmore').slideUp();
		$('#whitepaper .morebtn').show();
		$('#whitepaper .morebtn.close').hide();
		return false;
	});
	
});

var elemTop = [];


function PositionCheck(){
    
  $(".anchor").each(function(i) {
    elemTop[i] =Math.round(parseInt($(this).offset().top));
  });
}


function ScrollAnime() {
  var scroll = Math.round($(window).scrollTop());
  var NavElem = $("#scrollnav li");

  console.log("現在のスクロール位置: " + scroll, "各アンカーの位置: ", elemTop);
  

  $("#scrollnav li").removeClass('current');
 if(scroll >= 0 && scroll < elemTop[1]) {
      $("#scrollnav").addClass('hide');
    }
  else if(scroll >= elemTop[1] && scroll < elemTop[2]) {
     $(NavElem[0]).addClass('current');
       $("#scrollnav").removeClass('hide');
   } 
    else if(scroll >= elemTop[2] && scroll < elemTop[3]) {
     $(NavElem[1]).addClass('current');
       $("#scrollnav").removeClass('hide');
   } 
    else if(scroll >= elemTop[3] && scroll < elemTop[4]) {
      $(NavElem[2]).addClass('current');
       $("#scrollnav").removeClass('hide');
   } 
    else if(scroll >= elemTop[4] && scroll < elemTop[5]) {
      $(NavElem[3]).addClass('current');
       $("#scrollnav").removeClass('hide');
    } 
    else if(scroll >= elemTop[5] && scroll < elemTop[6]) {
      $(NavElem[4]).addClass('current');
       $("#scrollnav").removeClass('hide');
   } 
    else if(scroll >= elemTop[6] && scroll < elemTop[7]) {
      $(NavElem[5]).addClass('current');
       $("#scrollnav").removeClass('hide');
   } 
    else if(scroll >= elemTop[7] && scroll < elemTop[8]) {
      $(NavElem[6]).addClass('current');
       $("#scrollnav").removeClass('hide');
   } 
    else if(scroll >= elemTop[8] && scroll < elemTop[9]) {
      $(NavElem[7]).addClass('current');
       $("#scrollnav").removeClass('hide');
   } 
    else if(scroll >= elemTop[9] && scroll < elemTop[10]) {
      $(NavElem[8]).addClass('current');
      $("#scrollnav").removeClass('hide');
   }
    
    var hidePosition = elemTop[10]; // ここに非表示にしたいスクロール位置の数値を入力
    if (scroll >= hidePosition) {
      $("#scrollnav").addClass('hide');
    }
}


$(window).scroll(function () {
  PositionCheck();
  ScrollAnime();
      $("#scrollnav").removeClass('def');
});

$(window).resize(function() {
  PositionCheck()
});


//スクロールでヘッダーに背景色追加

// ウィンドウのスクロールイベントを監視
  window.addEventListener('scroll', function() {
    // 対象のID要素を取得
    const targetElement = document.getElementById('headnavlayer_BG');

    // 現在の垂直方向のスクロール量を取得
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    // スクロール量が100pxを超えたかどうかを判定
    if (scrollPosition > 100) {
      // 100pxを超えていたら 'scrolled' クラスを追加
      targetElement.classList.add('scrolled');
    } else {
      // 100px以下の場合は 'scrolled' クラスを削除
      targetElement.classList.remove('scrolled');
    }
  });