$(function (){
    // dark mode
    const $body = $("body");
    const $toggle = $(".toggleSwitch");
    // const $toggleBtn = $(".toggleButton");
    const colorMode = localStorage.getItem('colorMode');

    if (colorMode === 'dark') {
        setDark();
    } else {
        setLight();
    }

    $toggle.on('click', function () {
        changeMode();
    });

    function changeMode() {
        if ($body.hasClass('lightMode')) {
            localStorage.setItem('colorMode', 'light');
            setLight();
        } else {
            localStorage.setItem('colorMode', 'dark');
            setDark();
        }
    }

    function setDark() {
        $body.addClass('lightMode');
        $toggle.prop('checked', true);
    }

    function setLight() {
        $body.removeClass('lightMode');
        $toggle.prop('checked', false);
    }

    const $Slider = $("#slider");
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
                width: 220 + "px",
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

    $(".contents").find(".show").click(function (e){
        e.preventDefault();
        $(".contentsWrap").slideToggle();
        $(this).find("i").toggleClass("active");
    });

    // $works.find("#imgSlider").on("init", function (event, slick){
    //     $works.find(".textArea .box").eq(slick.currentSlide).addClass("active");
    //
    //     $works.find(".progress").css({
    //         width:( (slick.currentSlide+1) / slick.slideCount) * 100 + "%",
    //     });
    // });


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

    $Slider.slick({
        arrows:false,

        centerMode: true,
        variableWidth: true,
        initialize: 1,

        infinite: true,
        focusOnSelect: true,

        dots: true,
        appendDots: $(".works").find(".dotsWrap"),
        dotsClass: "customDots",
    });



    $Slider.on("beforeChange", function (e, s, c, n){
        if (c !== n){
            $(".slick-current + .slick-cloned").each(function (i, v){
                const item = $(v);
                setTimeout(function (){
                    item.addClass("slick-current");
                    item.addClass("slick-active");
                });
            });
        }

        $works.find(".textArea .box").eq(n).addClass("active");
        $works.find(".textArea .box").eq(n).siblings().removeClass("active");

        $works.find(".progress").css({
            width:( (n+1) / s.slideCount) * 100 + "%",
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

    $win.on("scroll", function (){
        scrollH = $(this).scrollTop();
        scrollEvent();
    });


    let device = ($winW <= 480) ? "mobile" : ($winW > 480 && $winW <= 768) ? "tablet" : "pc";
    let hasDevice = device;

    function checkDevice() {  // window width 를 확인해서 해당하는 장치를 문자로 할당 받는 함수
        device = ($winW <= 480) ? "mobile" : ($winW > 480 && $winW <= 768) ? "tablet" : "pc";


        // 위 코드는 아래 조건문과 동일함

        // if ($winW <= 480) {
        //     device = "mobile";
        // } else if ($winW > 480 && $winW <= 768) {
        //     device = "tablet";
        // } else {
        //     device = "pc";
        // }
    }

    function reloadEvent() { // 이전 장치와 현재 장치가 같다면 리턴으로 함수를 즉시 종료시키고 다를때 한번만 새로고침됨
        if (hasDevice === device) return;
        document.location.reload();
        hasDevice = device; // 변경된 장치를 다시 이전 장치값으로 할당
    }


    $win.on("resize", function (){
        $winW = $win.innerWidth();
        scrollH = $win.scrollTop();
        $winH = $win.innerHeight();

        scrollEvent();

        checkDevice(); // 1
        reloadEvent(); // 2
    });


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
    scrollEvent();

    $(".popupBtn").on("click", function () {
        $(".popupBtn").toggleClass("on");
        $(".menuPop").fadeToggle();
    });

    $(".menuPop ul li").on("click", function (){
        $(".menuPop").fadeOut();
        $(".popupBtn").removeClass("on");
    });


    // window.onresize = function(){
    //     document.location.reload();
    // };

    // if(window.matchMedia("(min-width: 1024px)").matches) {
    //     mousemoveEvent();
    //     scrollEvent();
    // } else {
    //     console.log("size not pc");
    // }

    // if ($winW >= 1024) {
    //     mousemoveEvent();
    //     scrollEvent();
    // }

});
