---
layout: default
title: Grunt Project
permalink: grunt-project
published: true
---

- Sass with Compass framework
- File minification
- File concatenation
- Web Server with livereload

## Final configuration

### package.json

```
{
  "name": "basic-grunt-project",
  "version": "0.0.0",
  "dependencies": {},
  "repository": {},
  "devDependencies": {
    "grunt": "^0.4.5",
    "grunt-concurrent": "^0.5.0",
    "grunt-contrib-clean": "^0.6.0",
    "grunt-contrib-compass": "^0.9.1",
    "grunt-contrib-connect": "^0.8.0",
    "grunt-contrib-copy": "^0.5.0",
    "grunt-contrib-cssmin": "^0.10.0",
    "grunt-contrib-uglify": "^0.5.1",
    "grunt-contrib-watch": "^0.6.1",
    "load-grunt-tasks": "^0.6.0",
    "lodash": "^2.4.1",
    "matchdep": "^0.3.0"
  }
}
```
### Gruntfile.js

```
'use strict';
var lodash = require('lodash');

module.exports = function(grunt) {

    // Initial config
    var config = {

        // Read JSON files
        pkg: grunt.file.readJSON('package.json'),

        // App variables
        app: {
            src: 'src',
            dest: 'dest',
            css: 'css',
            sass: 'sass',
            html: 'html',
            img: 'img',
            js: 'js'
        }
    };

    // Tasks options
    var tasks = {

        clean: {
            all: ['<%= app.dest %>/**/*'],
            css: ['<%= app.dest %>/<%= app.css %>/**/*.css'],
            html: ['<%= app.dest %>/**/*.html'],
            img: ['<%= app.dest %>/<%= app.img %>/**/*'],
            js: ['<%= app.dest %>/<%= app.js %>/**/*']
        },

        compass: {
            dest: {
                options: {
                    sassDir: '<%= app.src %>/<%= app.sass %>',
                    cssDir: '<%= app.src %>/<%= app.css %>'
                }
            }
        },

        concurrent: {
            server: {
                tasks: ['connect', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        connect: {
            server: {
                options: {
                    hostname: '127.0.0.1',
                    base: 'dest',
                    keepalive: true
                }
            }
        },

        copy: {
            css: {
                files: [{
                    expand: true,
                    cwd: '<%= app.src %>/<%= app.css %>/',
                    src: ['**/*'],
                    dest: '<%= app.dest %>/<%= app.css %>/'
                }]
            },
            html: {
                files: [{
                    expand: true,
                    cwd: '<%= app.src %>/<%= app.html %>/',
                    src: ['**/*'],
                    dest: '<%= app.dest %>/<%= app.html %>/'
                }]
            },
            img: {
                files: [{
                    expand: true,
                    cwd: '<%= app.src %>/<%= app.img %>/',
                    src: ['**/*'],
                    dest: '<%= app.dest %>/<%= app.img %>/'
                }]
            }
        },

        cssmin: {
            minify: {
                expand: true,
                cwd: '<%= app.src %>/<%= app.css %>/',
                src: ['*.css', '!*.min.css'],
                dest: '<%= app.dest %>/<%= app.css %>/',
                ext: '.min.css'
            }
        },

        uglify: {
            minify: {
                files: [{
                    expand: true,
                    cwd: '<%= app.src %>/<%= app.js %>',
                    src: ['**/*.js', '!**/*.min.js'],
                    dest: '<%= app.dest %>/<%= app.js %>',
                    ext: '.min.js'
                }]
            }
        },

        watch: {
            html: {
                files: ['<%= app.src %>/<%= app.html %>/**/*'],
                tasks: [
                    'clean:html',
                    'includereplace',
                    'validation',
                    'notify:includereplace'
                ],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['<%= app.src %>/<%= app.js %>/**/*'],
                tasks: [
                    'jshint',
                    'clean:js',
                    'copy:js',
                    'uglify',
                    'notify:jshint'
                ],
                options: {
                    livereload: true
                }
            },
            img: {
                files: ['<%= app.src %>/<%= app.img %>/**/*'],
                tasks: [
                    'clean:img',
                    'copy:img',
                    'notify:copy'
                ],
                options: {
                    livereload: true
                }
            },
            sass: {
                files: ['<%= app.src %>/<%= app.sass %>/**/*'],
                tasks: [
                    'clean:css',
                    'csscomb',
                    'compass:dest',
                    'cssmin',
                    'notify:compass'
                ],
                options: {
                    livereload: true
                }
            }
        }
    };

    // Merge tasks options with config
    lodash.merge(config, tasks);

    require('load-grunt-tasks')(grunt);

    // Default task
    grunt.registerTask('default', 'Default grunt task', function() { grunt.task.run([]); }); grunt.registerTask('default', 'Default grunt task', function() { grunt.task.run([]); });

    // Load grunt config
    grunt.initConfig(config);

    // Load all npm tasks at once
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

};
```
