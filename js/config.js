require.config({
	baseUrl: 'js',
	out: "main.js",
	paths: {
		jade: '../lib/jade/runtime',
		jquery: '../lib/jquery/dist/jquery.min',
		underscore: '../lib/underscore/underscore-min',
		backbone: '../lib/backbone/backbone',
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
		}
	},
	deps: ['main']
});
