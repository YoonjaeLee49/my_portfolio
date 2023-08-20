$(function (){
    const $mainSection = $(".mainSection");
    const $eventSlider = $(".mainSection #eventSlider");
    const $recommend = $(".recommend");
    const $bookSlider = $(".recommend #bookSlider");


    $mainSection.find($eventSlider).on("init", function (event, slick){
        $mainSection.find(".paging").text((slick.currentSlide+1) + "/" + slick.slideCount);
    });

    $eventSlider.slick({
        arrows: true,
        prevArrow: $mainSection.find(".prevArrow"),
        nextArrow: $mainSection.find(".nextArrow"),

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

    $mainSection.find($eventSlider).on("beforeChange", function (event, slick, current, next){
        $mainSection.find(".paging").text((next+1) + "/" + slick.slideCount);
    });
});