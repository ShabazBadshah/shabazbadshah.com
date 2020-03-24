$(function() {
   smoothScroll(750);
   mobileNav();
});

function smoothScroll (duration) {
   $('a[href^="#"]').on('click', function(event) {

         var target = $( $(this).attr('href') );

         if( target.length ) {
            event.preventDefault();
            var header_height = $('header').height();
            var target_offset = target.offset().top-header_height;

            if ($(window).width() > 775) {
               target_offset = target.offset().top;
            }

            $('html, body').animate({
               scrollTop: target_offset
            }, duration);
            var status = $(this).hasClass('is-open');
            if(!status){
               $('.mobile-nav-toggle, .mobile-nav').removeClass('is-open');
             }
            else { $('.mobile-nav-toggle, .mobile-nav').addClass('is-open'); }
         }
   });
}

function mobileNav() {
  $('.mobile-nav-toggle').on('click', function(){
    var status = $(this).hasClass('is-open');
    if(status){
       $('.mobile-nav-toggle, .mobile-nav').removeClass('is-open');
     }
    else { $('.mobile-nav-toggle, .mobile-nav').addClass('is-open'); }
  });
}
