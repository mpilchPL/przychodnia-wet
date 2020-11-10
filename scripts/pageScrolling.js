const os = -70;
jQuery(function($) {

    
    $('#link1').click(function() { $.scrollTo($('#aboutUs'), {duration: 500, offset: os}); });
    $('#link2').click(function() { $.scrollTo($('#services'), {duration: 500, offset: os}); });
    $('#link3').click(function() { $.scrollTo($('#doctors'), {duration: 500, offset: os}); });
    $('#link4').click(function() { $.scrollTo($('#footer'), {duration: 500, offset: os}); });
    
    $('#scrollup').click(function() { $.scrollTo($('body'), 500); });
}
);

$(window).scroll(
    function() {
        if($(this).scrollTop() > 300) {
            $('.scrollup').fadeIn();

            //navbar oapcity
           // $('.navbar').fadeTo("slow", 0.6);
            jqfade
        }
            
        else {
           $('.scrollup').fadeOut(); 

           //navbar oapcity
           //$('.navbar').fadeTo("slow", 1);
        }
            
    }
    
);

