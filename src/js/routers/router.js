define(['jquery', 'backbone'],
	function ($, Backbone) {
	'use strict';

	/*_.extend(Backbone.history, historyExtend);*/

	return Backbone.Router.extend({
		// Base Reddit URL
		_baseURL: 'http://www.reddit.com/',

		//Default URL for home page
		_homeURL: 'http://www.reddit.com/hot',

		// Last Visited URL
		_lastURL:'',

		// Default sections
		_defaultSections: ['hot', 'new', 'rising', 'controversial', 'top'],

		routes: {
			"": "basicRoute",
			":section": "sectionRoute",
			"comments/:id": "commentRoute",
			'*path':  'defaultRoute'
		},

		defaultRoute: function () {
			this.navigate('/');
		},

		/**
		 * Parse URL for subreddit page
		 * @private
		 * @param url - {string}
		 * @return {object}
		 * */
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