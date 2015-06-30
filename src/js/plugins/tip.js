app.plugin('tip', function(){
	
	function Tip(msg){
		this.msg = msg;
		this.initailize();
	}

	Tip.prototype.initailize = function(){
		var me = this;
		var m = $('<div class="koala-plugin-tip">' + me.msg + '</div>');
		$('body').append(m);

		setTimeout(function(){
			m.remove();
		}, 3000);
	};
	
	return Tip;
});