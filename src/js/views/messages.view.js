define([ 'jquery', 'underscore', 'backbone', 'views/message.view'],
	function ($, _, Backbone, MessageView) {
		'use strict';

		return Backbone.View.extend({

			// Define View element
			tagName: 'div',

			// Initialize messages.view
			initialize: function () {
				this.$wrapper = $('#app-content');

				this.listenTo(this.collection, 'reset', this.remove);
				this.render();
			},

			render: function () {
				this.collection.each(this._renderChild, this);
				this.$wrapper.prepend(this.$el);
				// returning this for chaining
				return this;
			},

			/**
			 * Render for each model
			 * @private
			 * @param child - single model from collection
			 * */
			_renderChild: function(child) {
				var messageView = new MessageView({ model: child });
				this.$el.append(messageView.el);
			}
		});
});