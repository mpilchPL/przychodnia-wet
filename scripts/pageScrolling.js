const os = -40;
jQuery(function($) {

    
    $('#link1').click(function() { $.scrollTo($('#aboutUs'), {duration: 500, offset: os}); });
    $('#link2').click(function() { $.scrollTo($('#services'), {duration: 500, offset: os}); });
    $('#link3').click(function() { $.scrollTo($('#doctors'), {duration: 500, offset: os}); });
    $('#link4').click(function() { $.scrollTo($('#footer'), {duration: 500, offset: os}); });
    
    $('#scrollup').click(function() { $.scrollTo($('body'), 500); });
}
);

// $(window).scroll(
//     function() {
//         if($(this).scrollTop() > 300) {
//             //$('.scrollup').fadeIn();

//             //navbar oapcity
//           //$('.navbar').addClass('opacity-1');
//            //$('.navbar').fadeTo(500, 0.3);
//         //    $('.navbar').fadeOut();
//         $(".navbar").animate({opacity: "0.2"});
//         }
            
//         else {
//            //$('.scrollup').fadeOut(); 
//            //navbar oapcity
//            //$('.navbar').removeClass('opacity-1');
//            //$('.navbar').animate({opacity: '1'}, slow)
//            //$('.navbar').fadeIn();
//           // $('.navbar').fadeTo(500, 0.3);
//         //   $(".sectionA").stop();
//           $(".navbar").animate({opacity: "1"});
//         }
            
//     }
    
// );

