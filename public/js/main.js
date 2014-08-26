$(document).ready(function() {

    $('.section.home').height( $(window).height() );
    $(window).on('resize', function(event) {
        $('.section.home').height( $(window).height() );
    });

    $('.section.stats').bind('inview', function(event, isInView) {
        if ( isInView ) {
            $('.odometer').each(function() {
                var number = $(this).attr('data-number');
                $(this).html(number);
            });
        }
    });

});
