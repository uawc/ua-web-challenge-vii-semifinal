define([ 'jquery', 'underscore', 'backbone', 'views/navigation.item.view'],
	function ($, _, Backbone, NavView) {
		'use strict';

		return Backbone.View.extend({

			// Define View element
			tagName: 'ul',

			// Initialize message.view
			initialize: function () {
				this.$wrapper = $('#main-navigation');

				this.listenTo(this.collection, 'reset', this.remove);

				this.render().$el.appendTo(this.$wrapper);
			},

			render: function () {
				this.collection.each(this._renderChild, this);
				// returning this for chaining
				return this;
			},

			/**
			 * Render for each model
			 * @private
			 * @param child - single model from collection
			 * */
			_renderChild: function(child) {
				var navView = new NavView({ model: child });
				this.$el.append(navView.el);
			}
		});
	});