define(['underscore', 'backbone'],
	function (_, Backbone) {
	'use strict';

		return Backbone.Model.extend({

			// Default data of this Model
			defaults: {
				url:'',
				name: '',
				title: '',
				score: '',
				author: '',
				after: '',
				before: '',
				created_utc: '',
				num_comments: '',
				subreddit: '',
				thumbnail: '',
				commentsURL: ''
			},

			// Initialize message.model
			initialize: function() {
				this._convertTime();
				this._checkThumbnail(this.get('thumbnail'));
			},

			/**
			 * Convert time from stamp to "YY/MM/DD H/M"
			 * @private
			 * */
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

				formattedDate = redditDate.getFullYear() + '/' + this._addZero(redditDate.getMonth()) + '/' + this._addZero(redditDate.getDate()) + ' ' + this._addZero(redditDate.getHours()) + ':' + this._addZero(redditDate.getMinutes());

				this.set('created_utc', formattedDate);
			},

			/**
			 * Add zero for Date elements
			 * @private
			 * @param i - {number}
			 * */
			_addZero: function(i) {
				return i < 10 ? "0" + i : i;
			},

			/**
			 * Check if thumbnail is an URL
			 * @private
			 * @param url {string}
			 * */
			_checkThumbnail: function(url) {
				var regExp = new RegExp('^http:\/\/|^https:\/\/');

				if (!regExp.test(url)) {
					this.set('thumbnail', '');
				}
			}
		});
});