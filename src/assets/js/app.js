function initGlider() {
    new Glider(document.querySelector('.carousel__list'), {
        slidesToScroll: 3,
        slidesToShow: 4,
        dots: '.carousel__flags',
        draggable: 'true',
        arrows: {
            prev: '.carousel__prev',
            next: '.carousel__next'
        },
        responsive: [
            {
                breakpoint: 230,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    duration: 0.25
                }
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    duration: 0.25
                }
            },
            {
                breakpoint: 994,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    duration: 0.25
                }
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                    duration: 0.25
                }
            }
        ]
    });
}