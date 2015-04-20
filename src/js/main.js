define(['jquery', 'backbone', 'routers/router', 'views/app.view'],
	function($, Backbone, Router, AppView){
		var router = new Router(),
			app = new AppView({router: router});

		Backbone.history.start({pushState: true});
	});
