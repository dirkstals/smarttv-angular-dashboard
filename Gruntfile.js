
module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        useminPrepare: {
            html: 'src/index.html',
            options: {
                dest: 'dist'
            }
        },

        usemin: {
            html: ['dist/index.html']
        },
        
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'dist/index.html'
                }
            }
        },

        copy:{
            html: {
                src: 'src/index.html', dest: 'dist/index.html'
            },
            xml: {
                src: 'src/config.xml', dest: 'dist/config.xml'
            },
            widget: {
                src: 'src/widget.info', dest: 'dist/widget.info'
            },
            images: {
                expand: true, flatten: true, src: 'src/app/images/*', dest: 'dist/app/images/'
            }
        }
    });

    grunt.registerTask('default', [
        'copy',
        'useminPrepare',
        'concat',
        'uglify',
        'cssmin',
        'usemin',
        'htmlmin'
    ]);

};