app.plugin('toolPanel', function(){
	
	function ToolPanel(dom, title){
		this.dom = dom;
		this.title = title;

		this.isFold = false;
		this.initailize();
	}

	ToolPanel.prototype.initailize = function(){
		var tpl = __inline('./toolPanel.tpl');
		this.dom.html(koala._.render(tpl, this));
		this.bindEvent();
	};

	ToolPanel.prototype.append = function(html){
		var me = this;
		var body = me.dom.find('.panel-body');
		body.append(html);
	};

	ToolPanel.prototype.bindEvent = function(){
		var me = this;
		var body = me.dom.find('.panel-body');
		me.dom.find('.icon-circle-up').on('click', function(e){
			if(!me.isFold){
				$(this).addClass('icon-circle-down');
				TweenLite.to(body, 0.5, {
					alpha: 0,
					ease: Strong.easeInOut,
					onComplete: function(){
						body.hide();
					}
				});
			} else {
				$(this).removeClass('icon-circle-down');
				TweenLite.to(body, 0.5, {
					alpha: 1,
					ease: Strong.easeInOut,
					onComplete: function(){
						body.show();
					}
				});
			}
			me.isFold = !me.isFold;
		});
	};
	
	return ToolPanel;
});