let logo, logoHolder;
let nav;

$(() => {
  setupNav();

  setInterval(() => {
    $('.ion-ios-arrow-thin-left')
    .animate({"left": "50px"}, 250)
    .animate({"left": "1px"}, 250);
  }, 1000);
});

setupNav = () => {
  closeNav();

  $('#nav-toggle-icon').click(() => openNav());

  $('.ion-ios-arrow-thin-left').click(() => {
    if (!navOpen) openNav();
    else closeNav();
  });

  $('#nav-root-wrapper').mouseenter(() => openNav());
  $('#nav-root-wrapper').mouseleave(() => closeNav());

  $('#nav-list > li a').click((e) => switchPage(e));

  nav = $('#sidebar');
	logoHolder = $('#logo-holder');
  logo = $('#logo');
  
  logoHolder.css({
		'width': nav.width(),
		'height': '60px'
	});

	logo.css({
		'width': Math.floor(nav.width() / 2),
		'height': '60px'
  });
}

openNav = () => {
  $('#sidebar').css({
    'margin-left': 0,
    'z-index': 100
  });

  $('.content-wrap').fadeOut(250);
  $('#logo').fadeIn(1000);
}

closeNav = () => {
  $('#nav-toggle-icon').css({
    'margin-left': parseInt($('#nav-toggle-icon').css('margin-right'))
  });

  let sidebarWidth = $('#sidebar').width();
  $('#sidebar').css({
    'margin-left': -sidebarWidth
  });

  $('#logo').fadeOut(500);
  $('.content-wrap').fadeIn(250);
}
