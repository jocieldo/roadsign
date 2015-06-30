app.plugin('dialog', function () {

	function Dialog(title, content, opts) {
		this.opts = opts;
		this.initailize(title, content);
		this.bindEvent();
	}

	koala._.copy(Dialog, koala._.Event);

	Dialog.prototype.initailize = function (title, content) {
		var tpl = "<div class=\"plugin-modal-dialog\">\n	<div class=\"mask\"></div>\n	<div class=\"dialog\">\n		<div class=\"modal-head\">\n			<div class=\"title\"></div><div class=\"close-button\">×</div>\n		</div>\n		<div class=\"modal-body\">\n		</div>\n	</div>\n</div>";
		var wraper = this.wraper = $(tpl).appendTo($('body'));
		this.dialog = wraper.find('.dialog');

		this.dialog.find('.modal-head .title').html(title);
		this.dialog.find('.modal-body').html(content);

		if (this.opts && this.opts.disableClose) {
			this.dialog.find('.close-button').hide();
		}
		this.center();
	};

	Dialog.prototype.setContent = function (content) {
		this.dialog.find('.modal-body').html(content);
		this.center();
	};
	Dialog.prototype.setTitle = function (title) {
		this.dialog.find('.modal-head .title').html(title);
	};

	Dialog.prototype.center = function () {
		var w = this.dialog.width(),
			h = this.dialog.height();
		var l = ($(window).width() - w) / 2;
		var t = ($(window).height() - h) / 2;
		this.dialog.css({
			left: l,
			top: t
		});
	};

	Dialog.prototype.close = function () {
		this.wraper.remove();
	};

	Dialog.prototype.bindEvent = function () {
		var me = this;
		this.dialog.find('.close-button').on('click', function () {
			me.dispatchEvent('close');
			me.close();
		});

		this.dialog.on('mousewheel', function (e) {
			e.prentDefault();
			e.stopPropagation();
		});
	};

	return Dialog;
});