var path = require('path');

module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		connect: {
			main: {
				options: {
					port: 1000,
					keepalive: true,
					base: 'app'
				}
			}
		},

		jshint: {
			main: [
				'Gruntfile.js',
				'src/js/**/*.js'
			]
		},

		clean: {
			main: ['app']
		},

		less: {
			main: {
				options: {
					paths: ['src/styles'],
					compress: true
				},
				files: [
					{
						expand: true,
						cwd: 'src/styles',
						src: ['*.less'],
						dest: 'app/css/',
						ext: '.css'
					}
				]
			}
		},

		jade: {
			main: {
				expand: true,
				cwd: 'src/html',
				src: ['**/*.jade'],
				dest: 'app',
				ext: '.html'
			},
			templates: {
				files: {
					'app/js/templates.js': 'src/js/templates/**/*.jade'
				},
				options: {
					amd: true,
					client: true,
					processName: function (name) {
						return path.basename(name, '.jade');
					}
				}
			}
		},

		copy: {
			main: {
				expand: true,
				cwd: 'src/js',
				src: ['**/*.js'],
				dest: 'app/js'
			},
			img: {
				expand: true,
				cwd: 'src/img',
				src: ['**/*.png', '**/*.jpg'],
				dest: 'app/img'
			},
			font: {
				expand: true,
				cwd: 'src/fonts',
				src: ['**/*.eot', '**/*.woff', '**/*.svg', '**/*.ttf'],
				dest: 'app/css/fonts'
			},
			sw: {
				expand: true,
				cwd: 'src/sw',
				src: ['**/*.js'],
				dest: 'app'
			}
		},

		watch: {
			css: {
				files: ['src/styles/**/*.less'],
				tasks: ['less:main']
			},
			html: {
				files: ['src/html/**/*.jade'],
				tasks: ['jade:main']
			},
			templates: {
				files: ['src/js/templates/**/*.jade'],
				tasks: ['jade:templates']
			},
			js: {
				files: ['src/js/**/*.js'],
				tasks: ['copy:main']
			},
			sw: {
				files: ['src/sw/**/*.js'],
				tasks: ['copy:sw']
			}
		},

		concurrent: {
			options: {
				logConcurrentOutput: true,
				limit: 10
			},
			build: {
				tasks: ['less:main', 'jade:main', 'jade:templates', 'copy:main', 'copy:img', 'copy:font', 'copy:sw']
			},
			watch: {
				tasks: ['watch:css', 'watch:html', 'watch:templates', 'watch:js', 'watch:sw']
			},
			run: {
				tasks: ['concurrent:watch', 'connect:main']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-concurrent');

	grunt.registerTask('test', ['jshint:main']);
	grunt.registerTask('default', ['concurrent:build', 'concurrent:run']);
	grunt.registerTask('cleanAll', ['clean:main']);
};
