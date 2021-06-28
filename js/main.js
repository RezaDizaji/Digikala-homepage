
function nav() {

    const regArrow = document.querySelector('.registration>i');
    const user_dropDown = document.querySelector('.user');


    regArrow.addEventListener("click", function () {
        user_dropDown.classList.toggle("active");
    });

    document.addEventListener("click", function (event) {
        if (!event.target.closest(".toggle")) {
            const activeElements = document.querySelectorAll('.active');
            activeElements.forEach(element =>
                element.classList.remove("active")
            );
        }
    });


    // mobile menu dropdown toggle
    function mobileToggle () {
        // variables needed to open submenus
        let toggles = document.querySelectorAll('.mobile-dropDownToggle');
        let subMenus = document.querySelectorAll('.subMenu');

        // open submenus using arrow down
        for (let i = 0; i<toggles.length; i++) {
            toggles[i].addEventListener('click', function () {
                subMenus[i].classList.toggle('opened');
            })
        }

//    black overlay and using it to close menu
        let overlay = document.querySelector('header .overlay');
        let burgerToggle = document.querySelector('.hamburgerMenu');
        let secondNav = document.querySelector('#second-nav');
        let body = document.querySelector('body');

        // opening menu and showing black overlay under it
        burgerToggle.addEventListener('click', function () {
            overlay.style.visibility = 'visible';
            secondNav.classList.add('opened');
            body.style.overflow = 'hidden';
        });
    //    click black overlay and close menu
        overlay.addEventListener('click', function () {
            overlay.style.visibility = 'hidden';
            secondNav.classList.remove('opened');
            body.style.overflow = 'initial';
        })
    }
    mobileToggle();
}

nav();

// featured section slide
let section1_featured = new Swiper('.featured_swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    effect: 'fade',
    slidesPerView: 1,

    //autoplay
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },

    fadeEffect: {
        crossFade: true
    },

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

});


function featured() {
    // discounts section slide
    var section1_discounts = new Swiper('.discounts_swiper-container', {
        // Optional parameters
        direction: 'vertical',
        loop: true,
        observer: true,
        observeSlideChildren: true,

        fadeEffect: {
            crossFade: true
        },

        //autoplay
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
    });


    // discounts section slide's navigation
    function section1_discounts_nav() {

        //nav links targets
        document.querySelector('.discounts_nav-1').addEventListener('click', function (e) {
            e.preventDefault();
            section1_discounts.slideTo(1, 0);
        });

        document.querySelector('.discounts_nav-2').addEventListener('click', function (e) {
            e.preventDefault();
            section1_discounts.slideTo(2, 0);
        });

        //        nav links target class add/remove

        // initialize observer function to observe active slide
        // and link it to it's relative button
        let discounts_mutationObserver = new MutationObserver(function (mutations) {
            mutations.forEach(function () {
                let slideIndex = parseInt(section1_discounts.realIndex);
                let links = document.querySelectorAll("#section-1__discounts .discounts_nav");
                links.forEach(function (link) {
                    let linkIndex = link.getAttribute("slide-number");
                    linkIndex = parseInt(linkIndex);

                    link.classList.remove("active");
                    if (slideIndex === linkIndex) {
                        link.classList.add("active");
                    }
                });
            });
        });

        // observe discounts section slide
        let slides = document.querySelectorAll("#section-1__discounts .swiper-slide");
        slides.forEach(function (slide) {
            discounts_mutationObserver.observe(slide, {
                attributes: true
            });
        });


        // timer function
        function timer(timerHours, parentElementID) {
            let hours, minutes, seconds;
            let endDate = new Date().getTime();
            endDate = endDate + (parseInt(timerHours) * 3600000);

//    just to be sure endDate is valid and weird things don't show up
            if (isNaN(endDate)) return;

//    show time every second
            setInterval(calculateTime, 1000);

//    calculations function
            function calculateTime() {
                section1_discounts.update();

                let startDate = new Date();
                startDate = startDate.getTime();

                let remainingTime = parseInt((endDate - startDate) / 1000);

                if (remainingTime > 0) {
                    hours = parseInt(remainingTime / (60 * 60));
                    remainingTime = remainingTime % (60 * 60);
                    minutes = parseInt(remainingTime / 60);
                    remainingTime = remainingTime % 60;
                    seconds = parseInt(remainingTime);
                }
                let hoursElements = document.querySelectorAll(`.${parentElementID} .hours`);
                let minutesElements = document.querySelectorAll(`.${parentElementID} .minutes`);
                let secondsElements = document.querySelectorAll(`.${parentElementID} .seconds`);

                hoursElements.forEach(function (hoursElement) {
                    hoursElement.innerHTML = parseInt(hours, 10);
                });
                minutesElements.forEach(function (minutesElement) {
                    minutesElement.innerHTML = ("0" + minutes).slice(-2);
                });
                secondsElements.forEach(function (secondsElement) {
                    secondsElement.innerHTML = ("0" + seconds).slice(-2);
                });
            }
        }

        timer(3, 'timer-1');
        timer(1, 'timer-2');


    }

    section1_discounts_nav();
}

featured();


// phones section slide
let phonesSlide = new Swiper('.slider-1 .swiper-container', {
    speed: 400,
    // loop: true,
    spaceBetween: 20,
    slidesPerView: 4,
    grabCursor: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        // when window width is <= 480px
        480: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        // when window width is <= 1000px
        1000: {
            slidesPerView: 3,
            spaceBetween: 30
        },
    },
});


// momentary suggestions slide
function momentarySuggestions() {
    let autoplayValue = 6000;

// momentary suggestions slide initialization
    let slider = new Swiper('.slider-2 .swiper-container', {
        centeredSlides: true,
        allowTouchMove: false,
        loop: true,
        autoplay: {
            delay: autoplayValue,
        },
        on: {
            progress: momentarySuggestionsSlider
        },
    });

    let slideSwiper = document.querySelector('.slider-2 .swiper-container').swiper;


    function momentarySuggestionsSlider() {
        let slideContainer = document.querySelector('.slider-2 .swiper-container');
        let progressBar = document.querySelector('.slider-2 span');
        let hoveredOnSlider = false;
        let intervalTime = autoplayValue / 100;
        let progressBarWidth = 0;
        let i = 2.02;


        let mainInterval = setInterval(progress, intervalTime);

        function progress() {
            slideContainer.addEventListener('mouseover', function () {
                slideSwiper.autoplay.stop();
                hoveredOnSlider = true;
            });
            slideContainer.addEventListener('mouseout', function () {
                slideSwiper.autoplay.start();
                hoveredOnSlider = false;
            });
            if (progressBarWidth >= 100 || i <= 0) {
                clearInterval(mainInterval);
            } else if (progressBarWidth < 100 && !hoveredOnSlider) {
                i = i - 0.02;
                progressBarWidth+=i;
                progressBar.style.width = `${progressBarWidth}%`;
            }
        }
    }
}

momentarySuggestions();