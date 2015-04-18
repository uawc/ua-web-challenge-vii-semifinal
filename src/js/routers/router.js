define(['jquery', 'backbone', 'underscore', 'extends/historyExtend'],
	function ($, Backbone, _, historyExtend) {
	'use strict';

	_.extend(Backbone.history, historyExtend);

	return Backbone.Router.extend({
		routes: {
			":section": "defaultRoute",
			":subreddit/:section": "redditRoute"
		},

		defaultRoute: function(section) {
			console.log('section:' + section);
		},

		redditRoute: function(subbredit, section) {
			console.log('subreddit:' + subbredit + ' section:' + section);
		}
	});
});