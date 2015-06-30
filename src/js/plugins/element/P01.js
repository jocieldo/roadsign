app.plugin('element/p01', 'plugins/elementBase', function(ElementBase){
	
	var P01 = ElementBase.derive({
		type: 'P01'
	}, 
	//构造函数
	function(){
	}, 
	//prototype
	{
		create: function(){
			var html = __inline('./signs/P01.svg');
			return html;
		},
		getTemplate: function(){
			return this.create();
		}
	});
	
	return P01;
});