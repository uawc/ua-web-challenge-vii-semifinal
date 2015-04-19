define(['jquery', 'reddit', 'backbone', 'routers/router', 'views/app.view'],
	function($, reddit, Backbone, Router, AppView){
		reddit.hot().fetch(function(res) {
			console.log(res);
		});

		var router = new Router();

		var app = new AppView({router: router});

		Backbone.history.start({pushState: true});
	});
