app.controller('IwantController', function(){
	var scope = this;
	var data = null;
	var index = 0;
	var angel = 0;

	var wh = $(window).height()-40;
	if(wh > $('body').height()){
		$('body').height(wh);
	}
	$('.app-body').height(wh);
	$('#pan-wrap').height(wh-40);
	$('#order-view').height(wh);


	$.get('/static/data/iwant-data.json?t='+ new Date().getTime(), function(result){
		result = JSON.parse(result);
		data = result.data;
		setUp();
	});

	function setUp(){
		$('#pan-text1').addClass('active');
		buildList();

		var hander;
	    $('#pan .pan-text').on('swipeUp', function(e){
	    	if(hander){
	    		clearTimeout(hander);
	    	}
	    	hander = setTimeout(function(){
	    		--index;
	    		angel -= 36;

	    		if(index<0){
	    			index = 9;
	    		}
	    		handlerRotate();
	    	}, 300);
	    });

	    $('#pan .pan-text').on('swipeDown', function(e){
	    	if(hander){
	    		clearTimeout(hander);
	    	}
	    	hander = setTimeout(function(){
	    		++index;
	    		angel += 36;
	    		if(index == 10){
	    			index = 0;
	    		}
	    		handlerRotate();
	    	}, 300);
	    });

	    function handlerRotate(){
	    	$('#pan .pan-text .active').removeClass('active');
    		$('#pan-text'+ (index+1)).addClass('active');
    		$('#pan').css('-webkit-transform', 'rotate(' + angel + 'deg)');
    		buildList();
	    }
	}

	function buildList(){

		var list = data[index].list;

		$('#pan-list').remove();
		var panlist = $('<div id="pan-list" class="swiper-container"></div>');

		var htmls = [];
		htmls.push('<ul class="swiper-wrapper">');
		for(var i=0, len=list.length; i<len; i++){
			var item = list[i];
			htmls.push('<li class="swiper-slide" cid="' + item.catalog + '" index="' + i + '">'+ item.name +'</li>');
		}
		htmls.push('</ul>');
		panlist.html(htmls.join(''));

		panlist.appendTo($('#pan-wrap'));
		panlist.height(wh-40);
		var count = Math.floor((wh-40)/70);
		// if(panlist.height() > wh){
		// 	panlist.css('top', 0);
		// } else {
		// 	panlist.css('top', (wh-40-panlist.height())/2);
		// }

		var swiper = new Swiper('#pan-list', {
			direction: 'vertical',
	        grabCursor: true,
	        slidesPerView: count
	    });

	    panlist.delegate('li', 'click', function(e){
	    	var cur = $(e.currentTarget);
	    	var ov = $('#order-view');
	    	var pw = $('#pan-wrap');
	    	var w = $('body').width();

			$('#pan-list li').removeClass('active');
			cur.addClass('active');
			ov.css('left', w).show();
			setTimeout(function(){
				ov.css('left', w-60);
			}, 0);
			

			setTimeout(function(){
				pw.css({left: -w+260});
				ov.css({left: 200});
			}, 1000);

			var idx = cur.attr('index');
			var tpl = list[idx].template;
			$.get('/static/js/views/template/'+ tpl + '?t=' + new Date(), function(text){
				ov.html(text);

				$('#orderOk').on('click', function(){
					app.redirect('/send-order');
				});

				$('#orderCancel').on('click', function(){
					$('#pan-wrap').css({left: 0});

					ov.css('left', w);
				});
			});

		});


	}

	
});