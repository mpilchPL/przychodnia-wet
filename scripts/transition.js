var i = 0;
$('.servicesItem').each( function() {
    i++;
    
    if(window.innerWidth > 892) {
        if(i > 4) { i = 1 }
        if(i < 3) {
            $(this).addClass('b-item-dark');
        }
    }
    else {
        if(i%2 != 0) {
            $(this).addClass('b-item-dark');
        }
    }
});



$('.doc').hover(function () {
    // over
    if(window.innerWidth > 1080)
        $(this).addClass('docShadow');
        
    },
    // out
    function () {
        $('.doc').removeClass('docShadow');
    }
);


$('.docIcon').hover(function () {
        // over
        $(this).children().addClass('c-highlighted');
    }, function () {
        // out
        $(this).children().removeClass('c-highlighted');
    }
);