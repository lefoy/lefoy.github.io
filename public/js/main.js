console.log(
    '%c lefoy.net - Have fun hacking!   |   Tip: try the Konami code ',
    'background: #000; color: #fff; padding: 10px 3px; line-height: 70px;'
);

function terminal() {
    $('body').append('<div id="terminal"></div>');

    var terminal = $('body').find('#terminal');

    $('#terminal').terminal(function(command, term) {
        switch (command) {
            case 'help':
                term.echo(['',
                    '    The most commonly used commands are:',
                    '        github         Open the website Github repository',
                    '        summary        Display information about the website',
                    '        contact        Send email to website author',
                    ''
                ].join('\n'));
                break;
            case 'github':
                term.echo('github command...\n');
                break;
            case 'summary':
                term.echo('summary command...\n');
                break;
            case 'contact':
                term.echo('contact command...\n');
                break;
            case 'exit':
                $('#terminal').remove();
                break;
            default:
                term.echo('command not found: ' + command + '\n');
        }
    }, {
        greetings: '',
        name: 'terminal',
        prompt: '> ',
        exit: false
    });

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
}

jQuery(document).ready(function($) {

    layout.init();

});
