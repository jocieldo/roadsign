app.plugin('context', function () {

	var LEVEL = {
		'LEVEL10': 10,
		'LEVEL9': 9,
		'LEVEL8': 8,
		'LEVEL7': 7,
		'LEVEL6': 6,
		'LEVEL5': 5,
		'LEVEL4': 4,
		'LEVEL3': 3,
		'LEVEL2': 2,
		'LEVEL1': 1,
		'LEVEL0': 0
	};

	function Context() {
		this.current = {};
		this.cache = {};

		this.pipes = {};
		this.pipeStack = {};
	}

	Context.prototype.pipe = function (key, func, level) {
		var me = this;
		if (!me.pipes[key]) {
			me.pipes[key] = [];
			// Object.defineProperty(me.pipeStack, key, {set: function (value) {
			// 	this[key] = value;
			// }});
		}
		var p = me.pipes[key];
		func && p.push({
			func: func,
			level: level || 'LEVEL5'
		});

		p.sort(function (i1, i2) {
			return LEVEL[i2.level] - LEVEL[i1.level];
		});

		return {
			set: function (value) {
				var args = arguments;
				me.pipeStack[key] = value;
				p.forEach(function (item, i) {
					if (item.func !== func) {
						item.func.apply(me, args);
					}
				});
			},
			get: function () {
				return me.pipeStack[key];
			}
		};
	};

	Context.prototype.getCurrent = function (key) {
		return this.current[key];
	};

	Context.prototype.setCurrent = function (key, value) {
		this.current[key] = value;
		return this;
	};

	Context.prototype.getCurrentTool = function (key) {
		return this.currentTool;
	};

	Context.prototype.setCurrentTool = function (tool) {
		this.currentTool = tool;
		this.dispatchEvent('setTool', this.currentTool);
		return this;
	};

	Context.prototype.dispatch = function () {
		this.dispatchEvent.apply(this, arguments)
		return this;
	};

	return Context;
});