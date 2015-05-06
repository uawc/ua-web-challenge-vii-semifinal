define([ 'jquery', 'underscore', 'backbone', 'templates'],
	function ($, _, Backbone, templates) {
		'use strict';

		return Backbone.View.extend({

			// Define View element
			tagName: 'li',

			// Define message template
			template: templates.navigation,

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