app.plugin('element', 
	'plugins/element/rect, plugins/element/a01, plugins/element/p01',
function(Rect, A01, P01){

	function Element(){
	}
	Element.Rect = Rect;
	Element.A01 = A01;
	Element.P01 = P01;
	
	return Element;
});