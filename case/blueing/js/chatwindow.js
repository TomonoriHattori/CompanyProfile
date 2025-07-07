$(function(){
	var openbtn = $('.chatopen'),
		winclose = $('.winclose'),
		chatclose = $('.chatclose'),
		container = $('#chatwindow'),
		icon = $('#chatbtn');

	openbtn.on('click',function(){	
		container.fadeIn('fast');
		return false;
	});

	winclose.on('click',function(){	
		container.fadeOut('fast');
	});

	chatclose.on('click',function(){	
		icon.fadeOut('fast');
	});

});