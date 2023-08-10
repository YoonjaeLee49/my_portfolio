$(function (){
    const $headerBtm = $(".header .headerBtm");
    const $depth2 = $(".headerBtm .gnb .depth2");

    function hoverHeaderEvent() {
        // $gnb.css("display", "inline-block");

        $headerBtm.on("mouseenter", function (){
            $(this).addClass("active");
            // $depth2.addClass("active");
        });

        $headerBtm.on("mouseleave", function (){
            $(this).removeClass("active");
            // $depth2.removeClass("active");
        });
    }

    hoverHeaderEvent();


    $(function (){
        const accordion = $(".subMenuCommon .menuAccordion");

        accordion.find("li .menu").on("click", function (){
            const li = $(this).closest("li");
            li.find(".subMenu").slideToggle();
            li.siblings().find(".subMenu").slideUp();
            li.find("i").toggleClass("active");
            li.siblings().find("i").removeClass("active");
            $(this).addClass("on");
            li.siblings().find(".menu").removeClass("on");
        })
    });
});