function safeconsole() {
    var method,
        noop = function() {},
        methods = [
            'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
            'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
            'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
            'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
        ],
        length = methods.length,
        console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];
        if (!console[method]) {
            console[method] = noop;
        }
    }
}

function banner() {
    console.log(
        '%c lefoy.net  |  Front-End Web Developer  ',
        'background: #000; color: #fff; padding: 10px 3px; line-height: 35px;'
    );
    console.log(
        '%c -------- ↑ ↑ ↓ ↓ ← → ← → B A  -------- ',
        'background: #000; color: #fff; padding: 10px 3px; line-height: 35px;'
    );
}

jQuery(document).ready(function($) {

    safeconsole();
    banner();

    if (typeof layout !== undefined) {
        layout.init();
    }

    if (typeof term !== undefined) {
        term.init();
    }

});
