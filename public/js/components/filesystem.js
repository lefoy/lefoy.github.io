var filesystem = (function(window, document, $) {

    'use strict';

    var directories = [
            '.',
            '..',
            'Posts',
            'Projects'
        ],

        files = [{
            name: 'README.md',
            content: 'Contenu du fichier README.md'
        }, {
            name: 'LICENCE.md',
            content: 'Contenu du fichier LICENCE.md'
        }],

        getPosts = function(callback) {
            var url = 'https://www.kimonolabs.com/api/9ozh039i';
            helpers.ajaxRequest(url, callback);
        },

        getProjects = function(callback) {
            var url = 'https://www.kimonolabs.com/api/afe6u2u8';
            helpers.ajaxRequest(url, callback);
        },

        getDirectories = function(display) {
            var output = '';

            for (var i = 0, l = directories.length; i < l; i++) {
                if (display === 'list') {
                    output += helpers.format.directory(directories[i]) + '\n';
                } else {
                    output += helpers.format.directory(directories[i]) + '    ';
                }
            }

            return output;
        },

        getFiles = function(display) {
            var output = '';

            for (var i = 0, l = files.length; i < l; i++) {
                if (display === 'list') {
                    output += helpers.format.file(files[i].name) + '\n';
                } else {
                    output += helpers.format.file(files[i].name) + '    ';
                }
            }

            return output;
        },

        listDirectory = function(display) {
            var output = '',
                elements = directories.concat(files);

            for (var i = 0, l = elements.length; i < l; i++) {
                if (display === 'list') {
                    output += helpers.format.file(elements[i]) + '\n';
                } else {
                    output += helpers.format.file(elements[i]) + '    ';
                }
            }

            return output;
        },

        helpers = {
            ajaxRequest: function(url, callback) {
                $.ajax({
                    type: 'get',
                    url: url,
                    async: false,
                    data: {
                        apikey: 'S8UcvAYXCnHxQ0tq7Qwr6xxUZC1PPfLQ'
                    },
                    dataType: 'jsonp',
                    success: function(data) {
                        callback(data.results);
                    }
                });
            },
            format: {
                file: function(name) {
                    return '[[;#fff;#000]' + name + ']';
                },
                directory: function(name) {
                    return '[[;#aaa;#000]' + name + ']';
                }
            }
        }


    return {
        listDirectory: listDirectory
    };

})(window, document, $);
