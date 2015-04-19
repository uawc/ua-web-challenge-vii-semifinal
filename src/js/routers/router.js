define(['jquery', 'backbone', 'underscore', 'extends/historyExtend'],
	function ($, Backbone, _, historyExtend) {
	'use strict';

	/*_.extend(Backbone.history, historyExtend);*/

	return Backbone.Router.extend({
		routes: {
			"": "basicRoute",
			":section": "sectionRoute",
			'*path':  'defaultRoute'
		}
	});
});