app.plugin('currentItem', function () {

	var WIDTH = 800,
		HEIGHT = 400;


	function CurrentItem(context) {
		this.context = context;
		this.initailize();
	}

	CurrentItem.prototype.initailize = function () {
		var me = this;
		me.info = $('#curTarget');
		me.props = {};

		me.info.html('<span class="name"></span>属性：<span class="property"></span>对齐：<span class="align"></span>');

		me.toolPipe = me.context.pipe('tool', function (tool) {
			me.updateTool(tool);
		});
		me.pickPipe = me.context.pipe('pick', function (ele) {
			me.updateElement(ele);
		});
		me.propPipe = me.context.pipe('propPanel');
		me.changePipe = me.context.pipe('propChange', function (id, value) {
			me.updateProperty(id, value);
		});
		me.keyPipe = me.context.pipe('key', function (command) {
			me.keyBinding(command);
		});

		me.bindToolEvent();
	};

	CurrentItem.prototype.bindToolEvent = function () {
		var me = this;
		//对齐
		me.info.find('.align').delegate('i', 'click', function (e) {
			var tar = $(e.target);
			if (tar.hasClass('align-center')) {
				me.alignCenter(me.ele);
			} else if (tar.hasClass('align-middle')) {
				me.alignMiddle(me.ele);
			} else if (tar.hasClass('align-top')) {
				me.alignTop(me.ele);
			} else if (tar.hasClass('align-bottom')) {
				me.alignBottom(me.ele);
			} else if (tar.hasClass('align-left')) {
				me.alignLeft(me.ele);
			} else if (tar.hasClass('align-right')) {
				me.alignRight(me.ele);
			}
			me.changePipe.set();
		});
	};

	CurrentItem.prototype.updateTool = function (tool) {
		var me = this;
		me.info.find('.name').text(tool);
	};

	CurrentItem.prototype.updateElement = function (ele) {
		var me = this;
		me.ele = ele;
		me.props = {};
		if (me.ele.length > 1) {
			me.info.find('.name').text(me.ele.length + '项');
			me.info.find('.align').html("<i class=\"icon-align-horizontal-middle align-center\"></i>\n<i class=\"icon-align-vertical-middle align-middle\"></i>\n<i class=\"icon-align-top align-top\"></i>\n<i class=\"icon-align-bottom align-bottom\"></i>\n<i class=\"icon-align-left align-left\"></i>\n<i class=\"icon-align-right align-right\"></i>\n");
		} else {
			me.info.find('.name').text(me.ele[0].tagName);
			me.info.find('.align').html("<i class=\"icon-align-horizontal-middle align-center\"></i>\n<i class=\"icon-align-vertical-middle align-middle\"></i>");
		}
		me.buildInfo();
		me.buildProperty();
		me.bindEvent();
	};

	CurrentItem.prototype.buildInfo = function () {
		var me = this;
		if (!me.ele) return;

		var pp = me.info.find('.property');
		if (me.ele.length == 1) {
			var ele = me.ele[0];
			var box = ele.getBBox();
			var tpl = '<p>x:{{x}}</p><p>y:{{y}}</p><p>宽:{{width}}</p><p>高:{{height}}</p>';
			pp.html(koala._.render(tpl, box));
		} else {
			pp.html('');
		}
	};

	CurrentItem.prototype.buildProperty = function () {
		var me = this;
		if (!me.ele) return;
		if (me.ele.length == 1) {
			var ele = me.ele[0];
			var attrs = ele.attributes,
				tagName = ele.tagName.toLowerCase();
			var htmls = [];
			var tpl = '<p><span>{{text}}</span><input type="text" id="{{id}}" value="{{val}}"/></p>';
			var xflag, yflag;
			for (var i = 0; i < attrs.length; i++) {
				var attr = attrs[i];
				var id = koala._.md5();
				me.props[id] = attr.name;
				attr.name == 'x' && (xflag = true);
				attr.name == 'y' && (yflag = true);
				htmls.push(koala._.render(tpl, {
					text: attr.name,
					id: id,
					val: attr.value
				}));
			}
			var pos = me.getPositonProperty(ele);
			!xflag && addProperty('x', pos[0]);
			!yflag && addProperty('y', pos[1]);

			if (tagName == 'text') {
				addProperty('text', ele.innerHTML);
			}

			function addProperty(p, val) {
				if (typeof (val) == 'string') {
					val = val.trim();
				}
				var id = koala._.md5();
				me.props[id] = p;
				htmls.push(koala._.render(tpl, {
					text: p,
					id: id,
					val: val
				}));
			}
			me.propPipe.set(htmls.join(''))
		} else {
			me.propPipe.set('');
		}
	};

	CurrentItem.prototype.bindEvent = function () {
		var me = this;
		if (!me.ele) return;

		var tool = me.toolPipe.get();
		me.ele.forEach(function (ele, i) {
			$(ele).off('mousedown').on('mousedown', function (e) {
				if (!ele.getAttribute('isRoot') && tool == 'Select') {
					me.canDrag = true;
					me.dragStart = {
						x: e.pageX,
						y: e.pageY
					};
					$('#editor').css('cursor', 'move');
				}
			});
		});

		$('body').off('mouseup', bodyMouseUp).on('mouseup', bodyMouseUp);
		$('body').off('mousemove', bodyMouseMove).on('mousemove', bodyMouseMove);

		function bodyMouseUp(e) {
			if (me.canDrag) {
				me.canDrag = false;
				$('#editor').css('cursor', 'default');
			}
		}

		function bodyMouseMove(e) {
			if (me.canDrag) {
				me._moveHandler && clearTimeout(me._moveHandler);
				me._moveHandler = setTimeout(function () {
					var offsetX = e.pageX - me.dragStart.x;
					var offsetY = e.pageY - me.dragStart.y;
					me.ele.forEach(function (item, i) {
						var pos = me.getPositonProperty(item);
						me.setPositonProperty(item, pos[0] - 0 + offsetX, pos[1] - 0 + offsetY);
					});
					me.dragStart.x = e.pageX;
					me.dragStart.y = e.pageY;
				}, 50);

				e.preventDefault();
			}
		}
	}

	CurrentItem.prototype.updateProperty = function (id, value) {
		var me = this;
		if (!me.ele) return;
		if (me.ele.length == 1) {
			var ele = me.ele[0];
			var tagName = ele.tagName.toLowerCase();
			switch (tagName) {
				case 'text':
					me.setTextProperty(ele, id, value);
					break;
				case 'polygon':
					me.setPolygonProperty(ele, id, value);
					break;
				default:
					var attr = me.props[id];
					ele.setAttribute(attr, value);
					break;
			}
		}
	};

	CurrentItem.prototype.setTextProperty = function (ele, id, value) {
		var me = this,
			attr = me.props[id];
		if (!ele) return;
		var ele = me.ele[0];
		if (attr == 'text') {
			ele.innerHTML = value;
		} else {
			ele.setAttribute(attr, value);
		}
	};

	CurrentItem.prototype.setPolygonProperty = function (ele, id, value) {
		var me = this,
			attr = me.props[id];
		if (!ele) return;

		if (attr == 'x' || attr == 'y') {
			var cur = ele.parentNode;
			while (cur.tagName.toLowerCase() != 'svg') {
				if (cur.tagName.toLowerCase() == 'g' && cur.getAttribute('type')) {
					var trans = cur.getAttribute('transform') || '';
					if (trans.indexOf('translate') != -1) {
						trans = trans.replace(/\s*translate\s*\((.*?)\)/, function (s0, s1) {
							var xy = s1.split(',');
							attr == 'x' && (xy[0] = value);
							attr == 'y' && (xy[1] = value);
							return 'translate(' + xy.join(',') + ') ';
						});
						cur.setAttribute('transform', trans);
					} else {
						var xy = [0, 0];
						attr == 'x' && (xy[0] = value);
						attr == 'y' && (xy[1] = value);
						cur.setAttribute('transform', trans + ' translate(' + xy.join(',') + ')');
					}
					break;
				} else {
					cur = cur.parentNode;
				}
			}
		} else {
			ele.setAttribute(attr, value);
		}
	};


	CurrentItem.prototype.getPositonProperty = function (ele) {
		var me = this;
		if (!ele) return;

		var tagName = ele.tagName.toLowerCase();
		switch (tagName) {
			case 'polygon':
				var cur = ele;
				while (cur.tagName.toLowerCase() != 'svg') {
					if (cur.tagName.toLowerCase() == 'g' && cur.getAttribute('type')) {
						var trans = cur.getAttribute('transform') || '';
						if (trans.indexOf('translate') != -1) {
							var group = trans.match(/\s*translate\s*\((.*?)\)/);
							var xys = group[1].split(',');
							return [parseInt(xys[0]), parseInt(xys[1])];
						} else {
							return [0, 0];
						}
						break;
					} else {
						cur = cur.parentNode;
					}
				}
				break;
			default:
				return [parseInt(ele.getAttribute('x')), parseInt(ele.getAttribute('y'))];
				break;
		}
	};

	CurrentItem.prototype.setPositonProperty = function (ele, x, y) {
		var me = this;
		if (!ele) return;

		var tagName = ele.tagName.toLowerCase();
		switch (tagName) {
			case 'polygon':
				var cur = ele.parentNode;
				while (cur.tagName.toLowerCase() != 'svg') {
					if (cur.tagName.toLowerCase() == 'g' && cur.getAttribute('type')) {
						var trans = cur.getAttribute('transform') || '';
						if (trans.indexOf('translate') != -1) {
							trans = trans.replace(/\s*translate\s*\((.*?)\)/, function (s0, s1) {
								var xy = s1.split(',');
								xy[0] = x;
								xy[1] = y;
								return 'translate(' + xy.join(',') + ') ';
							});
							cur.setAttribute('transform', trans);
						} else {
							var xy = [x, y];
							cur.setAttribute('transform', trans + ' translate(' + xy.join(',') + ')');
						}
						break;
					} else {
						cur = cur.parentNode;
					}
				}
				break;
			default:
				ele.setAttribute('x', x);
				ele.setAttribute('y', y);
				break;
		}
	};

	CurrentItem.prototype.keyBinding = function (command) {
		var me = this;
		if (!me.ele) return;

		if (command == 'left') {
			me.ele.forEach(function (item, i) {
				var pos = me.getPositonProperty(item);
				pos[0] -= 1;
				me.setPositonProperty(item, pos[0], pos[1]);
				me.buildProperty();
			});
			me.changePipe.set();
			return;
		}
		if (command == 'right') {
			me.ele.forEach(function (item, i) {
				var pos = me.getPositonProperty(item);
				pos[0] = parseInt(pos[0]) + 1;
				me.setPositonProperty(item, pos[0], pos[1]);
				me.buildProperty();
			});
			me.changePipe.set();
			return;
		}
		if (command == 'up') {
			me.ele.forEach(function (item, i) {
				var pos = me.getPositonProperty(item);
				pos[1] -= 1;
				me.setPositonProperty(item, pos[0], pos[1]);
				me.buildProperty();
			});
			me.changePipe.set();
			return;
		}
		if (command == 'down') {
			me.ele.forEach(function (item, i) {
				var pos = me.getPositonProperty(item);
				pos[1] = parseInt(pos[1]) + 1;
				me.setPositonProperty(item, pos[0], pos[1]);
				me.buildProperty();
			});
			me.changePipe.set();
			return;
		}

	};

	CurrentItem.prototype.alignLeft = function (eles) {
		var me = this;
		if (!eles) return;
		if (eles.length > 1) {
			var pos = me.getPositonProperty(eles[0]);
			eles.forEach(function (item, i) {
				if (i > 0) {
					var p = me.getPositonProperty(item);
					me.setPositonProperty(item, pos[0], p[1]);
				}
			});
		}
	};

	CurrentItem.prototype.alignRight = function (eles) {
		var me = this;
		if (!eles) return;
		if (eles.length > 1) {
			var pos = me.getPositonProperty(eles[0]);
			var box = eles[0].getBoundingClientRect();
			var x = pos[0] + box.width;
			eles.forEach(function (item, i) {
				if (i > 0) {
					var p = me.getPositonProperty(item);
					var b = item.getBoundingClientRect();
					me.setPositonProperty(item, x - b.width, p[1]);
				}
			});
		}
	};
	CurrentItem.prototype.alignTop = function (eles) {
		var me = this;
		if (!eles) return;
		if (eles.length > 1) {
			var pos = me.getPositonProperty(eles[0]);
			var box = eles[0].getBoundingClientRect();
			var y = pos[1] + box.height;
			eles.forEach(function (item, i) {
				if (i > 0) {
					var p = me.getPositonProperty(item);
					var b = item.getBoundingClientRect();
					me.setPositonProperty(item, p[0], y - b.height);
				}
			});
		}
	};
	CurrentItem.prototype.alignBottom = function (eles) {
		var me = this;
		if (!eles) return;
		if (eles.length > 1) {
			var pos = me.getPositonProperty(eles[0]);
			eles.forEach(function (item, i) {
				if (i > 0) {
					var p = me.getPositonProperty(item);
					me.setPositonProperty(item, p[0], pos[1]);
				}
			});
		}
	};
	CurrentItem.prototype.alignCenter = function (eles) {
		var me = this;
		if (!eles) return;
		if (eles.length == 1) {
			var ele = eles[0];
			var pos = me.getPositonProperty(ele);
			var bound = ele.getBoundingClientRect();
			var x = Math.round((WIDTH - bound.width) / 2);
			me.setPositonProperty(ele, x, pos[1]);
		} else {
			//找出最宽的元素
			var wi = 0;
			var we = eles[0].getBBox();
			eles.forEach(function (item, i) {
				var box = item.getBBox();
				if (box.width > we.width) {
					wi = i;
				}
			});
			var box = eles[wi].getBBox();
			var x = box.x + box.width / 2;
			eles.forEach(function (item, i) {
				if (i != wi) {
					var p = me.getPositonProperty(item);
					var b = item.getBoundingClientRect();
					me.setPositonProperty(item, x - b.width / 2, p[1]);
				}
			});
		}
	};
	CurrentItem.prototype.alignMiddle = function (eles) {
		var me = this;
		if (!eles) return;
		if (eles.length == 1) {
			var ele = eles[0];
			var pos = me.getPositonProperty(ele);
			var box = ele.getBoundingClientRect();
			var y = (HEIGHT - box.height) / 2;
			me.setPositonProperty(ele, pos[0], y);
		} else {
			//找出最宽的元素
			var hi = 0;
			var he = eles[0].getBBox();
			eles.forEach(function (item, i) {
				var box = item.getBBox();
				if (box.height > he.height) {
					hi = i;
				}
			});
			var y = box.y;
			eles.forEach(function (item, i) {
				if (i != hi) {
					var p = me.getPositonProperty(item);
					me.setPositonProperty(item, p[0], y);
				}
			});
		}
	};


	return CurrentItem;
});