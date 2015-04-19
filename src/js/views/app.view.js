define(['jquery', 'underscore', 'backbone', 'collections/message.collection', 'collections/navigation.collection', 'views/messages.view', 'views/navigation.view', 'templates'
], function ($, _, Backbone, messageCollection, navigationCollection, MessagesView, NavigationView, templates) {
	'use strict';

	// Our overall **AppView** is the top-level piece of UI.
	return Backbone.View.extend({

		_baseURL: 'http://www.reddit.com/',

		_homeURL: 'http://www.reddit.com/hot',

		_defaultSections: ['hot', 'new', 'rising', 'controversial', 'top'],

		// Define View element
		el: '#app-root',

		// Define message template
		template: templates,

		// Delegated events for creating new items, and clearing completed ones.
		events: {
			'click a.no-refresh': '_customNavigate'
		},

		// Initialize app.view
		initialize: function (options) {
			this._router = options.router;

			this.listenTo(this._router, 'route:sectionRoute', this._sectionRoute);
			this.listenTo(this._router, 'route:basicRoute', this._basicRoute);
			this.listenTo(this._router, 'route:defaultRoute', function () {console.log('default')});

			navigationCollection.fetch({reset: true, success: this._renderNavigation});
		},

		render: function (url) {
			messageCollection.fetch({reset: true, url: url, success: this._renderMessages});
			return this;
		},

		_renderMessages: function (collection, response, options) {
			new MessagesView({collection: collection});
		},

		_renderNavigation: function (collection, response, options) {
			new NavigationView({collection: collection});
		},

		_customNavigate: function (e) {
			var $el = $(e.currentTarget);
			e.preventDefault();

			this._router.navigate($el.attr('href'), {trigger: true});
		},

		_sectionRoute: function (url) {
			console.log(url);
			if (this._defaultSections.indexOf(url) !== -1) {
				this.render(this._baseURL + url + '/.json');
				return;
			}
			console.log('No such page')
		},

		_basicRoute: function (url) {
			console.log(url);
			url = this._parseURL(url);

			if (url) {
				this.render(url);
				return;
			}

			console.log('No such page')
		},

		_parseURL: function (url) {
			var arrURL;

			url = url || '';
			url = url.indexOf('/') == 0 ? url.slice(1) : url;
			arrURL = url.split('/');

			switch(arrURL.length) {
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
			return url;
		}
	});
});