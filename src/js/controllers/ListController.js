app.controller('ListController', 'plugins/dayList, plugins/tip', function(DayList, Tip){
	var scope = this;
	var ele = $(scope._dom);

	$('.app-body').height($(window).height()-40);

	var article = new Firebase('https://linxi.firebaseio.com/article');

	article.endAt().limit(100).on('value', function(dataSnapshot) {
		var data = dataSnapshot.val();
		var listData = [];
		for(var k in data){
			listData.push({
				id: k,
				content: data[k].content,
				postTime: data[k].postTime
			});
		}

		new DayList($('#daylist'), listData.reverse());
	});

});