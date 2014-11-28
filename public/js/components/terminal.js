var terminal = (function(window, document, $) {

    'use strict';

    var $window = $(window),
        terminal,

        init = function() {

            bindEvents();

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

        layout = function() {

            terminal.css({
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                color: '#fff',
                zIndex: '1000000',
                backgroundColor: 'rgba(0, 0, 0, 0.9)'
            });
        },

        terminalInit = function() {

            $('body').append('<div id="terminal"></div>');

            terminal = $('body').find('#terminal');

            $('#terminal').terminal(function(command, term) {
                switch (command) {
                    case 'help':
                        term.echo(['',
                            '    list of available commands:',
                            '        clear          Clean terminal output',
                            '        github         Open the website Github repository',
                            '        contact        Send email to website author',
                            ''
                        ].join('\n'));
                        break;
                    case 'github':
                        window.location.href = 'https://github.com/lefoy/lefoy.github.io';
                        break;
                    case 'contact':
                        window.location.href = "mailto:me@lefoy.net";
                        break;
                    case 'rm -rf /':
                    case 'rm -fr /':
                        term.echo('\n');
                        $('.terminal-output').append('<img src="/public/img/terminal/rm-rf.jpg" alt="" />');
                        term.echo('\n');
                        break;
                    case 'exit':
                        $('#terminal').remove();
                        break;
                    default:
                        term.echo('command not found: ' + command + '\n');
                        term.echo('type \'help\' for a list of available commands\n');
                }
            }, {
                greetings: 'type \'help\' for a list of available commands\n',
                name: 'terminal',
                prompt: '> ',
                exit: false
            });

            layout();

        };

    return {
        init: init
    };

})(window, document, $);
