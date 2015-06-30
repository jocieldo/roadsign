app.plugin('svg2json', 'plugins/element', function (Element) {

	var TEXT_SIZE = {
		"1": 70,
		"2": 50,
		"3": 30
	};
	var WIDTH = 800,
		HEIGHT = 400;

	function Svg2Json(data) {
		this.data = data;
		this.svg = this.initailize(data);
	}

	Svg2Json.prototype.initailize = function (svg) {
		var me = this;
		var html = [];
		html.push('<svg isRoot="true" version="1.1" width="800" height="400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 800 400">');
		//type
		var type = new Element[svg.type];
		html.push(type.getTemplate());
		//texts
		if (svg.texts) {
			var textHtml = svg.texts.map(function (item, index) {
				return me.createTextNode(item);
			});
			html = html.concat(textHtml);
		}
		//signs
		if (svg.signs) {
			var signHtml = svg.signs.map(function (item, index) {
				return me.createSign(item);
			});
			html = html.concat(signHtml);
		}
		html.push('</svg>');
		return html.join('');
	};

	Svg2Json.prototype.createTextNode = function (data) {
		var d = {
			x: data.x,
			y: data.y + TEXT_SIZE[data.size],
			size: TEXT_SIZE[data.size],
			fill: '#ffffff',
			text: data.text
		};
		var tpl = '<text x="{{x}}" y="{{y}}" font-size="{{size}}px" fill="{{fill}}" stroke="#ffffff 4px round">{{text}}</text>';
		return koala._.render(tpl, d);
	};

	Svg2Json.prototype.createSign = function (data) {
		var type = new Element[data.type];
		return type.getTemplate();
	};

	Svg2Json.prototype.getSVG = function () {
		return this.svg;
	};

	return Svg2Json;

});