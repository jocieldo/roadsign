app.controller('ChatController', function(){
	var wh = $(window).height()-40;
	if(wh > $('body').height()){
		$('body').height(wh);
	}
	$('.app-body').height(wh);
	var fold = true;

	var cl = $('.chat-list');

	var swiper = new Swiper('.swiper-container', {
        spaceBetween: 10,
        slidesPerView: 6,
        slidesPerColumn: 2
    });


	$('#editor').on('keydown', function(e){
		var cur = $(e.currentTarget);

		if(e.which == 13){
			var html = cur.html();
			if(html){
				html = html.replace(/img width="20" height="20"/g, 'img width="64" height="64"');
				sendMessage(html);
				cur.html('');

				e.preventDefault();
				e.stopPropagation();
			}
		}
	});

	function sendMessage(msg){
		$('<div class="send-msg"><span class="msg-holder">'+ msg +'</span><img class="user-avatar" width="60" height="60px" src="static/images/avatar.jpg"/></div>').appendTo(cl);
	}

	function receiveMessage(){
		$('<div class="recv-msg"><span class="msg-holder">'+ msg +'</span><img class="user-avatar" width="60" height="60px" src="/static/images/shop/huoguo4.png"/></div>').appendTo(cl);
	}


	$('.chat-input .btn-emo').on('click', function(e){
		if(fold){
			$('.chat-input').height(200);
		}else{
			$('.chat-input').height(40);
		}
		fold = !fold;
	});

	$('.chat-input').delegate('.emo-item img', 'click', function(e){
		var src = $(this).attr('src');
		$('.chat-input #editor').append('<img width="20" height="20" src="'+ src +'"/>').focus();
	});

	$('.chat-input .btn-plus').on('click', function(e){

	});
	
});