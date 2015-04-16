require.config({
	baseUrl: 'js',
	paths: {
		jade: '../lib/jade/runtime',
		jquery: '../lib/jquery/dist/jquery.min',
		underscore: '../lib/underscore/underscore-min',
		backbone: '../lib/backbone/backbone',
		bootstrap: '../lib/bootstrap/dist/js/bootstrap.min',
	},
	shim: {
		bootstrap: {
			deps: ['jquery']
		}
	},
	deps: ['main']
});
