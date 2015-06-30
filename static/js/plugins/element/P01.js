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
			var html = "<g type=\"P01\">\n	<rect x=\"0\" y=\"0\" width=\"800\" height=\"400\" fill=\"#2E52C2\"></rect>\n	<rect x=\"10\" y=\"10\" width=\"780\" height=\"380\" fill=\"none\" stroke=\"#ffffff\" stroke-width=\"4px\"></rect>\n</g>\n\n";
			return html;
		},
		getTemplate: function(){
			return this.create();
		}
	});
	
	return P01;
});