define(['underscore', 'backbone', 'models/navigation.item.model'],
	function (_, Backbone, NavModel) {
		'use strict';

		var NavigationCollection =  Backbone.Collection.extend({
			// Reference to this collection's model.
			url:'/navigation.json',

			model: NavModel
		});

		return new NavigationCollection();
	});