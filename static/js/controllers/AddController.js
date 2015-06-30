app.controller('AddController', 'plugins/today, plugins/editor, plugins/tip', function(Today, Editor, Tip){
	var scope = this;
	var ele = $(scope._dom);
	$('.app-body').height($(window).height()-40);
	
	new Today(ele.find('.today'));
	var editor = new Editor(ele.find('.editor'));

	var article = new Firebase('https://linxi.firebaseio.com/article');

	ele.find('.cmd-save').on('click', function(e){
		if(editor.getHTML() == ''){
			return;
		}

		var newArticle = article.push();
    	newArticle.set({
		    "content" : editor.getHTML(),
		    "postTime" : new Date().getTime()
		}, function(error){
			new Tip('保存成功');
	  	});
	});

});