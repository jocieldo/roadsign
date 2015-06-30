app.plugin('svg', 'plugins/element', function (Element) {

	var LEFT = 70,
		TOP = 80;

	function Svg(container, context) {
		this.container = container;
		this.context = context;
		this.initialize();
		this.initRoot();
		this.currentPick = [];
		this.borders = [];
	}
	Svg.prototype.initialize = function () {
		var me = this;

		me.toolPipe = me.context.pipe('tool');
		me.filePipe = me.context.pipe('file', function (cmd, data) {
			if (cmd == 'toSvg') {
				me.setSvg(data);
			} else if (cmd == 'toJson') {
				me.toJson();
			}
		});
		me.pickPipe = me.context.pipe('pick');
		me.context.pipe('propChange', function (id, value) {
			me.update();
		}, 'LEVEL4');
		me.keyPipe = me.context.pipe('key', function (command) {
			me.keyBinding(command);
		});
	};

	Svg.prototype.initRoot = function () {
		var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.setAttribute("version", "1.2");
		svg.setAttribute("baseProfile", "tiny");
		this.container.append(svg);
		this.root = svg;
		this.bindContainerEvent();
	};

	Svg.prototype.bindContainerEvent = function () {
		var me = this;

		me.container.on('click', function (e) {
			//current Tool
			var tool = me.toolPipe.get();
			switch (tool) {
				case 'Select':
					me.pick(e);
					break;
				case 'Text':
					me.createText(e);
					break;
				case 'Rect':
					me.createText(e);
					break;
			}
		});
	};

	Svg.prototype.setSvg = function (svg) {
		this.container.html(svg);
		this.root = this.container.find('svg')[0];
		this.toolPipe.set('Select');
	};

	Svg.prototype.pick = function (e) {
		var me = this;
		if (e.ctrlKey) {
			me.currentPick.push(e.target);
		} else {
			me.currentPick = [e.target];
		}
		me.highlight(me.currentPick);
		me.pickPipe.set(me.currentPick);
	};

	Svg.prototype.createText = function (e) {
		var x = e.pageX - LEFT,
			y = e.pageY - TOP;
		var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
		text.setAttribute("x", x);
		text.setAttribute("y", y);
		text.setAttribute("font-size", "40px");
		text.setAttribute("fill", "#ffffff");
		text.setAttribute("stroke", "#ffffff 4px round");
		text.innerHTML = "text";
		this.root.appendChild(text);
		this.toolPipe.set('Select');
		this.pick({
			target: text
		});
	};

	Svg.prototype.highlight = function (ele) {
		var me = this;
		me.borders.forEach(function (item, i) {
			item.parentNode.removeChild(item);
		});
		me.borders = [];
		ele.forEach(function (item, i) {
			var border = document.createElementNS("http://www.w3.org/2000/svg", "rect");
			me.root.appendChild(border);
			var cbox = item.getBoundingClientRect();
			border.setAttribute('x', cbox.left - LEFT);
			border.setAttribute('y', cbox.top - TOP);
			border.setAttribute('width', cbox.width);
			border.setAttribute('height', cbox.height);
			border.setAttribute('stroke', '#000');
			border.setAttribute('stroke-width', '1px');
			border.setAttribute('fill', 'none');
			me.borders.push(border);
		});
	};

	Svg.prototype.update = function () {
		var me = this;
		me.highlight(me.currentPick);
	};

	Svg.prototype.keyBinding = function (command) {
		var me = this;
		if (!me.currentPick.length) return;

		if (command == 'delete') {
			me.currentPick.forEach(function (item, i) {
				var pn = item.parentNode;
				pn.removeChild(item);
				me.pick({
					target: pn
				});
			});
		}
	};

	Svg.prototype.toJson = function () {
		var me = this;
		var json = {};
		traverse(me.container.get(0));

		function traverse(node) {
			var children = node.children;
			if (children.length > 0) {
				for (var i = 0, len = children.length; i < len; i++) {
					var child = children[i];
					var nodeName = child.tagName.toLowerCase();
					switch (nodeName) {
						case 'g':
							var atype = child.getAttribute('type');
							if (atype) {
								if (atype.substr(0, 1) == 'P') {
									json.type = atype;
								} else {
									if (!json.signs) {
										json.signs = [];
									}
									json.signs.push({
										type: atype
									});
								}
								continue;
							}
							break
						case 'text':
							if (!json.texts) {
								json.texts = [];
							}
							json.texts.push({
								"size": child.getAttribute('font-size'),
								"text": child.innerHTML,
								"x": child.getAttribute('x'),
								"y": child.getAttribute('y')
							});
							break;
					}
					traverse(child);
				}
			}
		}

		me.filePipe.set('data', json);
	};

	return Svg;
});