var layout = (function(window, document, $) {

    'use strict';

    var $window = $(window),
        windowWidth = $window.width(),
        windowHeight = $window.height(),

        init = function() {

            stickOnScroll();
            navigation();

            if (Detectizr.browser.name !== 'ie') {
                //particles();
                snow();
            }

            if (windowWidth > 767) {
                codeHoverEffect();
            }

        },

        stickOnScroll = function() {

            window.setTimeout(function() {
                var ele = $('.project-content-navigation');
                ele.css('height', ele.outerHeight()).stickOnScroll({
                    topOffset: 10
                });
            }, 100);

        },

        codeHoverEffect = function() {

            var elements = $('pre'),
                wrapperWidth = $('.l-page-wrapper').width();

            elements.each(function(index, el) {
                var $el = $(el),
                    width = $el.find('code').width();

                if (width > wrapperWidth) {
                    var maxWidth = $window.width() * 0.8;

                    $el.css({
                        width: wrapperWidth,
                        maxWidth: maxWidth
                    });

                    $(el).hover(function() {
                        var marginLeft = (wrapperWidth - width) / 2;

                        if (width > maxWidth) {
                            width = maxWidth;
                            marginLeft = (maxWidth - wrapperWidth) / 2 * -1
                        }

                        $el.css({
                            width: width,
                            marginLeft: marginLeft
                        });
                    }, function() {
                        $el.css({
                            width: wrapperWidth,
                            marginLeft: 0
                        });
                    });
                }
            });

        },

        particles = function() {
            var nbParticles = 120;

            if (windowWidth < 768) {
                nbParticles = 35;
            }

            particlesJS('particles', {
                canvas: {
                    color_hex_bg: '#000',
                    opacity: 1
                },
                particles: {
                    color_hex: '#fff',
                    opacity: 1,
                    size: 2.5,
                    size_random: true,
                    nb: nbParticles,
                    anim: {
                        speed: 2
                    }
                },
                interactivity: {
                    events: {
                        onclick: {
                            enable: true,
                            mode: 'push',
                            nb: 1
                        }
                    }
                },
                retina_detect: true
            });
        },

        snow = function() {

            $('#show').snowfall({
                flakeCount: 60,
                minSize: 1,
                maxSize: 5,
                minSpeed: 0.5,
                maxSpeed: 3,
                round: true,
                deviceorientation: true
            });

        },

        navigation = function() {

            var $el,
                element;
            $('.project-content-left').append('<nav class="project-content-navigation"><ol></ol></nav>');
            $('.project-content-right').find('h1, h2, h3').each(function(index, el) {
                $el = $(el);
                $el.attr('id', $el.text().replace(' ', '-').toLowerCase());
                element = '<li><a href="#' + $el.attr('id') + '">' + $el.text() + '</a></li>';
                $('.project-content-left').find('.project-content-navigation ol').append(element);
            });

        };

    return {
        init: init
    };

})(window, document, $);
