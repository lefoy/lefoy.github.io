var term = (function(window, document, $) {

    'use strict';

    /*

        TODO:

        - commands
          - twitter
          - stackoverflow
          - projects

        - file system (cd, ls, cat)

     */

    var $window = $(window),
        $body = $('body'),
        $terminal,
        terminal,

        indentChar = ' ',
        indentWidth = 2,
        maxBuffer = 15,
        hash = '#terminal',
        welcomeMessage = 'type \'help\' for a list of available commands\n',

        commands = [{
            command: 'help',
            action: function(args) {
                terminal.echo(helpers.help.message());
                terminal.echo('');
            }
        }, {
            command: 'github',
            action: function(args) {
                helpers.redirect('https://github.com/lefoy/lefoy.github.io');
            }
        }, {
            command: 'contact',
            action: function(args) {
                helpers.redirect('mailto:me@lefoy.net');
            }
        }, {
            command: 'rm',
            action: function(args) {
                terminal.push(function(command) {
                    if (command.match(/y|yes/i)) {
                        terminal.echo('');
                        $('.terminal-output').append(helpers.meme('rm-rf.jpg'));
                        terminal.echo('');
                        terminal.pop();
                    } else if (command.match(/n|no/i)) {
                        terminal.echo('');
                        terminal.pop();
                    }
                }, {
                    prompt: 'Are you sure? (y/n) '
                });
            }
        }, {
            command: 'ls',
            action: function(args) {
                // if (_.contains(args, 'l')) {
                //     terminal.echo(filesystem.listDirectory('list'));
                // } else {
                //     terminal.echo(filesystem.listDirectory());
                // }
                // terminal.echo('');
                terminal.echo('Work in progress...');
                terminal.echo('');
            }
        }, {
            command: 'exit',
            action: function(args) {
                close();
            }
        }],


        exec = function(command) {
            var cmd = helpers.get.cmd(command),
                args = helpers.get.args(command),
                current = _.findWhere(commands, {
                    command: cmd
                });

            if (current) {
                current.action(args);
            } else {
                terminal.echo('command not found: ' + cmd + '\n');
                terminal.echo('type \'help\' for a list of available commands\n');
            }
        },

        terminalInit = function() {
            $terminal.terminal(function(command, term) {
                terminal = term;
                exec(command);
            }, {
                greetings: welcomeMessage,
                name: 'terminal',
                prompt: '> ',
                exit: false
            });
        },


        create = function() {
            $body.addClass('terminal').append('<div id="terminal"></div>');
            $terminal = $body.find('#terminal');
            window.location.hash = 'terminal';

            terminalInit();
        },


        close = function() {
            $body.removeClass('terminal');
            window.location.hash = '';
            $window.isKonami = false;
            $terminal.remove();
        },


        konami = function() {
            $window.konami({
                cheat: function() {
                    $window.isKonami = true;
                    create();
                }
            });
        },


        hashchange = function() {
            $window.on('hashchange', function() {
                if (window.location.hash === hash && !$window.isKonami) create();
            }).trigger('hashchange');
        },


        bindEvents = function() {
            konami();
            hashchange();
        },


        init = function() {
            bindEvents();
        },


        helpers = {
            get: {
                cmd: function(command) {
                    return command.split(' ')[0];
                },
                args: function(command) {
                    var output = '';
                    if (command.split(' ').length > 1) {
                        output = command.split(' ')[1];
                        if (output.charAt(0) === '-') {
                            output = output.substring(1).split('');
                        }
                    }
                    return output;
                }
            },
            indent: function(level) {
                return new Array(level * indentWidth).join(indentChar);
            },
            buffer: function(string, position) {
                var output,
                    buffer = new Array(maxBuffer - string.length).join(' ');
                if (position === 'left') output = buffer + string;
                if (position === 'right') output = string + buffer;
                return output;
            },
            redirect: function(url) {
                window.location.href = url;
            },
            meme: function(filename) {
                return '<img src="/public/img/terminal/' + filename + '" alt="" />';
            },
            help: {
                message: function() {
                    return [
                        '',
                        helpers.indent(2) + 'list of available commands:',
                        '',
                        helpers.indent(4) + helpers.buffer('github', 'right') + 'Open the website Github repository',
                        helpers.indent(4) + helpers.buffer('contact', 'right') + 'Send email to website author',
                        '',
                        helpers.indent(2) + 'this terminal is still a work in progress...',
                        ''
                    ].join('\n');
                }
            }
        };


    return {
        init: init
    };

})(window, document, $);
