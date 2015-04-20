define(['underscore', 'backbone'],
	function (_, Backbone) {
	'use strict';

		return Backbone.Model.extend({

			// Default data of this Model
			defaults: {
				score: '',
				author: '',
				body: '',
				replies: '',
				created_utc: ''
			},

			// Initialize message.model
			initialize: function() {
				this._convertTime();
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
			}
		});
});