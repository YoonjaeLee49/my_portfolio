$(function (){
    const $event = $(".event");
    const $eventSlider = $(".event #eventSlider");
    const $recommend = $(".recommend");
    const $bookSlider = $(".recommend #bookSlider");


    $event.find($eventSlider).on("init", function (event, slick){
       $event.find(".paging").text((slick.currentSlide+1) + "/" + slick.slideCount);
    });

    $eventSlider.slick({
        arrows: true,
        prevArrow: $event.find(".prevArrow"),
        nextArrow: $event.find(".nextArrow"),

        autoplay: true,
        infinite: true,
        speed: 300,
        autoplaySpeed : 2500,
    });

    $bookSlider.slick({
        arrows: true,
        prevArrow: $recommend.find(".prevArrow"),
        nextArrow: $recommend.find(".nextArrow"),

        slidesToShow: 4,
        variableWidth: true,
    });

    $event.find($eventSlider).on("beforeChange", function (event, slick, current, next){
        $event.find(".paging").text((next+1) + "/" + slick.slideCount);
    });
});