// Header switcher
$('.building-switcher__item').on('click', function (e) {
    e.preventDefault()
    $(this).addClass('building-switcher__item_active')
    $(this).siblings().removeClass('building-switcher__item_active')
})


// Header menu switcher
$('#header__drop-menu').on('click', function (e) {
    e.preventDefault()
    alert('There was no menu in the layout (Figma)')
})


// Header - Fixed
const getCoords = (elem) => {
    let box = elem[0].getBoundingClientRect();

    return {
        top: box.top + window.pageYOffset,
    };
}

$(document).scroll(() => {
    getCoords($('header')).top > 10 ? $('header').addClass('header_fixed') : $('header').removeClass('header_fixed')
})


// Order Ball
$(document).ready(() => {
    const btnOrder = $('#btn-order');
    const btnOrderText = $('#btn-order .btn-order__text-wrap');

    let btnFromTop = btnOrder[0].getBoundingClientRect().bottom
    let halfWindowWidth = $(window).width() / 2

    $( window ).on( 'resize', () => {
        btnFromTop = btnOrder[0].getBoundingClientRect().bottom
        halfWindowWidth = $(window).width() / 2

    })

    const elemCenter = (elem) => {
        let elemCenterTop = elem.height() / 2 + 1;
        let elemCenterLeft = elem.width() / 2 + 1;

        return {
            top: elemCenterTop,
            left: elemCenterLeft,
        }
    };


    btnOrder.on('mousemove', function (e) {
        const elemSensitivity = {
            btn: 0.5,
            btnText: 0.2,
        }
        const mousePos = {
            x: e.clientX,
            y: e.clientY,
        }

        btnOrder.css({
            'transform' : 'translate(' +
                ( (mousePos.x - halfWindowWidth) * elemSensitivity.btn ) + 'px,' +
                ( (mousePos.y - btnFromTop + elemCenter(btnOrder).top) * elemSensitivity.btn ) + 'px)'
        });

        btnOrderText.css({
            'transform' : 'translate(' +
                ( (mousePos.x - halfWindowWidth) * elemSensitivity.btnText ) + 'px,' +
                ( (mousePos.y - btnFromTop + elemCenter(btnOrder).top) * elemSensitivity.btnText ) + 'px)'
        });
    });

    btnOrder.on('mouseenter', function (e) {
        btnOrder.addClass('btn-order_active')
    });

    btnOrder.on('mouseleave', function (e) {
        btnOrder.removeClass('btn-order_active')
        btnOrder.css({
            'transform' : 'translate(0, 0)',
        })
        btnOrderText.css({
            'transform' : 'translate(0, 0)',
        })
    });

    $(document).scroll(() => {
        getCoords(btnOrder).top > $(window).height() ? btnOrder.addClass('btn-order_scrolled') : btnOrder.removeClass('btn-order_scrolled')
    })
});