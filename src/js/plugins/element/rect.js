app.plugin('element/rect', 'plugins/elementBase', function(ElementBase){
	
	var Rect = ElementBase.derive({
		x: 0,
		y: 0,
		width: 50,
		height: 50,
		borderRadius: 0,
		fillColor: "#ffffff",
		strokeWidth: 1,
		strokeColor: "#000000"
	}, 
	//构造函数
	function(x, y, w, h){
		x && (this.x = x);
		y && (this.y = y);
		w && (this.w = w);
		h && (this.h = h);
		this.ele = this.create();
	}, 
	//prototype
	{
		create: function(){
			var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
			rect.setAttribute("x", this.x);
			rect.setAttribute("y", this.y);
			rect.setAttribute("width", this.width);
			rect.setAttribute("height", this.height);
			rect.setAttribute("fill", this.fillColor);
			rect.setAttribute("stroke", this.strokeColor);
			rect.setAttribute("stroke-width", this.strokeWidth);
			return rect;
		},

	});
	
	return Rect;
});