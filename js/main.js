$(function (){

    const $imgSlider = $("#imgSlider");
    const $works = $("#works");

    const $contentsWrap = $(".contents .contentsWrap")
    const $imgModal = $(".layerPop .imgModal")

    $contentsWrap.find("button").on("click", function (){
        $("body").addClass("popupOn");

        const $imgSrc = $(this).siblings("img").attr("src").replace("-dark", "");
        console.log($imgSrc);
        $imgModal.find("img").attr("src", $imgSrc);

        const index = $(this).closest("div").index();
        if (index === 8 || index === 9){
            $imgModal.find("img").css({
                width: 270 + "px",
            });
        } else {
            $imgModal.find("img").css({
                width: "",
            });
        }

        $imgModal.show();
    });


    $imgModal.find(".close").on("click", function (){
        $("body").removeClass("popupOn");
        $imgModal.hide();
    });

    $works.find("#imgSlider").on("init", function (event, slick){
        $works.find(".textArea .box").eq(slick.currentSlide).addClass("active");

        $works.find(".progress").css({
            width:( (slick.currentSlide+1) / slick.slideCount) * 100 + "%",
        });
    });


    setTimeout(function (){
        $(".intro .textWrap").addClass("on");
    }, 1000);

    setTimeout(function (){
        $(".intro").addClass("on");
    }, 1000);

    $(".textCard .card").on("mouseenter", function() {
        $(this).addClass("on");
    }).on("mouseleave", function() {
        $(this).removeClass("on");
    });

    $imgSlider.slick({
        arrows:false,

        variableWidth: true,

        centerMode: true,
        initialize: 1,
        // centerPadding: "200px",

        dots: true,
        appendDots: $(".works").find(".dotsWrap"),
        dotsClass: "customDots",
    });

    // $(".contents").find(".contentsWrap").slick({
    //     centerMode: true,
    //     slidesToShow: 3,
    //     centerPadding: "10px",
    // });

    $works.find("#imgSlider").on("beforeChange", function (event, slick, current, next){
        $works.find(".textArea .box").eq(next).addClass("active");
        $works.find(".textArea .box").eq(next).siblings().removeClass("active");

        $works.find(".progress").css({
            width:( (next+1) / slick.slideCount) * 100 + "%",
        });
    });


    let $win = $(window);
    let $winW = $(window).innerWidth();
    let $winH = $(window).innerHeight();
    let scrollH = 0;

    function mousemoveEvent(){
        const $cursor = $(".followCursor");
        const mousePos = {
            x: 0,
            y: 0,
        }

        $win.on("mousemove", function (event){
            mousePos.x = event.clientX;
            mousePos.y = event.clientY;

            $cursor.css({
                left: mousePos.x,
                top: mousePos.y,
            });
        });
    }
    mousemoveEvent();

    $(window).on("scroll", function (){
        scrollH = $(this).scrollTop();
        scrollEvent();
    });

    $(window).on("resize", function (){
        $winW = $win.innerWidth();
        scrollH = $(window).scrollTop();
        $winH = $win.innerHeight();
        scrollEvent();
    });

    scrollEvent();

    function scrollEvent(){
        const aniItem = $("section .ani");

        for (let i=0; i < aniItem.length; i++){
            if (scrollH + $winH > aniItem.eq(i).offset().top + 200){
                aniItem.eq(i).addClass("on");
            } else {
                aniItem.eq(i).removeClass("on");
            }
        }
    }

    $(".popupBtn").on("click", function () {
        $(".popupBtn").toggleClass("on");
        $(".menuPop").fadeToggle();
    });

    $(".menuPop ul li").on("click", function (){
       $(".menuPop").fadeOut();
       $(".popupBtn").removeClass("on");
    });


    if(matchMedia("screen and (max-width: 480px)").matches){
        console.log("mobile");
        // $(".contents").find(".contentsWrap").slick();
    }else if (matchMedia("screen and (max-width: 768px)").matches){
        console.log("tablet");
    } else if(matchMedia("screen and (max-width: 1024px)").matches){
        console.log("laptop");
    }else if(matchMedia("screen and (min-width: 1025px)").matches){
        console.log("desktop");
    }

    window.onresize = function(){
        document.location.reload();
    };

});
