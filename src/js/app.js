(function(window){

	var app = window.app = koala.module('zdh');
	
	var ROUTER = {
		'/': {
			controller: 'IndexController',
			template: 'views/index.html'
		}
	};

	app.config({
		base: '/roadsign/static/js/',
		router: ROUTER,
		view: 'view'
	});

})(window);
