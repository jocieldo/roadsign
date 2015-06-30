app.plugin('json2svg', 'plugins/element', function (Element) {

	var TEXT_SIZE = {
		"1": 70,
		"2": 50,
		"3": 30
	};
	var WIDTH = 800,
		HEIGHT = 400;

	function Json2svg(data) {
		this.data = data;
		this.svg = this.initailize(data);
	}

	Json2svg.prototype.initailize = function (svg) {
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

	Json2svg.prototype.createTextNode = function (data) {
		var fz = TEXT_SIZE[data.size] || data.size;
		if (typeof (fz) == 'string') {
			fz = fz.replace('px', '');
		}
		fz = parseInt(fz);
		var d = {
			x: data.x,
			y: parseInt(data.y),
			size: fz,
			fill: '#ffffff',
			text: data.text
		};
		var tpl = '<text x="{{x}}" y="{{y}}" font-size="{{size}}px" fill="{{fill}}" stroke="#ffffff 4px round">{{text}}</text>';
		return koala._.render(tpl, d);
	};

	Json2svg.prototype.createSign = function (data) {
		var type = new Element[data.type];
		return type.getTemplate();
	};

	Json2svg.prototype.getSVG = function () {
		return this.svg;
	};

	return Json2svg;

});