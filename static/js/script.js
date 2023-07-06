/*Copyrights !GEC Designs!All rights reserved Web designs* https://gecdesigns.com/-->/*
-----------------------------------------------------------------------------------

    Theme Name: Fashion
    Theme URI: http://
    Description: Onepage Template
    Author: gecdesigns    

-----------------------------------------------------------------------------------*/

/*=================================================
 == Table Of Content

    1. PRELOADER
    2. SCROLLIT
    3. NAVBAR
    4. SCROLL TO TOP 
    5. PHOTOGRAPHY
    6. OWLCAROUSEL
    7. VALIDATOR

*/

$(function () {
    "use strict";
    var wind = $(window);

    /*============= PRELOADER ============= */
    $(document).ready(function () {

        // Fakes the loading setting a timeout
        setTimeout(function () {
            $('body').addClass('loaded');
        }, 1500);

    });
    /*============= SCROLLIT ============= */
    $.scrollIt({
        upKey: 38, // key code to navigate to the next section
        downKey: 40, // key code to navigate to the previous section
        easing: 'swing', // the easing function for animation
        scrollTime: 600, // how long (in ms) the animation takes
        activeClass: 'active', // class given to the active nav element
        onPageChange: null, // function(pageIndex) that is called when page is changed
        topOffset: -70 // offste (in px) for fixed top navigation
    });

    /*============= NAVBAR ============= */

    // close navbar-collapse when a  clicked
    $(".navbar-nav a").on('click', function () {
        $(".navbar-collapse").removeClass("show");
    });

});

/*============= SCROLL TO TOP ============= */
$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('#scroll-to-top').fadeIn();
        } else {
            $('#scroll-to-top').fadeOut();
        }
    });
    // scroll body to 0px on click
    $('#scroll-to-top').click(function () {
        $('#scroll-to-top').tooltip('hide');
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
});

/*============= PHOTOGRAPHY ============= */

//slideshow style interval
var autoSwap = setInterval(swap, 3500);

//pause slideshow and reinstantiate on mouseout
$('ul, span').hover(
    function () {
        clearInterval(autoSwap);
    },
    function () {
        autoSwap = setInterval(swap, 3500);
    });

//global variables
var items = [];
var startItem = 1;
var position = 0;
var itemCount = $('.carousel li.items').length;
var leftpos = itemCount;
var resetCount = itemCount;

//unused: gather text inside items class
$('li.items').each(function (index) {
    items[index] = $(this).text();
});

//swap images function
function swap(action) {
    var direction = action;

    //moving carousel backwards
    if (direction == 'counter-clockwise') {
        var leftitem = $('.left-pos').attr('id') - 1;
        if (leftitem == 0) {
            leftitem = itemCount;
        }

        $('.right-pos').removeClass('right-pos').addClass('back-pos');
        $('.main-pos').removeClass('main-pos').addClass('right-pos');
        $('.left-pos').removeClass('left-pos').addClass('main-pos');
        $('#' + leftitem + '').removeClass('back-pos').addClass('left-pos');

        startItem--;
        if (startItem < 1) {
            startItem = itemCount;
        }
    }

    //moving carousel forward
    if (direction == 'clockwise' || direction == '' || direction == null) {
        function pos(positionvalue) {
            if (positionvalue != 'leftposition') {
                //increment image list id
                position++;

                //if final result is greater than image count, reset position.
                if ((startItem + position) > resetCount) {
                    position = 1 - startItem;
                }
            }

            //setting the left positioned item
            if (positionvalue == 'leftposition') {
                //left positioned image should always be one left than main positioned image.
                position = startItem - 1;

                //reset last image in list to left position if first image is in main position
                if (position < 1) {
                    position = itemCount;
                }
            }

            return position;
        }

        $('#' + startItem + '').removeClass('main-pos').addClass('left-pos');
        $('#' + (startItem + pos()) + '').removeClass('right-pos').addClass('main-pos');
        $('#' + (startItem + pos()) + '').removeClass('back-pos').addClass('right-pos');
        $('#' + pos('leftposition') + '').removeClass('left-pos').addClass('back-pos');

        startItem++;
        position = 0;
        if (startItem > itemCount) {
            startItem = 1;
        }
    }
}
//next button click function
$('#next').click(function () {
    swap('clockwise');
});

//prev button click function
$('#prev').click(function () {
    swap('counter-clockwise');
});

//if any visible items are clicked
$('li').click(function () {
    if ($(this).attr('class') == 'items left-pos') {
        swap('counter-clockwise');
    } else {
        swap('clockwise');
    }
});

/*========= OWLCAROUSEL =========*/

$('.gallery .owl-carousel').owlCarousel({
    loop: true,
    items: 1,
    margin: 30,
    mouseDrag: false,
    autoplay: true,
    dots: false,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    smartSpeed: 500
});

/*========= VALIDATOR =========*/

// contact form validator
$('#contact-form').validator();

$('#contact-form').on('submit', function (e) {
    if (!e.isDefaultPrevented()) {
        var url = "contact.php";

        $.ajax({
            type: "POST",
            url: url,
            data: $(this).serialize(),
            success: function (data) {
                var messageAlert = 'alert-' + data.type;
                var messageText = data.message;

                var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                if (messageAlert && messageText) {
                    $('#contact-form').find('.messages').html(alertBox);
                    $('#contact-form')[0].reset();
                }
            }
        });
        return false;
    }
});
