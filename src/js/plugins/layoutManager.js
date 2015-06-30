app.plugin('layoutManager', 'plugins/toolPanel, plugins/elementItem',  function(ToolPanel, ElementItem){
	
	var TOOLS = [
		'Select|icon-navigation',
		'Text|i-text',
		'Rect|icon-crop-5-4',
		'Circle|icon-panorama-fisheye'
	];

	function LayoutManager(context){
		this.context = context;

		this.tools = {};
		this.initailize();
		return this.dom;
	}

	LayoutManager.prototype.initailize = function(){
		var me = this;
		
		var layer = new ToolPanel($('#layer1'), '层');
		var prop = new ToolPanel($('#propPanel'), '属性面板');
		var com1 = new ToolPanel($('#comPanel'), '面板库');
		var com2 = new ToolPanel($('#component2'), '方向元件库');

		me.initToolbar();
		//属性面板
		prop.append('<div id="propertyPanel"></div>');

		me.context.pipe('propPanel', function(html){
			me.updatePropertyPanel(html);
		});
		me.propPipe = me.context.pipe('propChange');
	};

	LayoutManager.prototype.initToolbar = function(html){
		var me = this;
		var toolbar = $('#toolbar');
		TOOLS.forEach(function(tool){
			var infos = tool.split('|');
			me.tools[infos[0]] = new ElementItem(me.context, infos[1], infos[0]);
		});
		for(var key in me.tools){
			toolbar.append(me.tools[key].dom);
		}
	};

	LayoutManager.prototype.activeTool = function(name){
		var me = this;
		var tool = me.tools[name];
		tool.active();
	}

	LayoutManager.prototype.updatePropertyPanel = function(html){
		$('#propertyPanel').html(html);
		this.bindPropertyChange();
	};

	LayoutManager.prototype.bindPropertyChange = function(){
		var me = this;
		$('#propertyPanel').find('input[type="text"]').each(function(i, item){
			var $item = $(item);
			var val = item.value;

			if(/^\d+$/.test(val)){

			}

			$item.on('change', function(e){
				me.propPipe.set($(this).attr('id'), $(this).val());
			});
		});
	};
	
	return LayoutManager;
});