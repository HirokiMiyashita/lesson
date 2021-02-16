//window.addEventListener('scroll', () => {
//    console.log('スクロール', window.scrollX, window.scrollY);
//    if (window.scrollY >= 450) {
//        console.log('緑が出たよ！');
//        $('li').each(function (index, element) {
//            $(this).text(index);
//            $('.box3').css('opacity', '1').delay(800).fadeIn(400);
//        });
//
//    }
//});
window.addEventListener('scroll', () => {
    if (window.scrollY >= 450) {
        $(function () {
            $('ul.delay-show li')
                .css({
                    opacity: 0
                })
                .each(function (i) {
                    $(this).delay(500 * i).animate({
                        opacity: 1
                    }, 1500);
                });
        });
    }
});
