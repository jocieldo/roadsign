app.plugin('element/a01', 'plugins/elementBase', function(ElementBase){
	
	var A01 = ElementBase.derive({
		type: 'A01'
	}, 
	//构造函数
	function(){
	}, 
	//prototype
	{
		create: function(){
			var html = __inline('./signs/A01.svg');
			return html;
		},
		getTemplate: function(){
			return this.create();
		}
	});
	
	return A01;
});