var terminal = (function(window, document, $) {

    'use strict';

    var $window = $(window),
        $body = $('body'),
        terminal,
        terminalElement,

        indentChar = '  ',
        currentDir = '/',

        commands = [{
            command: 'help',
            public: true,
            description: 'Show a list of available commands'
        }, {
            command: 'clear',
            public: true,
            description: 'Clean terminal output'
        }, {
            command: 'pwd',
            public: true,
            description: 'Show current directory'
        }, {
            command: 'github',
            public: true,
            description: 'Open the website Github repository'
        }, {
            command: 'contact',
            public: true,
            description: 'Send email to website author'
        }, {
            command: 'rm',
            public: false,
            description: ''
        }, {
            command: 'exit',
            public: true,
            description: 'Exit terminal'
        }],

        help = function() {
            var append = '',
                output = [''];

            output.push(indent(1) + 'list of available commands:');

            for (var i = 0, t = commands.length; i < t; i++) {
                if (commands[i].public) {
                    output.push(indent(2) + commands[i].command + buffer(15, commands[i].command.length) + commands[i].description);
                }
            }

            output.push('');

            terminal.echo(output.join('\n'));
        },

        clear = function() {
            terminal.echo('\n');
        },

        pwd = function() {
            terminal.echo('hello');
        },

        github = function() {
            redirect('https://github.com/lefoy/lefoy.github.io');
        },

        contact = function() {
            redirect('mailto:me@lefoy.net');
        },

        rm = function() {
            terminal.echo('\n');
            generate_meme('rm-rf.jpg');
            terminal.echo('\n');
        },

        exit = function() {
            $('#terminal').remove();
            $body.css('overflow', 'auto');
            window.location.hash = '';
        },

        notfound = function(command) {
            terminal.echo('command not found: ' + command + '\n');
            terminal.echo('type \'help\' for a list of available commands\n');
        },

        redirect = function(url) {
            window.location.href = url;
        },

        generate_meme = function(filename) {
            $('.terminal-output').append('<img src="/public/img/terminal/' + filename + '" alt="" />');
        },

        bindEvents = function() {

            $window.konami({
                cheat: function() {
                    terminalInit();
                }
            });

            $window.on('hashchange', function() {
                if (window.location.hash === '#terminal') {
                    terminalInit();
                }
            }).trigger('hashchange');

        },

        terminalInit = function() {

            $body.append('<div id="terminal"></div>');
            window.location.hash = 'terminal';

            terminalElement = $body.find('#terminal');

            $('#terminal').terminal(function(command, term) {
                terminal = term;
                var splitCommand = command.split(' '),
                    cmd = splitCommand[0],
                    arg = [];

                if (splitCommand.length > 1) {
                    arg = splitCommand[1].substring(1).split('');
                }

                for (var i = commands.length - 1; i >= 0; i--) {
                    if (cmd === commands[i].command) {
                        exec(cmd, arg);
                        return false;
                    }
                }
                notfound(command);
            }, {
                greetings: 'type \'help\' for a list of available commands\n',
                name: 'terminal',
                prompt: '> ',
                exit: false
            });

            layout();

        },

        exec = function(cmd, arg) {
            console.log(cmd, arg);
        },

        indent = function(level) {
            return Array(level + 1).join(indentChar);
        },

        buffer = function(max, current) {
            return Array(max - current).join(' ');
        },

        layout = function() {

            terminalElement.css({
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                color: '#fff',
                zIndex: '1000000',
                backgroundColor: '#000'
            });

            $body.css('overflow', 'hidden');

        },

        init = function() {

            bindEvents();

        };

    return {
        init: init
    };

})(window, document, $);
