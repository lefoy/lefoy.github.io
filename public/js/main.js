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

    window.setTimeout(function() {
        $.ajax({
            "url": "https://www.kimonolabs.com/api/ajv8viwq?apikey=S8UcvAYXCnHxQ0tq7Qwr6xxUZC1PPfLQ&callback=twitterCallback",
            "crossDomain": true,
            "dataType": "jsonp"
        });

        $.ajax({
            "url": "https://www.kimonolabs.com/api/45823fki?apikey=S8UcvAYXCnHxQ0tq7Qwr6xxUZC1PPfLQ&callback=stackoverflowCallback",
            "crossDomain": true,
            "dataType": "jsonp"
        });
    }, 1);
});

function stackoverflowCallback(data) {
    $('.odometer.reputation').attr('data-number', data.results.collection1[1].reputation.text);
}

function twitterCallback(data) {
    $('.odometer.tweets').attr('data-number', data.results.collection1[1].property1.text);
    $('.odometer.followers').attr('data-number', data.results.collection1[7].property1.text);
}
