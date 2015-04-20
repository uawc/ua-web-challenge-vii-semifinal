define(['underscore', 'backbone', 'models/comment.model'],
	function (_, Backbone, CommentModel) {
	'use strict';

		var CommentCollection =  Backbone.Collection.extend({
			// Reference to this collection's model.
			model: CommentModel,

			parse: function(response) {
				// checking if data is present
				if (!response[1].data) return;
				// Filtering object
				return response[1].data.children.map(function(el){
					return _.pick(el.data, 'body', 'replies', 'score','author','created_utc');
				});
			}
		});
		return new CommentCollection();
});