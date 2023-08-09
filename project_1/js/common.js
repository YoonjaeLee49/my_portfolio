
$(function() {

    let $win = $(window);
    let $winWidth = $win.innerWidth();
    let scrollTop = 0;

    $(window).on("scroll", function() {
        scrollTop = $(this).scrollTop();
        scrollHeaderEvent();
    });

    $(window).on("resize", function() {
        $winWidth = $win.innerWidth();
        scrollHeaderEvent();
        hoverHeaderEvent();
    });

    scrollHeaderEvent();
    hoverHeaderEvent();

    function hoverHeaderEvent() {
        const $header = $(".header");

        if ($winWidth > 768) {
            $header.find("nav").css("display", "inline-block");
            $header.on("mouseenter", function () {
                $(this).addClass("active");
            });
            $header.on("mouseleave", function () {
                $(this).removeClass("active");
            });
        } else {
            $header.find("nav").css("display", "none");
            $header.off("mouseenter");
        }
    }

    function scrollHeaderEvent() {
        if (scrollTop > 200) {
            $(".header").addClass("on");
        } else {
            $(".header").removeClass("on");
        }
    }

});
