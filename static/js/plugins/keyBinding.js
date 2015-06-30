app.plugin('keyBinding', function () {

	function KeyBinding(context) {
		this.context = context;
		this.initailize();
	}

	KeyBinding.prototype.initailize = function () {
		var me = this;
		me.keyPipe = me.context.pipe('key');

		$('body').on('keydown', function (e) {
			switch (e.which) {
				case 46: //delete
					me.keyPipe.set('delete');
					break;
				case 37: //left
					me.keyPipe.set('left');
					break;
				case 38: //up
					me.keyPipe.set('up');
					break;
				case 39: //right
					me.keyPipe.set('right');
					break;
				case 40: //down
					me.keyPipe.set('down');
					break;
			}
		});
	};

	return KeyBinding;
});