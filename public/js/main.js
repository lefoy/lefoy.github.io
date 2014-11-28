console.log(
    '%c lefoy.net - Have fun hacking!   |   Tip: try the Konami code ',
    'background: #000; color: #fff; padding: 10px 3px; line-height: 70px;'
);

$(window).konami({
    cheat: function() {
        alert('Cheat code activated!');

        $('body').append('<div id="terminal"></div>');

        var terminal = $('body').find('#terminal');

        terminal.css({
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            color: '#fff',
            zIndex: '9999',
            backgroundColor: '#000'
        });

        $('#terminal').terminal(function(command, term) {
            if (command !== '') {
                try {
                    var result = window.eval(command);
                    if (result !== undefined) {
                        term.echo(new String(result));
                    }
                } catch (e) {
                    term.error(new String(e));
                }
            } else {
                term.echo('');
            }
        }, {
            greetings: 'Javascript Interpreter',
            name: 'js_demo',
            height: 200,
            prompt: 'js> '
        });
    }
});

jQuery(document).ready(function($) {

    layout.init();

});
