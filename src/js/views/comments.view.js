define([ 'jquery', 'underscore', 'backbone', 'views/comment.view', 'models/comment.model'],
	function ($, _, Backbone, CommentView, CommentModel) {
		'use strict';

		return Backbone.View.extend({

			// Define View element
			tagName: 'div',

			// Initialize messages.view
			initialize: function () {
				this.$wrapper = $('#app-content');

				this.listenTo(this.collection, 'reset', this.remove);
				this.render();
			},

			render: function () {
				this.collection.each(this._renderChild, this);
				this.$wrapper.prepend(this.$el);
				// returning this for chaining
				return this;
			},

			/**
			 * Render for each model
			 * @private
			 * @param child - single model from collection
			 * */
			_renderChild: function(child) {
				var replies = child.get('replies'),
					commentView = new CommentView({ model: child });

				if (replies) {
					this._addSubComments(replies.data.children, commentView.$el);
				}

				this.$el.append(commentView.el);
			},

			/**
			 * Add sub-comments for main comment
			 * @private
			 * @param data {object}
			 * @param $el {selector}
			 * */
			_addSubComments: function (data, $el) {
				var self = this;

				for(var i = 0; i < data.length; i++) {
					if (!data[i].data.link_id) return;

					var model = new CommentModel({author: data[i].data.author, score: data[i].data.score, body: data[i].data.body, replies: data[i].data.replies, created_utc: data[i].data.created_utc});
						var commentView = new CommentView({ model: model });

					if (data[i].data.replies) {
						self._addSubComments(data[i].data.replies.data.children, commentView.$el);
					}

					$el.append(commentView.el);
				}
			}
		});
});