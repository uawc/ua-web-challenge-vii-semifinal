define([ 'jquery', 'underscore', 'backbone', 'templates'],
	function ($, _, Backbone, templates) {
		'use strict';

		return Backbone.View.extend({

			// Define View element
			tagName: 'fieldset',

			// Add class name to an element
			className: 'reddit-item',

			// Define message template
			template: templates.message,

			// Initialize message.view
			initialize: function () {
				this.listenTo(this.model, 'change', this.render);
				this.listenTo(this.model, 'destroy', this.remove);

				this.render();
			},

			render: function () {
				this.$el.html(this.template(this.model.toJSON()));
				// returning this for chaining
				return this;
			}
		});
});