define(['underscore', 'backbone', 'reddit', 'models/message.model'],
	function (_, Backbone, reddit, RedditModel) {
	'use strict';

	return Backbone.Collection.extend({
		// Reference to this collection's model.
		model: RedditModel,

		parse: function(response) {
			// checking if data is present
			if (!response.data) return;
			// Filtering object
			return response.data.children.map(function(el){
				return _.pick(el.data, 'url', 'title', 'rating','author','created_utc','comments','subreddit','thumbnail','commentsURL')
			})
		}
	});
});