define(['jquery', 'underscore', 'backbone', 'collections/message.collection', 'collections/navigation.collection', 'collections/comment.collection', 'views/messages.view', 'views/comments.view', 'views/navigation.view', 'templates'
], function ($, _, Backbone, messageCollection, navigationCollection, commentCollection, MessagesView, CommentsView, NavigationView, templates) {
	'use strict';

	// Main App View
	return Backbone.View.extend({

		// count for pagination request
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
			this.$pagination = $('.pagination');

			this.listenTo(this._router, 'route:sectionRoute', this._sectionRoute);
			this.listenTo(this._router, 'route:basicRoute', this._basicRoute);
			this.listenTo(this._router, 'route:commentRoute', this._commentRoute);

			navigationCollection.fetch();
			this.navigationView = new NavigationView({collection: navigationCollection});
		},

		/**
		 * Main Render of App
		 * @public
		 * @param url - {string}
		 * @param data - {object}
		 * */
		render: function (url, data) {
			messageCollection.fetch({reset: true, data: data || {}, url: url, error: this._requestError, success: this._renderMessages.bind(this)});

			return this;
		},

		/**
		 * Message render
		 * @private
		 * @param collection - {object}
		 * @param response - {object}
		 * @param options - {object}
		 * */
		_renderMessages: function (collection, response, options) {
			if (this.commentsView) commentCollection.reset();
			this.$pagination.show();
			this.messageView = new MessagesView({collection: collection});
		},

		/**
		 * Comments render
		 * @private
		 * @param collection - {object}
		 * @param response - {object}
		 * @param options - {object}
		 * */
		_renderComments: function (collection, response, options) {
			if (this.messageWiew) messageCollection.reset();
			this.$pagination.hide();
			this.commentsView = new CommentsView({collection: collection});
		},

		/**
		 * Request Error handling
		 * * @private
		 * */
		_requestError: function() {
			this._router.navigate('/');
			console.error('Request error');
		},

		/**
		 * handling link clicking through router.navigate
		 * @private
		 * */
		_customNavigate: function (e) {
			var $el = $(e.currentTarget);
			e.preventDefault();

			this._router.navigate($el.attr('href'), {trigger: true});
		},

		/**
		 * Behavior in case navigation was changed
		 * @private
		 * @param url - {string}
		 * */
		_sectionRoute: function (url) {

			if (this._router._defaultSections.indexOf(url) !== -1) {
				this._router._lastURL = this._router._baseURL + url + '/.json';
				this.render(this._router._lastURL);
				this.navigationView.toggleClass(url);
				return;
			}

			this._router.navigate('/');
		},

		/**
		 * Behavior for home page and subreddit
		 * @private
		 * @param url - {string}
		 * */
		_basicRoute: function (url) {
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

			this._router.navigate('/');
		},

		/**
		 * Behavior for comments page
		 * @private
		 * @param id - {string}
		 * */
		_commentRoute: function(id) {
			var url = this._router._baseURL + 'comments/' + id + '/.json';

			commentCollection.fetch({reset: true, url: url, error: this._requestError, success: this._renderComments.bind(this)});
		},

		/**
		 * Handling Next clicking at pagination
		 * @private
		 * */
		_onPaginationNextClick: function() {
			var after = messageCollection.first().get('after');

			this._count = this._count % 5 == 1 ? this._count - 1 : this._count + 25;

			this.render(this._router._lastURL, {after: after, count: this._count});
		},

		/**
		 * Handling Prev clicking at pagination
		 * @private
		 * */
		_onPaginationPrevClick: function() {
			var before = messageCollection.first().get('before');

			if (before) {
				this._count = this._count % 5 == 1 ? this._count - 25 : this._count + 1;

				this.render(this._router._lastURL, {before: before, count: this._count});
			}
		}
	});
});