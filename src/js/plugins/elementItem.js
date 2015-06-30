app.plugin('elementItem', function(){
	
	function ElementItem(context, icon, refer){
		this.context = context;
		this.icon = icon;
		this.refer = refer;

		this.initailize();
	}

	ElementItem.prototype.initailize = function(){
		var me = this;
		me.dom = $('<span class="plugin-element-item" refer="' + me.refer + '"><i class="' + me.icon + '"></i></span>');
		
		me.toolPipe = me.context.pipe('tool', function(value){
			if(value == me.refer){
				me.active();
			}
		});

		me.bindEvent();
	};

	ElementItem.prototype.bindEvent = function(){
		var me = this;
		me.dom.on('click', function(){
			me.toolPipe.set(me.refer);
			me.active();
		});
	};

	ElementItem.prototype.active = function(){
		var me = this;
		$('.plugin-element-item').removeClass('active');
		this.dom.addClass('active');
	};
	
	return ElementItem;
});