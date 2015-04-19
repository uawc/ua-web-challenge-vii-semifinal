define(function () {
		'use strict';
	/**
	 * replacing # to a ? symbol
	 * */
	return {
		getHash: function(window) {
			var match = (window || this).location.href.match(/\?(.*)$/);
			return match ? match[1] : '';
		}
	};
});