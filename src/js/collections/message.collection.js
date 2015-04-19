define(['underscore', 'backbone', 'reddit', 'models/message.model'],
	function (_, Backbone, reddit, RedditModel) {
	'use strict';

		var MessagesCollection =  Backbone.Collection.extend({
			// Reference to this collection's model.
			model: RedditModel,

			parse: function(response) {
				var data;
				// checking if data is present
				if (!response.data) return;
				// Filtering object
				return response.data.children.map(function(el){
					data = _.pick(el.data, 'name', 'url', 'title', 'score','author','created_utc','num_comments','subreddit','thumbnail','commentsURL');
					data.after = response.data.after;
					data.before = response.data.before;

					return data;
				});
			}
		});
		return new MessagesCollection();
});