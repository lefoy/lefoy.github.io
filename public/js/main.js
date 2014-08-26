$(document).ready(function() {

    $('.section.stats').bind('inview', function(event, isInView) {
        if ( isInView ) {
            $('.odometer').each(function() {
                var number = $(this).attr('data-number');
                $(this).html(number);
            });
        }
    });

});
