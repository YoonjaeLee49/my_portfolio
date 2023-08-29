$(function (){
    const $body = $("body");
    const $toggle = $("#toggle");
    const $Slider = $("#slider");
    const $works = $("#works");
    const $contentsWrap = $(".contents .contentsWrap")
    const $imgModal = $(".layerPop .imgModal")
    let $win = $(window);
    let $winW = $(window).innerWidth();
    let $winH = $(window).innerHeight();
    let scrollH = 0;
    let device = ($winW <= 440) ? "mobile" : ($winW > 440 && $winW <= 768) ? "tablet" : "pc";
    let hasDevice = device;



    // ---------- DarkMode / LightMode ---------- //
    // 페이지 로딩 시 색상 모드 설정
    const colorMode = localStorage.getItem('colorMode');
    if (colorMode === 'dark') {
        setDark();
    } else {
        setLight();
    }

    // 토글 클릭 이벤트
    $toggle.on('change', function () {
        changeMode();
    });

    function changeMode() {
        if ($body.hasClass('darkMode')) {
            localStorage.setItem('colorMode', 'light');
            setLight();
        } else {
            localStorage.setItem('colorMode', 'dark');
            setDark();
        }
    }

    function setDark() {
        $body.removeClass('lightMode'); // Remove the 'lightMode' class
        $body.addClass('darkMode');
        $toggle.prop('checked', false);
    }

    function setLight() {
        $body.removeClass('darkMode'); // Remove the 'darkMode' class
        $body.addClass('lightMode');
        $toggle.prop('checked', true);
    }



    // ---------- FollowCursor ---------- //
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



    // ---------- Scroll Event ---------- //
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

    $win.on("scroll", function (){
        scrollH = $(this).scrollTop();
        scrollEvent();
    });



    // ----------- Header menuPop ---------- //
    $(".popupBtn").on("click", function () {
        $(".popupBtn").toggleClass("on");
        $(".menuPop").fadeToggle();
    });

    $(".menuPop ul li").on("click", function (){
        $(".menuPop").fadeOut();
        $(".popupBtn").removeClass("on");
    });



    // ---------- Works Section Slider ---------- //
    $Slider.slick({
        arrows: true,
        prevArrow: $works.find(".prevArrow"),
        nextArrow: $works.find(".nextArrow"),

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
    });



    // ---------- Contents Section PopUp ----------//
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



    // ---------- reload ---------- //
    function checkDevice() {  // window width 를 확인해서 해당하는 장치를 문자로 할당 받는 함수
        device = ($winW <= 440) ? "mobile" : ($winW > 440 && $winW <= 768) ? "tablet" : "pc";
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
});
