define([ 'jquery', 'underscore', 'backbone', 'collections/message.collection', 'views/messages.view', 'templates'
], function ($, _, Backbone, MessageCollection, MessagesView, templates) {
	'use strict';

	// Our overall **AppView** is the top-level piece of UI.
	return Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: '#app-root',

		// Compile our stats template
		template: templates,

		// Delegated events for creating new items, and clearing completed ones.
		events: {

		},

		// At initialization we bind to the relevant events on the `Todos`
		// collection, when items are added or changed. Kick things off by
		// loading any preexisting todos that might be saved in *localStorage*.
		initialize: function () {

			var messages = new MessageCollection();

			messages.fetch({url: 'http://www.reddit.com/hot.json', success: this.render});
		},

		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render: function (collection, response, options) {
			var messagesView = new MessagesView({collection: collection});
		}
	});
});