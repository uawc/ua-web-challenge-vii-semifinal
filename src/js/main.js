define(['jquery', 'backbone', 'sw/sw.module', 'routers/router', 'views/app.view'],
	function($, Backbone, serviceWorker, Router, AppView){
		var router,
			app;

		// initialization of Service Worker
		serviceWorker.init();

		router = new Router();

		app = new AppView({router: router});

		Backbone.history.start({pushState: true});
	});
