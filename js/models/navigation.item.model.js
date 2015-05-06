define(['underscore', 'backbone'],
	function (_, Backbone) {
		'use strict';

		return Backbone.Model.extend({
			// Default data of this Model
			defaults: {
				item: '',
				url: '',
				text:'',
				className: ''
			}
		});
	});