define([ 'jquery', 'underscore', 'backbone', 'views/message.view'],
	function ($, _, Backbone, MessageView) {
		'use strict';

		// Our overall **AppView** is the top-level piece of UI.
		return Backbone.View.extend({

			// Instead of generating a new element, bind to the existing skeleton of
			// the App already present in the HTML.
			el: '#app-content',

			// At initialization we bind to the relevant events on the `Todos`
			// collection, when items are added or changed. Kick things off by
			// loading any preexisting todos that might be saved in *localStorage*.
			initialize: function () {
				this.render();
			},

			// Re-rendering the App just means refreshing the statistics -- the rest
			// of the app doesn't change.
			render: function () {
				this.collection.each(this._renderChild, this);
				// returning this for chaining
				return this;
			},

			_renderChild: function(child) {
				var messageView = new MessageView({ model: child });
				this.$el.append(messageView.el);
			}
		});
});