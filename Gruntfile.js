module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // --------------------------------------------------

        compass: {
            dest: {
                options: {
                    sassDir: 'public/sass',
                    cssDir: 'public/css',
                    imagesDir: 'public/img',
                    environment: 'development',
                    require: 'sass-globbing'
                }
            }
        },

        // --------------------------------------------------

        exec: {
            build: {
                cmd: 'jekyll build'
            },
            serve: {
                cmd: 'jekyll serve'
            }
        },

        // --------------------------------------------------

        concurrent: {
            jekyll: {
                tasks: ['exec:serve', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        // --------------------------------------------------

        watch: {
            jekyll: {
                files: ['**/*.{html, md, yml}'],
                tasks: ['exec:build']
            },
            compass: {
                files: ['public/sass/**/*.scss'],
                tasks: ['compass', 'exec:build']
            }
        }

        // --------------------------------------------------
    });

    // Load all npm tasks at once
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Tasks
    grunt.registerTask('default', ['concurrent:jekyll']);

};
