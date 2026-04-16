$(function(){
	$('a[href^="#"]').click(function(){
		var speed = 500;
		var href = $(this).attr("href");

		// ページトップへ戻るリンク（.logo-top-link または href="#" のみ）
		if (href == "#") {
			if ($(this).hasClass('logo-top-link')) {
				$("html, body").animate({scrollTop: 0}, speed, "swing");
			}
			// hubspot など他の href="#" はそのまま無効化
			return false;
		}

		var target = $(href == "" ? 'html' : href);
		if (!target.length) return false;

		// ヘッダー (.navArea) が hide 状態なら高さを 0 として計算
		var navH    = $('.navArea').hasClass('hide') ? 0 : ($('.navArea').outerHeight() || 0);
		// #head02 が存在する場合のみ加算
		var head02H = $('#head02').length ? ($('#head02').outerHeight() || 0) : 0;
		var offset  = navH + head02H;

		var position = target.offset().top - offset;
		$("html, body").animate({scrollTop: position}, speed, "swing");
		return false;
	});
});