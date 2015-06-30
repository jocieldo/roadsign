app.plugin('alignment', function () {
	var WIDTH = 800,
		HEIGHT = 400;


	function Alignment(context) {
		this.context = context;
		this.initailize();
	}

	Alignment.prototype.initailize = function () {};

	Alignment.prototype.align = function (eles, direction) {
		swtich(direction) {
			case 'center':

				break;
			case 'middle':
				break;
			case 'left':
				break;
			case 'right':
				break;
			case 'top':
				break;
			case 'bottom':
				break;
		}
	};

	Alignment.prototype.alignLeft = function (eles) {
		if (!eles) return;

		if (eles.length > 1) {
			var box = eles.getBBox();
			var w = (WIDTH - box.width) / 2;
			var h = (HEIGHT - box.height) / 2;

		} else {
			eles.forEach(function (item, i) {
				item
			});
		}


	});

return Alignment;
});