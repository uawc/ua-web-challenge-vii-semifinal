define(['jquery', 'backbone', 'underscore', 'extends/historyExtend'],
	function ($, Backbone, _, historyExtend) {
	'use strict';

	/*_.extend(Backbone.history, historyExtend);*/

	return Backbone.Router.extend({

		_baseURL: 'http://www.reddit.com/',

		_homeURL: 'http://www.reddit.com/hot',

		_lastURL:'',

		_defaultSections: ['hot', 'new', 'rising', 'controversial', 'top'],

		routes: {
			"": "basicRoute",
			":section": "sectionRoute",
			"comments/:id": "commentRoute",
			'*path':  'defaultRoute'
		},

		defaultRoute: function () {
			console.log('default');
		},

		_parseURL: function (url) {
			var arrURL,
				pattern = /^\/|\/$/g;

			url = url || '';
			url = url.replace(pattern, '');
			arrURL = url.split('/');

			switch (arrURL.length) {
				case 1:
					// if not empty
					if (!arrURL[0]) {
						url = this._homeURL + '/.json';
						break;
					}
					url = this._baseURL + 'r/' + url + '/.json';
					break;
				case 2:
					if (this._defaultSections.indexOf(arrURL[1]) === -1) {
						url = null;
						break;
					}
					url = this._baseURL + 'r/' + url + '/.json';
					break;
				default :
					url = null;
					break;
			}
			return {url: url, arr: arrURL};
		}
	});
});