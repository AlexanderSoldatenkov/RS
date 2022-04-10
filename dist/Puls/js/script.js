$(document).ready(function () {


    function toggleSliderShow(item) {
        $(item).slick({
                speed: 800,
                slidesToShow: 1,
                adaptiveHeight: false,
                autoplay: false,
                autoplaySpeed: 2000,
                prevArrow: '<button type="button" class="slick-prev"><img src = "icons/chevron_left.png"></button>',
                nextArrow: '<button type="button" class="slick-next"><img src = "icons/chevron_right.png"></button>', 
                    responsive: [{
                        breakpoint: 992,
                        settings: {
                            arrows: false,
                            dots: true
                        },


                }]
        });
}

// let MH = $('.catalog__content_active').height();
// let minH = document.querySelectorAll('.catalog');
// minH.style.adaptiveHeight = String(MH);


let screenResolution = $(window).width();


if (screenResolution > 575) {
    toggleSliderShow('.carousel__inner');
    let swicher_1 = document.querySelectorAll('.carousel__inner_small');
    swicher_1.forEach(item => { // Перебор элементов в стиле
        item.style.display = 'none';
    });
} else {
    // document.querySelectorAll('.slick-dots').style.display = 'flex';
    toggleSliderShow('.carousel__inner_small');
    let swicher_2 = document.querySelectorAll('.carousel__inner');
    swicher_2.forEach(item => { // Перебор элементов в стиле
        item.style.display = 'none';
    });
}



$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
    $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
});

// $('.catalog-item__link').each(function(i) {
//     $(this).on('click', function (e) {
//         e.preventDefault();
//         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
//         $('catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
//     })
// });

// $('.catalog-item__back').each(function(i) {
//     $(this).on('click', function (e) {
//         e.preventDefault();
//         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
//         $('catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
//     })
// });

function toggleSlide(item) {
    $(item).each(function (i) {
        $(this).on('click', function (e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        });
    });
} 
toggleSlide('.catalog-item__link'); toggleSlide('.catalog-item__back');

// Modal
$('[data-modal=consultation]').on('click', function () {
    $('.overlay, #consultation').fadeIn('fast');
});

$('.modal__close').on('click', function () {
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
});

// $('.button_mini').on('click', function () {
//     $('.overlay, #order').fadeIn('fast');
// });

$('.button_mini').each(function (i) {
    $(this).on('click', function () {
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn('fast');
    });
});

// Валидация форм
function validateForms (form) {
    $(form).validate({
        rules: {
            name: 'required',
            phone: 'required',
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            name: "Пожалуйста введите свое имя",
            phone: 'Введите свой телефон',
            email: {
              required: "Пожалуйста введите свою почту",
              email: "Неправильно введен адрес почты"
            }
          }
    });
}

validateForms ('#consultation-form');

validateForms ('#consultation form');

validateForms ('#order form');
// Phone mask
$('input[name=phone]').mask("+7 (999) 999-99-99");

// Mail sender
$('form').submit(function (e) {
    e.preventDefault();

    if (!$(this).valid()) {
        return;
    }

    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function () {
        $(this).find("input").val('');
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');
    });
    return false;
});

new WOW().init();

});// End of module


// Smooth scroll and page up
$(window).scroll(function () {
    if ($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn();
    } else {
        $('.pageup').fadeOut();
    }
});



// const slider = tns({
//     container: '.carousel__inner',
//     items: 1,
//     slideBy: 'page',
//     autoplay: false,
//     controls: false,
//     nav: false

//     // controlsText: [
//     //     '<img src = "icons/chevron_left.png">', 
//     //     '<img src = "icons/chevron_right.png">'
//     // ]
//   });

//   document.querySelector('.slick-prev').addEventListener('click', function () {
//     slider.goTo('slick-prev');
//   });

//   document.querySelector('.slick-next').addEventListener('click', function () {
//     slider.goTo('slick-next');
//   });