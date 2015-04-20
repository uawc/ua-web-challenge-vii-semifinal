define(['underscore', 'backbone', 'models/navigation.item.model'],
	function (_, Backbone, NavModel) {
		'use strict';

		var NavigationCollection =  Backbone.Collection.extend({
			// Reference to this collection's model.
			model: NavModel,

			fetch: function() {
				// reset with default data
				this.reset([
					{
						"item": "hot",
						"url": "/hot",
						"text": "hot",
						"className": "active"
					},
					{
						"item": "new",
						"url": "/new",
						"text": "new",
						"className": ""
					},
					{
						"item": "rising",
						"url": "/rising",
						"text": "rising",
						"className": ""
					},
					{
						"item": "controversial",
						"url": "/controversial",
						"text": "controversial",
						"className": ""
					},
					{
						"item": "top",
						"url": "/top",
						"text": "top",
						"className": ""
					}
				]);
			}
		});

		return new NavigationCollection();
	});