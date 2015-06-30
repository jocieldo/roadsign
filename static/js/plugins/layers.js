app.plugin('layers', function(){
	
	function Layers(context){
		this.context = context;
	}

	Layers.prototype.createLayer = function(){
	};

	Layers.prototype.toSVG = function(){
		var svg = ['<?xml version="1.0" encoding="utf-8"?>'];
		svg.push('<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">');
		svg.push('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="128px" height="128px" viewBox="0 0 128 128">');
		svg.push(this.getTemplate());
		svg.push('</svg>');
		return svg.join('');
	};

	Element.prototype.toImage = function(){
		var me = this;
		var img = new Image();
		img.src = "data:image/svg+xml;base64," + btoa(me.toSVG());
		return img;
	};
	
	return Element;
});