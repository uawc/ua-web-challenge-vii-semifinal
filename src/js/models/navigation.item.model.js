define(['underscore', 'backbone'],
	function (_, Backbone) {
		'use strict';

		return Backbone.Model.extend({
			// Default data of this Model
			defaults: {
				url: '',
				text:'',
				className: ''
			}
		});
	});