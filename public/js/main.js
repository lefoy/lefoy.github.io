console.log(
    '%c lefoy.net - Have fun hacking!   |   Tip: try the Konami code ',
    'background: #000; color: #fff; padding: 10px 3px; line-height: 70px;'
);

$(window).konami({
    cheat: function() {
        alert('Cheat code activated!');
    }
});

jQuery(document).ready(function($) {

    layout.init();

});
