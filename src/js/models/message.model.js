define(['underscore', 'backbone'],
	function (_, Backbone) {
	'use strict';

		return Backbone.Model.extend({
			defaults: {
				url:'',
				title: '',
				rating: '',
				author: '',
				created_utc: '',
				comments: '',
				subreddit: '',
				thumbnail: '',
				commentsURL: ''
			},

			initialize: function() {
				this._convertTime();
			},

			_convertTime: function() {
				var timeStamp = this.get('created_utc'),
					redditDate,
					formattedDate;

				//checking stamp
				if (!timeStamp || typeof(timeStamp) !== 'number') {
					this.set('created_utc', '-');
					return;
				}

				//convert time stamp to seconds
				timeStamp = timeStamp * 1000;
				//getting Date object using Date stamp
				redditDate = new Date(timeStamp);

				formattedDate = redditDate.getFullYear() + '/' + redditDate.getMonth() + '/' + redditDate.getDate() + ' ' + redditDate.getHours() + ':' + redditDate.getMinutes();

				this.set('created_utc', formattedDate);
			}
		});
});