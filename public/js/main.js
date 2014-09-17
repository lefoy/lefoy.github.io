$(document).ready(function() {

    // $('.section.home.fullheight').css('padding', 0).find('.section-content').height($(window).height());
    // $(window).on('resize', function(event) {
    //     $('.section.home.fullheight').css('padding', 0).find('.section-content').height($(window).height());
    // });

    $('.section.stats').bind('inview', function(event, isInView) {
        if (isInView) {
            $('.odometer').each(function() {
                var number = $(this).attr('data-number');
                $(this).html(number);
            });
        }
    });

    // Update github repositories stat
    var lefoy = new Gh3.User("lefoy"),
        lefoyRepositories = new Gh3.Repositories(lefoy);

    lefoyRepositories.fetch({
        page: 1,
        per_page: 500,
        direction: "desc"
    }, "next", function() {
        $('.odometer.repositories').attr('data-number', lefoyRepositories.repositories.length);
    });

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: "http://api.twittercounter.com/?twitter_id=556853137&apikey=b3abfbe5c76aec3fc59c426b0d51eeb0&output=JSONP&callback=getcount",
        success: function(data) {
            $('.odometer.followers').attr('data-number', data.followers_current);
        }
    });

    $.ajax({
        type: "GET",
        dataType: "html",
        url: "http://0.0.0.0:4000/?url=github.com/lefoy",
        success: function(data) {

        }
    });
});
