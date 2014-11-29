function banner() {
    console.log(
        '%c lefoy.net   |   Tip: try the Konami code ',
        'background: #000; color: #fff; padding: 10px 3px; line-height: 35px;'
    );
    console.log(
        '%c --------- ↑ ↑ ↓ ↓ ← → ← → B A  --------- ',
        'background: #000; color: #fff; padding: 10px 3px; line-height: 35px;'
    );
    console.log('');
}

jQuery(document).ready(function($) {

    banner();

    layout.init();
    term.init();

});
