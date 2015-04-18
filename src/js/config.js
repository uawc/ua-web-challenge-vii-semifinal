require.config({
	baseUrl: 'js',
	paths: {
		jade: '../lib/jade/runtime',
		jquery: '../lib/jquery/dist/jquery.min',
		underscore: '../lib/underscore/underscore-min',
		backbone: '../lib/backbone/backbone',
		reddit: '../lib/reddit.js/reddit.min',
		templates: 'templates'
	},
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		'reddit': {
			exports: 'reddit'
		}
	},
	deps: ['main']
});
