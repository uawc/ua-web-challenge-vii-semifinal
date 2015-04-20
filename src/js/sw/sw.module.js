define(['jquery'],
	function($){

		return {
			// Destination of ServiceWorker file
			_fileDestination: '/sw.js',

			// ServiceWorker object
			_sw: navigator.serviceWorker,

			_scope: '/',

			init: function() {
				this._swRegister();
			},

			_swRegister: function() {
				if (this._sw) {
					this._sw.register(this._fileDestination, {scope: this.scope})
						.then(this._onRegisterSuccess)
						.catch(this._onRegisterError);
				}
			},

			// Registration was successful
			_onRegisterSuccess: function() {
				console.log('ServiceWorker registration success. Please refresh a few of times to preventing SW Fail');
			},

			// Registration failed :(
			_onRegisterError: function(err) {
				console.log('ServiceWorker registration failed. Didn\'t you forget to enable Experimental web features at your browser or use https protocol?');
			}
		};
	});