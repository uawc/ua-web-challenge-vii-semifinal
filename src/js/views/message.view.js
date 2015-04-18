define([ 'jquery', 'underscore', 'backbone', 'templates'],
	function ($, _, Backbone, templates) {
		'use strict';

		// Our overall **AppView** is the top-level piece of UI.
		return Backbone.View.extend({

			// Instead of generating a new element, bind to the existing skeleton of
			// the App already present in the HTML.
			tagName: 'fieldset',

			className: 'reddit-item',

			// Compile our stats template
			template: templates.message,

			// At initialization we bind to the relevant events on the `Todos`
			// collection, when items are added or changed. Kick things off by
			// loading any preexisting todos that might be saved in *localStorage*.
			initialize: function () {
				this.listenTo(this.model, 'change', this.render);
				this.listenTo(this.model, 'destroy', this.remove);

				this.render();
			},

			// Re-rendering the App just means refreshing the statistics -- the rest
			// of the app doesn't change.
			render: function () {
				this.$el.html(this.template(this.model.toJSON()));
				// returning this for chaining
				return this;
			}
		});
});