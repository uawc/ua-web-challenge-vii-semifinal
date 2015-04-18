define(['jquery', 'reddit', 'backbone', 'routers/router', 'views/app.view'],
	function($, reddit, Backbone, Router, AppView){
		reddit.hot().fetch(function(res) {
			console.log(res);
		});

		var router = new Router();
		Backbone.history.start();

		var app = new AppView();
	});
