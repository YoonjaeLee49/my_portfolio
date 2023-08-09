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

    // $headerBtm.mouseenter(function (){
    //     $depth2.css("display", "block");
    //     $depth2.slideDown(400);
    // })

});

// function hoverHeaderEvent() {
//     const $headerGnb= $(".headerBottom");
//
//     // $headerBottom.find(".headerGnb").css("display", "inline-block");
//     $headerGnb.on("mouseenter", function () {
//         $(this).addClass("active");
//         // $(".headerBottom").addClass("active");
//     });
//     $headerGnb.on("mouseleave", function () {
//         $(this).removeClass("active");
//         // $(".headerBottom").removeClass("active");
//     });
// }