app.controller('IndexController',
	'plugins/context,  plugins/layoutManager, plugins/currentItem, plugins/svg, plugins/headMenu, plugins/keyBinding',
	function (Context, LayoutManager, CurrentItem, Svg, HeadMenu, KeyBinding) {
		var scope = this;

		var editor = $('#editor').height($(window).height() - 90);

		var context = new Context();
		new KeyBinding(context);
		var svg = new Svg(editor, context);
		var layout = new LayoutManager(context);
		var ci = new CurrentItem(context);
		var menu = new HeadMenu(context);

	});