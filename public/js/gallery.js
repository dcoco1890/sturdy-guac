AOS.init({
    duration: 800,
    easing: "slide"
});

(function ($) {

    "use strict";

    $(window).stellar({
        responsive: true,
        parallaxBackgrounds: true,
        parallaxElements: true,
        horizontalScrolling: false,
        hideDistantElements: false,
        scrollProperty: "scroll"
    });

    let fullHeight = function () {

        $(".js-fullheight").css("height", $(window).height());
        $(window).resize(function () {
            $(".js-fullheight").css("height", $(window).height());
        });

    };
    fullHeight();

    // loader
    let loader = function () {
        setTimeout(function () {
            if ($("#ftco-loader").length > 0) {
                $("#ftco-loader").removeClass("show");
            }
        }, 1);
    };
    loader();

    // scrollax
    $.Scrollax();

    // burger navbar
    let burgerMenu = function () {

        $(".js-colorlib-nav-toggle").on("click", function (event) {
            event.preventDefault();
            let $this = $(this);

            if ($("body").hasClass("offcanvas")) {
                $this.removeClass("active");
                $("body").removeClass("offcanvas");
            } else {
                $this.addClass("active");
                $("body").addClass("offcanvas");
            }
        });
    };
    burgerMenu();

    // click outside of offcanvass
    let mobileMenuOutsideClick = function () {

        $(document).click(function (e) {
            let container = $("#colorlib-aside, .js-colorlib-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {

                if ($("body").hasClass("offcanvas")) {

                    $("body").removeClass("offcanvas");
                    $(".js-colorlib-nav-toggle").removeClass("active");

                }

            }
        });

        $(window).scroll(function () {
            if ($("body").hasClass("offcanvas")) {

                $("body").removeClass("offcanvas");
                $(".js-colorlib-nav-toggle").removeClass("active");

            }
        });

    };
    mobileMenuOutsideClick();

    // owl carousel
    let carousel = function () {
        $(".home-slider").owlCarousel({
            loop: true,
            autoplay: true,
            margin: 0,
            animateOut: "fadeOut",
            animateIn: "fadeIn",
            nav: false,
            autoplayHoverPause: false,
            items: 1,
            navText: ["<span class='ion-md-arrow-back'></span>", "<span class='ion-chevron-right'></span>"],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1000: {
                    items: 1
                }
            }
        });

    };
    carousel();

    // waypoint
    let contentWayPoint = function () {
        // eslint-disable-next-line no-unused-vars
        let i = 0;
        $(".ftco-animate").waypoint(function (direction) {

            if (direction === "down" && !$(this.element).hasClass("ftco-animated")) {

                i++;

                $(this.element).addClass("item-animate");
                setTimeout(function () {

                    $("body .ftco-animate.item-animate").each(function (k) {
                        let el = $(this);
                        setTimeout(function () {
                            let effect = el.data("animate-effect");
                            if (effect === "fadeIn") {
                                el.addClass("fadeIn ftco-animated");
                            } else if (effect === "fadeInLeft") {
                                el.addClass("fadeInLeft ftco-animated");
                            } else if (effect === "fadeInRight") {
                                el.addClass("fadeInRight ftco-animated");
                            } else {
                                el.addClass("fadeInUp ftco-animated");
                            }
                            el.removeClass("item-animate");
                        }, k * 50, "easeInOutExpo");
                    });

                }, 100);

            }

        }, { offset: "95%" });
    };
    contentWayPoint();

    // magnific popup
    $(".image-popup").magnificPopup({
        type: "image",
        closeOnContentClick: true,
        closeBtnInside: false,
        fixedContentPos: true,
        mainClass: "mfp-no-margins mfp-with-zoom", // class to remove default margin from left and right side
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            verticalFit: true
        },
        zoom: {
            enabled: true,
            duration: 300 // don't foget to change the duration also in CSS
        }
    });

    $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
        disableOn: 700,
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });

})(jQuery);