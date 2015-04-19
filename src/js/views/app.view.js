define(['jquery', 'underscore', 'backbone', 'collections/message.collection', 'collections/navigation.collection', 'views/messages.view', 'views/navigation.view', 'templates'
], function ($, _, Backbone, messageCollection, navigationCollection, MessagesView, NavigationView, templates) {
	'use strict';

	// Our overall **AppView** is the top-level piece of UI.
	return Backbone.View.extend({

		_count: 0,

		// Define View element
		el: '#app-root',

		// Define message template
		template: templates,

		// Delegated events for creating new items, and clearing completed ones.
		events: {
			'click a.no-refresh': '_customNavigate',
			'click .pagination .btn.next': '_onPaginationNextClick',
			'click .pagination .btn.prev': '_onPaginationPrevClick'
		},

		// Initialize app.view
		initialize: function (options) {
			this._router = options.router;

			this.listenTo(this._router, 'route:sectionRoute', this._sectionRoute);
			this.listenTo(this._router, 'route:basicRoute', this._basicRoute);
			this.listenTo(this._router, 'route:defaultRoute', function () {
				console.log('default')
			});

			navigationCollection.fetch();
			this.navigationView = new NavigationView({collection: navigationCollection});
		},

		render: function (url, data) {
			data = data || {};

			messageCollection.fetch({reset: true, data: data, url: url, error: this._messageError, success: this._renderMessages.bind(this)});
			return this;
		},

		_renderMessages: function (collection, response, options) {
			this.messageView = new MessagesView({collection: collection});
		},

		_messageError: function() {
			console.log('No such page');
		},

		_customNavigate: function (e) {
			var $el = $(e.currentTarget);
			e.preventDefault();

			this._router.navigate($el.attr('href'), {trigger: true});
		},

		_sectionRoute: function (url) {
			console.log(url);
			if (this._router._defaultSections.indexOf(url) !== -1) {
				this._router._lastURL = this._router._baseURL + url + '/.json';
				this.render(this._router._lastURL);
				this.navigationView.toggleClass(url);
				return;
			}
			console.log('No such page')
		},

		_basicRoute: function (url) {
			console.log(url);
			var data = this._router._parseURL(url);

			if (data.url) {

				if (data.arr[0]) {
					this.navigationView.updateURL(data.arr[0]).toggleClass(data.arr[1] || 'hot');
				} else {
					this.navigationView.updateURL().toggleClass(data.arr[1] || 'hot');
				}

				this.render(data.url);
				this._router._lastURL = data.url;
				return;
			}

			console.log('No such page')
		},

		_onPaginationNextClick: function() {
			var after = messageCollection.first().get('after');

			this._count = this._count % 5 == 1 ? this._count - 1 : this._count + 25;

			this.render(this._router._lastURL, {after: after, count: this._count});
		},

		_onPaginationPrevClick: function() {
			var before = messageCollection.first().get('before');

			if (before) {
				this._count = this._count % 5 == 1 ? this._count - 25 : this._count + 1;

				this.render(this._router._lastURL, {before: before, count: this._count});
			}
		}
	});
});