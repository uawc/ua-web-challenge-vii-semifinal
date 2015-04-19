define(['underscore', 'backbone', 'reddit', 'models/message.model'],
	function (_, Backbone, reddit, RedditModel) {
	'use strict';

		var MessagesCollection =  Backbone.Collection.extend({
			// Reference to this collection's model.
			model: RedditModel,

			parse: function(response) {
				// checking if data is present
				if (!response.data) return;
				// Filtering object
				return response.data.children.map(function(el){
					return _.pick(el.data, 'url', 'title', 'score','author','created_utc','num_comments','subreddit','thumbnail','commentsURL')
				})
			}
		});
		return new MessagesCollection();
});