app.plugin('headMenu', 'plugins/json2svg, plugins/dialog', function (Json2svg, Dialog) {

	function HeadMenu(context) {
		this.context = context;

		this.initailize();
	}

	HeadMenu.prototype.initailize = function () {
		var me = this;
		me.filePipe = me.context.pipe('file', function (type, data) {
			if (type == 'data') {
				me.writeJSON(data);
			}
		});

		$('#openFile').on('change', function (e) {
			var files = e.originalEvent.target.files;

			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				if (/\.json$/i.test(file.name)) {
					me.readJSON(file);
				} else if (/\.svg$/i.test(file.name)) {
					me.readSVG(file);
				}
			}
		});

		$('#json-data').on('click', function (e) {
			me.filePipe.set('toJson');
		});
	};

	HeadMenu.prototype.readJSON = function (file) {
		var me = this;
		var reader = new FileReader();
		reader.onload = function (progressEvent) {
			var text = progressEvent.target.result;
			var svg = new Json2svg(JSON.parse(text));

			me.filePipe.set('toSvg', svg.getSVG())
		};
		reader.readAsText(file, 'utf-8');
	};

	HeadMenu.prototype.writeJSON = function (json) {
		var me = this;
		var content = JSON.stringify(json, null, '\t');
		new Dialog('JSON', '<div id="json-editor"></div><div class="json-editor-footer"><a class="btn apply">应用</a><a class="btn save">另存为</a></div>');


		var editor = ace.edit("json-editor");
		editor.setTheme("ace/theme/xcode");
		var JavaScriptMode = require("ace/mode/javascript").Mode;
		editor.getSession().setMode(new JavaScriptMode());
		editor.getSession().setValue(content);


		$('.json-editor-footer .save').on('click', function () {
			var array = new Array();
			array[0] = editor.getSession().getValue();

			var blob = new Blob(array, {
				type: "text/plain;charset=utf-8"
			});
			var url = URL.createObjectURL(blob);
			var link = document.createElement("a");
			link.setAttribute("href", url);
			link.setAttribute("target", '_blank');
			link.setAttribute("download", "svg-" + koala._.md5() + '.json');

			var evt = document.createEvent('MouseEvents');
			evt.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
			link.click();
		});
	};

	HeadMenu.prototype.readSVG = function (file) {};

	return HeadMenu;

});