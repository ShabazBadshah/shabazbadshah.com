let logo, logoHolder;
let nav;
let homeSection, aboutSection, portfolioSection;
let navOpen = false;
let currPage = 'home';

$(() => {
  setupInitialViewState();
  setupNav();

  setInterval(() => {
    $('.ion-ios-arrow-thin-left')
    .animate({"left": "50px"}, 250)
    .animate({"left": "1px"}, 250);
  }, 1000);
});

setupInitialViewState = () => {
  homeSection     = $('#home.content-wrap');
  aboutSection     = $('#about.content-wrap');
  portfolioSection = $('#portfolio.content-wrap');

  aboutSection.hide();
  portfolioSection.hide();
  homeSection.show();
}

setupNav = () => {
  closeNav();
  setupInitialViewState();

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
		'height': '80px'
	});

	logo.css({
		'width': Math.floor(nav.width() / 2),
		'height': '100px'
  });
}

openNav = () => {
  $('#sidebar').css({
    'margin-left': 0,
    'z-index': 100
  });

  $('#logo').fadeIn(1000);
  navOpen = true;
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
  navOpen = false;
}

switchPage = (e) => {  
  homeSection.fadeOut(500);
  aboutSection.fadeOut(500);
  portfolioSection.fadeOut(500);

  setTimeout(() => closeNav(), 250);

  setTimeout(() => {
    switch (e.target.innerHTML.toLowerCase()) {
      case 'home':
        homeSection.fadeIn(500);
        currPage = 'homePage';
        break;
      case 'about me':
        aboutSection.fadeIn(500);
        currPage = 'aboutPage';
        break;
      case 'portfolio':
        portfolioSection.fadeIn(500);
        currPage = 'portfolioPage';
        break;
    }
  }, 500);
  
}