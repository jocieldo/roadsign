app.plugin('elementManager', 'plugins/toolPanel, plugins/elementItem',  function(ToolPanel, ElementItem){
	
	function ElementManager(context){
		this.context = context;

		this.initailize();
		return this.dom;
	}

	ElementManager.prototype.initailize = function(){
		var me = this;
		
		var toolbar = $('#toolbar');
		var layer = new ToolPanel($('#layer1'), '层');
		var prop = new ToolPanel($('#propPanel'), '属性面板');
		var com1 = new ToolPanel($('#comPanel'), '面板库');
		var com2 = new ToolPanel($('#component2'), '方向元件库');

		toolbar.append(new ElementItem(me.context, 'icon-navigation', 'Select'));
		toolbar.append(new ElementItem(me.context, 'i-text', 'Text'));
		toolbar.append(new ElementItem(me.context, 'icon-crop-5-4', 'Rect'));
		toolbar.append(new ElementItem(me.context, 'icon-panorama-fisheye', 'Circle'));
		//属性面板
		prop.append('<div id="propertyPanel"></div>');

		com1.append(new ElementItem(me.context, 'i-blue-panel', 'BluePanel'));
		com1.append(new ElementItem(me.context, 'i-green-panel', 'GreenPanel'));
	};

	
	
	return ElementManager;
});