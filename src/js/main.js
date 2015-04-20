define(['jquery', 'backbone', 'routers/router', 'views/app.view'],
	function($, Backbone, Router, AppView){
		var router,
			app;

		if (navigator.serviceWorker) {
			navigator.serviceWorker.register('/sw.js', {
				// The scope cannot be parent to the script url
				scope: '/'
			}).then(function(registration) {
				// Registration was successful
				console.log(registration);
			}).catch(function(err) {
				// registration failed :(
				console.log('ServiceWorker registration failed: ', err);
			});

			/*navigator.serviceWorker.getRegistration().then(function(reg) {
				console.log(req);
			});*/
		}

		router = new Router();

		app = new AppView({router: router});

		Backbone.history.start({pushState: true});
	});
