// JavaScript Document 1.0.0
(function($) {
  "use strict";

  // get the next sibling that matches the selector
  // only processes the first item in the passed in jQuery object
  // designed to return a jQuery object containing 0 or 1 DOM elements
  jQuery.fn.findNext = function(selector) {return this.eq(0).nextAll(selector).eq(0);}
  jQuery.fn.findPrev = function(selector) {return this.eq(0).prevAll(selector).eq(0);}
  var osofvisitor = navigator.platform.toLowerCase();
  if ((osofvisitor.indexOf("mac") > -1)) {$('html').addClass('mac');} else {$('html').addClass('windows');}		

  var themeColor = $('body').attr('theme-color'),
      deviceSize = $('body').attr('device-size'),
      deviceStyle = $('body').attr('device-style'),
      playlist_src = "",
      PlayerOpenStyle,
      userProfileName,
      userProfileSurname,
      userProfileAvatar,
      userProfileCountry;



  //*** Control Panel ***//
  //**
  themeColor = $('body').attr('theme-color','rose'); // red, purple, blue, green, yellow, rose
  PlayerOpenStyle = 0;  // 0 Open big player then small player - 1 Open small player then big player
  userProfileName =  username //"Melissa";
  userProfileSurname = ""//"Rivera";
  userProfileAvatar = profile_avatar; //number of .jpg
  userProfileCountry = "Italy";
  //**
  //*** Control Panel ***//



  function bbflyOpacity() {
    $(".scrollable-content").animate({opacity: '1'}, 1000);
  }// end bbflyOpacity()

  function randomNumberFromRange(min,max){return Math.floor(Math.random()*(max-min+1)+min);}

  function bbflyStatusBar() {
    //bbflyAnimatedSection();
    function startTime() {
      var container = $('#status-bar #status-bar-time'),
          today = new Date(),
          h = today.getHours(),
          m = today.getMinutes(),
          h = checkTimeH(h),
          m = checkTime(m);
      container.text(h + ":" + m);
      var t = setTimeout(startTime, 1000);
    }
    function checkTimeH(i) {if (i < 10) {i = "" + i}; /* remove zero in front of hours < 10 */ return i;}
    function checkTime(i) {if (i < 10) {i = "0" + i}; /* add zero in front of minutes < 10 */ return i;}
    startTime();

    var iosStardardStatusBar = $.get('./static/Radio/script_templates/ios_standard_status_bar.html'),
        iosiPhoneXStatusBar = $.get('./static/Radio/script_templates/ios_iphoneX_status_bar.html'),
        StardardStatusBar = $.get('./static/Radio/script_templates/standard_status_bar.html'),
        iosHomeIndicator = $('<div class="home-indicator-container"><div class="main-grids tabbed-menu-grid"><div class="home-indicator"></div></div></div>'),
        deviceWidth = $(window).width(),
        deviceHeight = $(window).height();

    if (( ($('html').hasClass('mobile')) || ($('html').hasClass('tablet'))) && (deviceWidth == '375')) {
      $('body').attr("device-size", "iphone8");
    } else if ( (($('html').hasClass('mobile')) || ($('html').hasClass('tablet'))) && ((deviceWidth >= '360') && (deviceWidth < '375'))) {
      $('body').attr("device-size", "standard");
    } else if (( ($('html').hasClass('mobile')) || ($('html').hasClass('tablet'))) && ((deviceWidth == '375') && (deviceHeight == '812'))) {
      $('body').attr("device-size", "iphoneX");
    } else if ((($('html').hasClass('mobile')) || ($('html').hasClass('tablet'))) && (deviceWidth < '375') ) {
      $('body').attr("device-size", "iphoneSE");
    } else if ((($('html').hasClass('mobile')) || ($('html').hasClass('tablet'))) && ((deviceWidth > '375') && (deviceWidth < '700')) ) { 
      $('body').attr("device-size", "iphone8Plus");
    } else if ((($('html').hasClass('mobile')) || ($('html').hasClass('tablet'))) && (deviceWidth > '700') ) { 
      $('body').attr("device-size", "tablet");
    }

    setInterval(function(){
      var minNumber = 1,
          maxNumber = 4,
          randomNumber = randomNumberFromRange(minNumber, maxNumber);
      //function randomNumberFromRange(min,max){return Math.floor(Math.random()*(max-min+1)+min);}
      $('.signal svg g g path').attr('opacity','0.35');
      $('.signal svg g g path').slice( 0, randomNumber ).attr('opacity','1');
    }, 5000);
    setInterval(function(){
      var minNumber = 1,
          maxNumber = 3,
          randomNumber = randomNumberFromRange(minNumber, maxNumber);
      //function randomNumberFromRange(min,max){return Math.floor(Math.random()*(max-min+1)+min);}
      $('.wifi svg g g g path').attr('opacity','0.35');
      $('.wifi svg g g g path').slice( 0, randomNumber ).attr('opacity','1');
    }, 4000);

    // Loading Status Bar
    if( !$('#status-bar .status-bar-container').length > 0 ) {
      if ((deviceSize == 'iphoneX') && (deviceStyle == 'ios') && (deviceWidth == '375') && (deviceHeight == '812')) {
        $(iosiPhoneXStatusBar).html('#status-bar');
      } else if (deviceStyle == 'ios') {
        $(iosStardardStatusBar).html('#status-bar');
      } else {
        $(StardardStatusBar).html('#status-bar');
      }
    } else {}
    // Loading Home Indicator in iPhoneX
    if( !$('.home-indicator-container').length > 0 ) {
      if ((deviceSize == 'iphoneX') && (deviceStyle == 'ios') && (deviceWidth == '375') && (deviceHeight == '812')) {
        iosHomeIndicator.insertAfter('.tabbed-menu');
        $('.tabbed-menu').addClass('home-indicator-active');
      }
    }

    // Move Essential Search into the Homepage in the correct position
    $('.essential-search').prependTo('.pages');

    if ( ((deviceSize == 'iphoneX') && (deviceStyle == 'ios') && (deviceWidth == '375') && (deviceHeight == '812')) ) {
      iosHomeIndicator.insertAfter('.tabbed-menu');
      $('.tabbed-menu').addClass('home-indicator-active');
      $('.music-player-option .headers[header-type="standard"]').attr("header-style", "style5");
    } else {
      $('.home-indicator-container').remove();
      $('.tabbed-menu').removeClass('home-indicator-active');
      $('.music-player-option .headers[header-type="standard"]').attr("header-style", "style6");
    }

    // Updating the device and reloading the Status Bar to resize the page
    $(window).resize(function() {
      deviceWidth = $(window).width();
      deviceHeight = $(window).height();

      if ((deviceStyle == 'ios') && (deviceWidth == '375') && (deviceHeight == '667')) {
        $('.iphone-status-bar-container').remove(); 
        $('.iphoneX-status-bar-container').remove();
        $(iosStardardStatusBar).html('#status-bar');
        $('body').attr("device-size", "iphone8");
      } else if ((deviceStyle == 'ios') && ((deviceWidth >= '360') && (deviceWidth < '375')) ) {
        $('.iphone-status-bar-container').remove(); 
        $(iosStardardStatusBar).html('#status-bar');
        $('body').attr("device-size", "standard");
      } else if ((deviceStyle == 'ios') && (deviceWidth == '375') && (deviceHeight == '812')) {
        $('.iphone-status-bar-container').remove(); 
        $(iosiPhoneXStatusBar).html('#status-bar');
        $('body').attr("device-size", "iphoneX");
      } else if ((deviceStyle == 'ios') && (deviceWidth < '375')) {
        $('.iphoneX-status-bar-container').remove();
        $(iosStardardStatusBar).html('#status-bar');
        $('body').attr("device-size", "iphoneSE");
      } else if ((deviceStyle == 'ios') && (deviceWidth > '375')) {
        $('.iphoneX-status-bar-container').remove();
        $(iosStardardStatusBar).html('#status-bar');
        $('body').attr("device-size", "iphone8Plus");
      } else {
        $('.iphone-status-bar-container').remove(); 
        $('.iphoneX-status-bar-container').remove();
        $(StardardStatusBar).html('#status-bar');
        $('body').attr("device-size", "standard");
      }

      if ( ((deviceSize == 'iphoneX') && (deviceStyle == 'ios') && (deviceWidth == '375') && (deviceHeight == '812')) ) {
        iosHomeIndicator.insertAfter('.tabbed-menu');
        $('.tabbed-menu').addClass('home-indicator-active');
        $('.music-player-option .headers[header-type="standard"]').attr("header-style", "style5");
      } else {
        $('.home-indicator-container').remove();
        $('.tabbed-menu').removeClass('home-indicator-active');
        $('.music-player-option .headers[header-type="standard"]').attr("header-style", "style6");
      }

	// Loading Home Indicator in iPhoneX
	if( !$('.home-indicator-container').length > 0 ) {
		iosHomeIndicator.insertAfter('.tabbed-menu');
		$('.tabbed-menu').addClass('home-indicator-active');
	}

    });
  } // end bbflyStatusBarBg()

  function bbflyStatusBarBgBlur() {
    // Activation StatusBar
    var StatusBar = $('#status-bar');
    if( $('#status-bar').length > 0 ) {
      var StatusBarHeight = $('#status-bar').height();
      $(".scrollable-content, .options-container-overlay").scroll(function() {
        if ($(this).scrollTop() > StatusBarHeight + 1) {
          StatusBar.addClass('ios-topnavbar-bg');
        } else {
          StatusBar.removeClass('ios-topnavbar-bg');
        }
      });
      setTimeout(function(){
        StatusBar.addClass('active');
      }, 1000);
    }

    StatusBar.removeClass('ios-topnavbar-bg');
  } // end bbflyStatusBarBgBlur()

  function bbflyMiniMenu() {
    $('.tabbed-menu ul a').on('click', function(e) {
      $('.tabbed-menu ul a').removeClass('active');
      $(this).addClass('active');
    });
  } // end bbflyMiniMenu()

  function bbflyLikeContainer() {
    $('.like-container').off('click').on('click', function() {
      var HeartIcon = $(this).find(".heart-icon"),
          HeartLike = $(this).find(".like"),
          likeNumber = HeartLike.text(),
          numberNoCommas = likeNumber.replace(/\./g, ''),
          likeSuffix = numberNoCommas.match(/\d+/);

      if ( numberNoCommas.includes('k') ) { var LikeAbbr = HeartLike.addClass('abbr'); numberNoCommas = likeSuffix;}

      if ( HeartIcon.hasClass('active') ) {
        HeartIcon.removeClass('active');
        if (LikeAbbr) {
          var like = (numberNoCommas) + 'k';
        } else {
          var like = Math.max(parseFloat(numberNoCommas) - 1 );
        }
      } else {
        HeartIcon.addClass('active');
        if (LikeAbbr) {
          var like = (numberNoCommas) + 'k';
        } else {
          var like = Math.max(parseFloat(numberNoCommas) + 1 );
        }
      }
      var a = like.toString();
      var numberWithCommas = a.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
      HeartLike.text(numberWithCommas);
    });
  }// end bbflyLikeContainer()

  function bbflyShuffleRepeat() {
    $('.shuffle-repeat-wrapper').on('click', function() {
      if ($(this).find('.repeat').hasClass('active')) {
        $(this).find('.repeat').removeClass('active');
        $(this).find('.shuffle').addClass('active');
      } else {
        $(this).find('.shuffle').removeClass('active');
        $(this).find('.repeat').addClass('active');
      }
    });
  } // end bbflyShuffleRepeat()

  function bbflyFollowButton() {
    $('button.following').on('click', function() {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).text('follow');
      } else {
        $(this).addClass('active');
        $(this).text('following');
      }
    });
  } // end bbflyFollowButton()

  function bbflyEssentialSearch() {
    $('.headers .search-icon').on('click', function(e) {
      var essentialSearchCheck = $(this).attr('essential-search');
      if ( essentialSearchCheck == 'show' ) {
        if ($(this).parent().is('a') ) {
          e.preventDefault();
          $(this).unwrap();
          $('.searches.essential-search').addClass('open');
        } else {
          $('.searches.essential-search').addClass('open');
        }
      } else {
        if ($(this).parent().is(':not(a)') ) {
          $(this).wrap('<a href="search.html"></a>');
        }
      }
    });
    if( $('.searches.essential-search[blur="blur"]').length > 0 ) {
      $('.searches.essential-search .overlay, .searches.essential-search .searchbar-cancel').on('click', function() {
        $('.searches.essential-search').addClass('close');
        setTimeout(function(){ 
          $('.searches.essential-search').removeClass('open');
          $('.searches.essential-search').removeClass('close');
        }, 300);
      });
    }

    $('.recent-search-item').on('click', function(e) {
      var checkClick = $(e.target).attr('checkClick');
      if( checkClick == 'checkClick' ){
        $(this).addClass('delete');
        $(this).animate( {'width':'0','height':'0'}, 300, 'swing');
        setTimeout(function(){ $('.recent-search-item.delete').remove() }, 1000);
      }
    });

  } // end bbflyEssentialSearch()

  function bbflySeeAllPage() {
    $('.section-titles').on('click', function(e) {
      var checkClick = $(e.target).attr('checkClick');
      if( checkClick == 'checkClick' ){
        var SeeAllPageDescription,
            fullList,
            SectionTitle = $(this).find('h2').text();

        switch (SectionTitle) {
          case 'Best of the Week':
            SeeAllPageDescription = 'A collection of Best of the Week. We hope you Like It!';
            
            fullList =  $.get('./static/Radio/script_templates/best_of_the_week.html');
            break;
          case 'Recommended':
            SeeAllPageDescription = 'A collection of All Music Recommended just for you. We hope you Like It!';
            fullList =  $.get('./static/Radio/script_templates/recomended.html');
            break;
          case 'Recent Played':
            SeeAllPageDescription = 'History of Songs heard Recently';
            fullList =  $.get('./static/Radio/script_templates/recently_played.html');
            break;
          case 'Most Played':
            SeeAllPageDescription = "A collection of Most Played song. We hope you Like It!";
            fullList =  $.get('./static/Radio/script_templates/most_played.html')
            break;
          case 'For You':
            SeeAllPageDescription = "A collection of All Music Recommended just for you. We hope you Like It!";
            fullList =  $.get('./static/Radio/script_templates/for_you.html');
            break;
          case 'Popular MV':
          case 'Music Videos':
          case 'New Videos':
          case 'Popular Now':
            SeeAllPageDescription = "A collection of Music Video recommended";
            fullList =  $.get('./static/Radio/script_templates/popular_and_new_music_videos.html')
            break;
          case 'Popular Playlists':
          case 'Own Playlists':
            SeeAllPageDescription = "A collection of Popular Playlists. We hope you Like It!";
            fullList =  $.get('./static/Radio/script_templates/owned_and_popular_playlist.html');
            break;
          case 'Latest Releases':
            SeeAllPageDescription = "A collection of All Music Recommended just for you. We hope you Like It!";
            fullList =  $.get('./static/Radio/script_templates/latest_releases.html');
            break;
          case 'Popular Albums':
            SeeAllPageDescription = "A collection of Popular Albums. We hope you Like It!";
            fullList =  $.get('./static/Radio/script_templates/popular_albums.html');
            break;
          case 'Releated News':
            SeeAllPageDescription = "A collection of Releated News. We hope you Like It!";
            fullList =  $.get('./static/Radio/script_templates/related_news.html');
            break;
          default:
            SeeAllPageDescription = "A collection of All Music Recommended just for you. We hope you Like It!";
            fullList =  $.get('./static/Radio/script_templates/default_collection.html');
        }
        setTimeout(function(){
          $('.list-songs-default').remove();
          $('.see-all-page-info-container h2').text(SectionTitle);
          $('.see-all-page-info-container p').text(SeeAllPageDescription);

          if( !$('#see-all-page .checkPlaylist').length > 0 ) {
            fullList.insertAfter('.see-all-page-info-container');
          }
        }, 200);
      }
    });
  } // end bbflySeeAllPage()

  function bbflyCheckRatings() {

    /* opening Write Review Overlay */
    $('.write-reviews button').on('click', function() {
      $('.options-container-overlay.write-review-overlay').addClass('open');
      $('.page').addClass('options-container-overlay-open');
    });

    /* Closing Write Review Overlay */
    $('.headers[header-type="back"][header-style="style4"] .back').on('click', function() {
      $('.options-container-overlay.write-review-overlay').addClass('close');
      setTimeout(function(){
        $('.options-container-overlay.write-review-overlay').removeClass('open');
        $('.options-container-overlay.write-review-overlay').removeClass('close');
        $('.page').removeClass('options-container-overlay-open');
      }, 500);
    });

    var checkAllReviewsNumber = $('.review-list:first li').length;
    $('.number-reviews span:first-of-type').text(checkAllReviewsNumber);

    /* Simulation new reviews */
    $('.options-container-overlay.write-review-overlay .send-review button').on('click', function(e) {

      var starsReviews,
          checkReviewsNumber = $('.number-reviews:first span:first-of-type').text(),
          numberNoCommas = checkReviewsNumber.replace(/\./g, ''),
          text = $('.options-container-overlay.write-review-overlay .leave-reviews input').val(),
          textarea = $('.options-container-overlay.write-review-overlay .leave-reviews textarea').val(),
          checkstarsReviews = $('.options-container-overlay.write-review-overlay [type*="radio"]:checked').attr('value');

      switch (checkstarsReviews) {
        case '0':
          starsReviews = '<span for="star5" title="" class=""></span><span for="star4" title="" class=""></span><span for="star3" title="" class=""></span><span for="star2" title="" class=""></span><span for="star1" title="" class=""></span>'
          break;
        case '1':
          starsReviews = '<span for="star5" title="" class=""></span><span for="star4" title="" class=""></span><span for="star3" title="" class=""></span><span for="star2" title="" class=""></span><span for="star1" title="" class="active"></span>'
          break;
        case '2':
          starsReviews = '<span for="star5" title="" class=""></span><span for="star4" title="" class=""></span><span for="star3" title="" class=""></span><span for="star2" title="" class="active"></span><span for="star1" title="" class="active"></span>'
          break;
        case '3':
          starsReviews = '<span for="star5" title="" class=""></span><span for="star4" title="" class=""></span><span for="star3" title="" class="active"></span><span for="star2" title="" class="active"></span><span for="star1" title="" class="active"></span>'
          break;
        case '4':
          starsReviews = '<span for="star5" title="" class=""></span><span for="star4" title="" class="active"></span><span for="star3" title="" class="active"></span><span for="star2" title="" class="active"></span><span for="star1" title="" class="active"></span>'
          break;
        case '5':
          starsReviews = '<span for="star5" title="" class="active"></span><span for="star4" title="" class="active"></span><span for="star3" title="" class="active"></span><span for="star2" title="" class="active"></span><span for="star1" title="" class="active"></span>'
      }

      if ( (( text != '') && (checkstarsReviews != '0')) ) {
        $('<li><header><div class="date-container">Today</div><h2>'+text+'</h2><div class="clients-ratings"><div class="ratings-reviews"><span class="stars">'+starsReviews+'</span></div><div class="client-avatar"><img alt="ClientAvatar" src="'+userProfileAvatar+'sz5.jpg" class="avatar photo" height="100%" width="auto"></div><div class="clients"><cite>'+userProfileName+'</cite></div></div></header><section><p>'+textarea+'</p></section></li>').prependTo('.clients-reviews:first ul'); 
        $(".options-container-overlay.write-review-overlay-ok").addClass('open');

        var checkNewReviewsNumber = Math.max(parseFloat(numberNoCommas) + 1 ),
            checkReviewsNumber = $('.number-reviews:first span:first-of-type').text(checkNewReviewsNumber);

        e.stopImmediatePropagation();

        setTimeout( function(){
          $(".options-container-overlay.write-review-overlay-ok .thanks-text p, .options-container-overlay.write-review-overlay-ok .reviews-ok-icon .icon").addClass('active');
          text = $('.options-container-overlay.write-review-overlay .leave-reviews input, .options-container-overlay.write-review-overlay .leave-reviews textarea').val(''); 
        }, 1000);
        setTimeout( function(){
          $('.options-container-overlay.write-review-overlay').removeClass('open');
          $('.options-container-overlay.write-review-overlay').removeClass('close');
        }, 1000);
        setTimeout( function(){text = $('.options-container-overlay.write-review-overlay .leave-reviews input, .options-container-overlay.write-review-overlay .leave-reviews textarea').val(''); 
                               $('.options-container-overlay.write-review-overlay-ok').addClass('close');
                               setTimeout(function(){ $('.options-container-overlay.write-review-overlay-ok').removeClass('open'); $('.options-container-overlay.write-review-overlay-ok').removeClass('close'); $('.page').removeClass('options-container-overlay-open'); }, 500);
                              }, 2000);
        setTimeout( function(){text = $('.options-container-overlay.write-review-overlay .leave-reviews input, .options-container-overlay.write-review-overlay .leave-reviews textarea').val(''); 
                               $(".options-container-overlay.write-review-overlay-ok .thanks-text p, .options-container-overlay.write-review-overlay-ok .reviews-ok-icon .icon").removeClass('active');
                              }, 2500);
      } else {
        $(".options-container-overlay.write-review-overlay-fail").addClass('open');
        setTimeout( function(){
          $(".options-container-overlay.write-review-overlay-fail .fail-text p, .options-container-overlay.write-review-overlay-fail .reviews-fail-icon .icon, .options-container-overlay.write-review-overlay-fail .fail-back, .options-container-overlay.write-review-overlay-fail .try-again-support-button button").addClass('active');
          text = $('.options-container-overlay.write-review-overlay .leave-reviews input, .options-container-overlay.write-review-overlay .leave-reviews textarea').val(''); 
        }, 1000);

        $('.options-container-overlay.write-review-overlay-fail .review-fail-back .back, .options-container-overlay.write-review-overlay-fail .try-again-support-button button.try-again').on('click', function() {
          $('.options-container-overlay.write-review-overlay-fail').addClass('close');
          setTimeout(function(){ 
            $('.options-container-overlay.write-review-overlay-fail').removeClass('open'); $('.options-container-overlay.write-review-overlay-fail').removeClass('close');
            $(".options-container-overlay.write-review-overlay-fail .fail-text p, .options-container-overlay.write-review-overlay-fail .reviews-fail-icon .icon, .options-container-overlay.write-review-overlay-fail .fail-back, .options-container-overlay.write-review-overlay-fail .try-again-support-button button").removeClass('active');
          }, 500);
        });
      }
    });

  } // end bbflyCheckRatings()

  function bbflyAppSwiper() {
    //var myApp = new Framework7();
    var bbflyMixedSwiper1 = myApp.swiper('.mixed-swiper', {
      width: 626, //294px width
      spaceBetween: 22,
      slidesPerView: 2,
      freeMode: false,
      freeModeMomentum: true,
      freeModeMomentumBounce: true,
      freeModeMomentumRatio: '1',
      freeModeMomentumVelocityRatio: '0.7',
      freeModeMomentumBounceRatio: '1',
      mousewheelControl: true,
      mousewheelReleaseOnEdges: true,
      mousewheelForceToAxis: true,
      mousewheelInvert: true,
      // Responsive breakpoints
      breakpoints: {
        // when window width is <= 320px
        320: {
          width: 537 //251px width
        }
      }
    });

    var bbflyMixedSwiper2 = myApp.swiper('.mixed-swiper-2', {
      width: 359, //343px width
      spaceBetween: 22,
      slidesPerView: 1,
      freeMode: false,
      freeModeMomentum: true,
      freeModeMomentumBounce: true,
      freeModeMomentumRatio: '1',
      freeModeMomentumVelocityRatio: '0.7',
      freeModeMomentumBounceRatio: '1',
      mousewheelControl: true,
      mousewheelReleaseOnEdges: true,
      mousewheelForceToAxis: true,
      mousewheelInvert: true,
      // Responsive breakpoints
      breakpoints: {
        // when window width is <= 320px
        320: {
          width: 308 //292px width
        },
        360: {
          width: 345 //329px width
        }
      }
    });

    var bbflyMixedSwiper3 = myApp.swiper('.mixed-swiper-3', {
      width: 359, //343px width
      spaceBetween: 22,
      slidesPerView: 1,
      freeMode: false,
      freeModeMomentum: true,
      freeModeMomentumBounce: true,
      freeModeMomentumRatio: '1',
      freeModeMomentumVelocityRatio: '0.7',
      freeModeMomentumBounceRatio: '1',
      mousewheelControl: true,
      mousewheelReleaseOnEdges: true,
      mousewheelForceToAxis: true,
      mousewheelInvert: true,
      // Responsive breakpoints
      breakpoints: {
        // when window width is <= 320px
        320: {
          width: 308 //292px width
        },
        360: {
          width: 345 //329px width
        }
      }
    });

    function colorChange(){
      if ( $('.demo-container img').length > 0 ) {
        var myImage = $(".demo-container img");
      } else if( $('.mixed-swiper-3').length > 0 ) { 
        var myImage = $(".mixed-swiper-3.swiper-container:first-of-type .swiper-slide-active img");
      } else if ( $('.mixed-swiper-2').length > 0 ) {
        var myImage = $(".mixed-swiper-2.swiper-container:first-of-type .swiper-slide-active img");
      } else {
        var myImage = $(".mixed-swiper.swiper-container:first-of-type .swiper-slide-active img");
      }
      if( $('.dominant-color').length > 0 ) {
        var colorThief = new ColorThief();
        //Grabs 8 swatch color palette from image and sets quality to 5 (0 =slow, 10=default/fast)
        var cp = colorThief.getColor(myImage[0]);
        $('.dominant-color').css('background-color', 'rgb('+cp[0]+','+cp[1]+','+cp[2]+')');
      }
    }
    if( $('.mixed-swiper').length > 0 ) { bbflyMixedSwiper1.on('slideChangeEnd', function() {colorChange();}); $(this).find(".swiper-container:first-of-type .img-inner-wrapper").imagesLoaded(function() {colorChange();}); }
    if( $('.mixed-swiper-2').length > 0 ) { bbflyMixedSwiper2.on('slideChangeEnd', function() {colorChange();}); $(this).find(".swiper-container:first-of-type .img-inner-wrapper").imagesLoaded(function() {colorChange();}); }
    if( $('.mixed-swiper-3').length > 0 ) { bbflyMixedSwiper3.on('slideChangeEnd', function() {colorChange();}); $(this).find(".swiper-container:first-of-type .img-inner-wrapper").imagesLoaded(function() {colorChange();}); }

    var bbflymySwiper2 = myApp.swiper('.playlist-swiper', {
      width: 465, //135px width
      spaceBetween: 22,
      slidesPerView: 3,
      freeMode: true,
      freeModeMomentum: true,
      freeModeMomentumBounce: true,
      freeModeMomentumRatio: '1',
      freeModeMomentumVelocityRatio: '0.7',
      freeModeMomentumBounceRatio: '1',
      mousewheelControl: true,
      mousewheelReleaseOnEdges: true,
      mousewheelForceToAxis: true,
      mousewheelInvert: true,
      // Responsive breakpoints
      breakpoints: {
        // when window width is <= 320px
        320: {
          width: 405 //115px width
        }
      }
    });

    var bbflymySwiperMultiRow = myApp.swiper('.multi-row-swiper', {
      width: 465, //135px width
      spaceBetween: 22,
      slidesPerView: 3,
      slidesPerColumn: 2,
      freeMode: true,
      freeModeMomentum: true,
      freeModeMomentumBounce: true,
      freeModeMomentumRatio: '1',
      freeModeMomentumVelocityRatio: '0.7',
      freeModeMomentumBounceRatio: '1',
      mousewheelControl: true,
      mousewheelReleaseOnEdges: true,
      mousewheelForceToAxis: true,
      mousewheelInvert: true,
      // Responsive breakpoints
      breakpoints: {
        // when window width is <= 320px
        320: {
          width: 402 //115px width
        }
      }
    });

    var bbflyAdCards = myApp.swiper('.ad-cards-swiper', {
      width: 438, //200px width
      spaceBetween: 22,
      slidesPerView: 2,
      loopedSlides: 8,
      loop: true,
      freeMode: false,
      freeModeMomentum: true,
      freeModeMomentumBounce: true,
      freeModeMomentumRatio: '1',
      freeModeMomentumVelocityRatio: '0.7',
      freeModeMomentumBounceRatio: '1',
      mousewheelControl: true,
      mousewheelReleaseOnEdges: true,
      mousewheelForceToAxis: true,
      mousewheelInvert: true,
      // Responsive breakpoints
      breakpoints: {
        // when window width is <= 320px
        320: {
          width: 376 //169px width
        }
      }
    });

    var bbflymySwiper4 = myApp.swiper('.video-swiper-container', {
      width: 476, //216px width
      spaceBetween: 28,
      slidesPerView: 2,
      freeMode: false,
      freeModeMomentum: true,
      freeModeMomentumBounce: true,
      freeModeMomentumRatio: '1',
      freeModeMomentumVelocityRatio: '0.7',
      freeModeMomentumBounceRatio: '1',
      mousewheelControl: true,
      mousewheelReleaseOnEdges: true,
      mousewheelForceToAxis: true,
      mousewheelInvert: true,
      // Responsive breakpoints
      breakpoints: {
        // when window width is <= 320px
        320: {
          width: 537 //251px width
        }
      }
    });

    var bbflymySwiper5 = myApp.swiper('.mood-swiper', {
      width: 184, //168px width
      spaceBetween: 19,
      loopedSlides: 7,
      initialSlide: 3,
      loop: true,
      centeredSlides: true,
      freeMode: true,
      freeModeMomentum: true,
      freeModeMomentumBounce: true,
      freeModeMomentumRatio: '1',
      freeModeMomentumVelocityRatio: '0.7',
      freeModeMomentumBounceRatio: '1',
      mousewheelControl: true,
      mousewheelReleaseOnEdges: true,
      mousewheelForceToAxis: true,
      mousewheelInvert: true,
      // Responsive breakpoints
      breakpoints: {
        // when window width is <= 320px
        320: {
          width: 159 //143px width
        }
      }
    });

    var bbflymySwiper6 = myApp.swiper('.favourite-artist-swiper', {
      width: 244, //62px width
      spaceBetween: 21,
      slidesPerView: 3,
      freeMode: true,
      freeModeMomentum: true,
      freeModeMomentumBounce: true,
      freeModeMomentumRatio: '1',
      freeModeMomentumVelocityRatio: '0.7',
      freeModeMomentumBounceRatio: '1',
      mousewheelControl: true,
      mousewheelReleaseOnEdges: true,
      mousewheelForceToAxis: true,
      mousewheelInvert: true,
      // Responsive breakpoints
      breakpoints: {
        // when window width is <= 320px
        320: {
          width: 208, //53px width
          spaceBetween: 18
        }
      }
    });

    var bbflymySwiper7 = myApp.swiper('.user-playlist-mini-thumb', {
      width: 180, //130px
      spaceBetween: 15,
      slidesPerView: 1,
      // Responsive breakpoints
      breakpoints: {
        // when window width is <= 320px
        320: {
          width: 153, //130px width
        }
      }
    });

    var bbflymySwiper8 = myApp.swiper('.video-playlist-swiper', {
      width: 237, //251px width - "740" = 233
      spaceBetween: 22,
      loopedSlides: 2,
      loop: true
    });

    var bbflymySwiper9 = myApp.swiper('.videos-mini-thumb', {
      width: 114, //98px
      spaceBetween: 9,
      slidesPerView: 1,
      // Responsive breakpoints
      breakpoints: {
        // when window width is <= 320px
        360: {
          width: 113, //98px width
        },
        320: {
          width: 97, //112px width
        }
      }
    });

    var bbflymySwiper10 = myApp.swiper('.cards-swiper', {
      width: 644, //305px width
      spaceBetween: 18,
      slidesPerView: 2,
      freeMode: false,
      freeModeMomentum: true,
      freeModeMomentumBounce: true,
      freeModeMomentumRatio: '1',
      freeModeMomentumVelocityRatio: '0.7',
      freeModeMomentumBounceRatio: '1',
      mousewheelControl: true,
      mousewheelReleaseOnEdges: true,
      mousewheelForceToAxis: true,
      mousewheelInvert: true,
      // Responsive breakpoints
      breakpoints: {
        // when window width is <= 320px
        320: {
          width: 537 //251px width
        }
      }
    });

    var bbflymySwiper11 = myApp.swiper('.emoji-swiper', {
      width: 23, //26px
      breakpoints: {
        // when window width is <= 320px
        360: {
          width: 20 //251px width
        },
        320: {
          width: 21 //251px width
        }
      }
    });

    var bbflymySwiper12 = myApp.swiper('.gif-swiper', {
      width: 172, //172px
      spaceBetween: 15,
      slidesPerView: 1
    });

    var bbflyIsotopeSwiper = myApp.swiper('.isotope-grid', {
      slidesPerView: 'auto',
      freeMode: true,
      freeModeMomentum: true,
      freeModeMomentumBounce: true,
      freeModeMomentumRatio: '1',
      freeModeMomentumVelocityRatio: '0.7',
      freeModeMomentumBounceRatio: '1',
      mousewheelControl: true,
      mousewheelReleaseOnEdges: true,
      mousewheelForceToAxis: true,
      mousewheelInvert: true
    });

    var bbflyIsotopeSwiper2 = myApp.swiper('.isotope-grid-2', {
      slidesPerView: 'auto',
      freeMode: true,
      freeModeMomentum: true,
      freeModeMomentumBounce: true,
      freeModeMomentumRatio: '1',
      freeModeMomentumVelocityRatio: '0.7',
      freeModeMomentumBounceRatio: '1',
      mousewheelControl: true,
      mousewheelReleaseOnEdges: true,
      mousewheelForceToAxis: true,
      mousewheelInvert: true
    });

    // change is-checked class on buttons
    $('.isotope-grid-filters').each(function(i, buttonGroup) {
      var $buttonGroup = $(buttonGroup);
      $buttonGroup.on('click', 'li', function() {
        $buttonGroup.find('.filter').removeClass('active');
        $(this).addClass('active');
      });
    });
    $('.isotope-grid-filters').on('click', 'li', function() {
      $('.isotope-grid .item-container').isotope({
        filter: $(this).attr('data-filter')
      });
    });

    $('.isotope-grid .item-container').isotope({
      itemSelector: '.grid__item',
      layoutMode: 'packery',
      transitionDuration: '.4s',
      stagger: 65,
      packery: {
        gutter: 8,
        horizontal: true
      }
    });
    $('.isotope-grid-2 .item-container').isotope({
      itemSelector: '.grid__item',
      layoutMode: 'packery',
      transitionDuration: '.4s',
      stagger: 65,
      packery: {
        gutter: 12,
        horizontal: true
      }
    });

    $('.emoji-swiper .item-container').isotope({
      itemSelector: '.your-emoji',
      layoutMode: 'packery',
      transitionDuration: '.4s',
      stagger: 65,
      packery: {
        gutter: 12,
        horizontal: true
      }
    });

    $(window).resize(function(e) {
      $('.isotope-grid-1 .item-container').isotope('layout');
      $('.isotope-grid-2 .item-container').isotope('layout');
    });

    $('.emoji-list-searchbar input').keyup(function(e) {
      $('.emoji-swiper .item-container').isotope('layout')
    });

  } // end bbflyAppSwiper()

  function bbflyCheckInfo(){
    $('.the-playlist').on('click', function(e) {
      var playlist_title = $(this).find("h2").text(),
          playlist_author = $(this).find("cite").text(),
          playlist_album_cover = $(this).attr("album-cover"),
          playlist_album_avatar = $(this).attr("avatar"),
          playlist_price = $(this).find(".price-label").text(),
          playlist_price_replace = playlist_price.replace('Buy ','$ '),
          playlist_src = "";

      setTimeout(function(){
        $('.page .big-player-queue-container .title-author h2, .page .headers .title-author h2, .section-titles[section-type="playlists-large"] h2').text(playlist_title);
        $('.page .big-player-queue-container cite, .page .headers cite, .section-titles[section-type="playlists-large"] cite').text(playlist_author);
        $('.page.charts .headers cite').text('Update Today');
        $('.page .big-player-queue-container .album-cover img, .page .album-cover-blur img, .page .headers .album-cover img').attr("src", playlist_src + playlist_album_cover);
        $('.page .title-author cite').attr('avatar', playlist_album_avatar);
        $('.page .headers .title-author cite').attr('album-cover', playlist_album_cover);
        $('.page .headers .buy-button b').text(playlist_price_replace);

        // Controlla il nome dell'utente nella pagina profilo utente
        $('.page.profile .headers .title-author h2').text(userProfileName +" "+ userProfileSurname);
        $('.page.profile .headers .album-cover img').attr("src", playlist_src + userProfileAvatar);
        $('.page.profile .album-cover-blur img').attr("src", playlist_src + userProfileAvatar );
      }, 200);

    });
  }
  bbflyCheckInfo();
  $('.headers[header-icon-style="user"] .icon').css('background','url("'+userProfileAvatar+'") no-repeat 0 center / cover');

  function bbflyCheckAuthor(){
    $('cite.author').on('click', function(e) {
      var author_author = $(this).text(),
          author_album_cover = $(this).attr("album-cover"),
          author_avatar = $(this).attr("avatar"),
          author_src = "";

      setTimeout(function(){
        $('.artist-profile .profile-avatar-user cite').text(author_author);
        $('.artist-profile .profile-avatar-user img').attr("src", author_src + author_album_cover);
        $('.artist-profile .album-cover-blur img').attr("src", author_src + author_album_cover);
        $('.artist-profile .profile-avatar-user img').attr("src", author_src + author_avatar);
        $('.artist-profile .headers[header-type="back"][header-style="style3"] .album-cover img').attr("src", author_src + author_avatar);
        $('.artist-profile .headers[header-type="back"][header-style="style3"] .title-author h2').text(author_author);

        /* Randomize Followers Numbers */
        var minNumber = 100000;
        var maxNumber = 300000;
        var randomNumber = randomNumberFromRange(minNumber, maxNumber);
        //function randomNumberFromRange(min,max){return Math.floor(Math.random()*(max-min+1)+min);}
        var a = randomNumber.toString();
        var numberWithCommas = a.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
        $('.artist-profile .profile-avatar-user .user-country p.listeners').text(numberWithCommas + ' Listeners');
        $('.artist-profile .headers[header-type="back"][header-style="style3"] .title-author cite').text(numberWithCommas + ' Listeners');

      }, 200);
    });

    $('.favourite-artist-swiper .swiper-slide').on('click', function(e) {
      var author_author = $(this).find('cite').text(),
          author_album_cover = $(this).find('cite').attr("album-cover"),
          author_avatar = $(this).find('cite').attr("avatar"),
          author_src = "";

      setTimeout(function(){
        $('.artist-profile .profile-avatar-user cite').text(author_author);
        $('.artist-profile .profile-avatar-user img').attr("src", author_src + author_album_cover);
        $('.artist-profile .album-cover-blur img').attr("src", author_src + author_album_cover);
        $('.artist-profile .profile-avatar-user img').attr("src", author_src + author_avatar);
        $('.artist-profile .headers[header-type="back"][header-style="style3"] .album-cover img').attr("src", author_src + author_avatar);
        $('.artist-profile .headers[header-type="back"][header-style="style3"] .title-author h2').text(author_author);

        /* Randomize Followers Numbers */
        var minNumber = 100000;
        var maxNumber = 300000;
        var randomNumber = randomNumberFromRange(minNumber, maxNumber);
        //function randomNumberFromRange(min,max){return Math.floor(Math.random()*(max-min+1)+min);}
        var a = randomNumber.toString();
        var numberWithCommas = a.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
        $('.artist-profile .profile-avatar-user .user-country p.listeners').text(numberWithCommas + ' Listeners');
        $('.artist-profile .headers[header-type="back"][header-style="style3"] .title-author cite').text(numberWithCommas + ' Listeners');

      }, 200);
    });

  }
  bbflyCheckAuthor();

  function bbflycheckPrice(){
    $('section.headers, div.slide').on('click', function(e) {
      var checkSongPrice = $(e.target).attr('checkSongPrice');
      if( checkSongPrice == 'checkSongPrice' ){

        var SongPrice_player_title = $(this).find(".title").text(),
            SongPrice_player_author = $(this).find("cite").text(),        
            SongPrice_player_avatar = $(this).find("cite").attr("avatar"),
            SongPrice_album_cover = $(this).find("cite").attr("album-cover"),
            SongPrice_album_price = $(this).find(".song-price b").text(),
            checkAllCardsNumber = $('.total-cards-vertical .inner .my-card').length,
            SongPrice_album_price_src = "";

        $('.header-manage-card .total-cards').text(checkAllCardsNumber);

        $('.confirm-purchase-popup-overlay .title-author img').attr("src", SongPrice_album_price_src + SongPrice_album_cover);
        $('.confirm-purchase-popup-overlay .title-author .title').text(SongPrice_player_title);
        $('.confirm-purchase-popup-overlay .title-author .author').text(SongPrice_player_author);
        $('.confirm-purchase-popup-overlay b.final-price').text(SongPrice_album_price);

        $(".options-container-overlay.confirm-purchase-popup-overlay").addClass('open');
        $('.page').addClass('options-container-overlay-open');
        $('#status-bar').removeClass('ios-topnavbar-bg');
      }
    });

    $('.pay-form-container-saved button.edit').on('click', function(e) {
      $(".options-container-overlay.payment-method-overlay").addClass('open');
    });

    $('.section-titles[section-type="payments"] button.options').on('click', function(e) {
      $(".options-container-overlay.manage-card-overlay").addClass('open');
    });

    $('.header-manage-card button.add-new').on('click', function(e) {
      $(".options-container-overlay.edit-card-overlay").addClass('open');
      $('.pay-form-container').addClass('new-card').attr('card-type','unknown');
      $('.header-edit-card-title .edit-card-action').text('Add ');
      $('.header-edit-card-title .selected-card').text('New Card');
    });

    $('.select-card').on('click', function(e) {
      var cardType = $(this).attr('card-type'),
          cardNumbers = $(this).find('.last-numbers-card').text();
      $('.pay-form-container-saved .type-card-wrapper').attr('card-type', cardType);
      $('.pay-form-container-saved .number-card-wrapper .last-numbers-card').text(cardNumbers);

      /* Closing Confirm Payment Method Overlay */
      $('.options-container-overlay.payment-method-overlay').addClass('close');
      setTimeout(function(){
        $('.options-container-overlay.payment-method-overlay').removeClass('open').removeClass('close');
        $('.page').removeClass('options-container-overlay-open');
      }, 500);
    });

    $('.my-card').on('click', function(e) {
      $('.options-container-overlay.edit-card-overlay').addClass('open');
      var cardType = $(this).attr('card-type'),
          cardNumbers = $(this).find('.last-numbers-card').text(),
          cardName = $(this).find('.name-card div').text(),
          cardExp = $(this).find('.exp-date div').text(),
          cardCVV = $(this).find('.cvv div').text();

      $('.pay-form-container').attr('card-type', cardType);
      $('.pay-form-container .card-number input').val('**** **** **** ' + cardNumbers);
      $('.pay-form-container .name-card input').val(cardName);
      $('.pay-form-container .exp-date input').val(cardExp);
      $('.pay-form-container .cvv input').val(cardCVV);

      $('.header-edit-card-title .edit-card-action').text('Edit ');
      $('.header-edit-card-title .selected-card').text('"'+cardType+'"');

    });

    $('.card-done').on('click', function(e) {
      var editCardNumbers = $('.pay-form-container .card-number input').val(),
          cardType = $('.pay-form-container').attr('card-type'),
          cardName = $('.pay-form-container').find('.name-card input').val(),
          cardExp = $('.pay-form-container').find('.exp-date input').val(),
          cardCVV = $('.pay-form-container').find('.cvv input').val(),
          editLastFourNumbers = editCardNumbers.substr(editCardNumbers.length - 5);

      $('.my-card[card-type='+cardType+'] .last-numbers-card').text(editLastFourNumbers);
      $('.my-card[card-type='+cardType+'] .name-card div').text(cardName);
      $('.my-card[card-type='+cardType+'] .exp-date div').text(cardExp);
      $('.my-card[card-type='+cardType+'] .cvv div').text(cardCVV);

      /* Closing Confirm Edit Card Overlay */
      $('.options-container-overlay.edit-card-overlay').addClass('close');
      setTimeout(function(){
        $('.options-container-overlay.edit-card-overlay').removeClass('open').removeClass('close');
        $('.page').removeClass('options-container-overlay-open');
        $('.pay-form-container input').val("");
      }, 500);

    });

    /* Closing Confirm Edit Card Overlay */
    $('.options-container-overlay.confirm-purchase-popup-overlay .header-edit-card .close').on('click', function() {
      $('.options-container-overlay.edit-card-overlay').addClass('close');
      setTimeout(function(){
        $('.options-container-overlay.edit-card-overlay').removeClass('open').removeClass('close');
        $('.page').removeClass('options-container-overlay-open');
        $('.pay-form-container input').val("");
      }, 500);
    });

    /* Closing Confirm Purchase Popup Overlay */
    $('.options-container-overlay.confirm-purchase-popup-overlay .confirm-purchase-popup-back .back').on('click', function() {
      $('.options-container-overlay.confirm-purchase-popup-overlay').addClass('close');
      setTimeout(function(){
        $('.options-container-overlay.confirm-purchase-popup-overlay').removeClass('open').removeClass('close');
        $('.page').removeClass('options-container-overlay-open');
      }, 500);
    });

    /* Closing Confirm Purchase Popup Overlay */
    $('.options-container-overlay.confirm-purchase-popup-overlay .manage-card-back .back').on('click', function() {
      $('.options-container-overlay.manage-card-overlay').addClass('close');
      setTimeout(function(){
        $('.options-container-overlay.manage-card-overlay').removeClass('open').removeClass('close');
        $('.page').removeClass('options-container-overlay-open');
      }, 500);
    });

    /* Closing Confirm Payment Method Overlay */
    $('.options-container-overlay.payment-method-overlay .headers .back').on('click', function() {
      $('.options-container-overlay.payment-method-overlay').addClass('close');
      setTimeout(function(){
        $('.options-container-overlay.payment-method-overlay').removeClass('open').removeClass('close');
        $('.page').removeClass('options-container-overlay-open');
      }, 500);
    });

    $('.pay-form-container').card({
      form: 'form',
      container: '.card-wrapper'
    });

  }
  bbflycheckPrice();

  $('.panel.sidebar .user-avatar img').attr("src", playlist_src + userProfileAvatar );
  $('.panel.sidebar .user-avatar b a').text(userProfileName);
  $('.total-cards-vertical .card-container .card-input-contain .input.name-card div').text(userProfileName +" "+ userProfileSurname);

  function bbflyCreateMusicPlayer(e){
    var volume = 0.5,
        audio,
        a = audiojs.createAll({
          trackEnded: function() {
            var next = $('.the-song.playing').next();
            if (!next.length) next = $('.the-song').first();
            if (!next.hasClass('the-song')) {
              next.siblings().removeClass('playing').removeClass('current');
              $('.play').removeClass('active');
            } else {
              next.addClass('playing').addClass('current').siblings().removeClass('playing').removeClass('current');

              var big_player_title = next.find("h2").text(),
                  big_player_author = next.find("cite").text(),
                  big_player_avatar = next.attr('avatar'),
                  big_player_album_cover = next.attr('album-cover'),
                  big_player_avatar_src = "";

              $(".player-audio-min .avatar-author img").attr("src", big_player_avatar_src + big_player_avatar);
              $(".player-audio-min .album-cover img").attr("src", big_player_avatar_src + big_player_album_cover);
              $(".player-audio-min .album-cover-blur img").attr("src", big_player_avatar_src + big_player_album_cover);
              $(".player-audio-min .title-author h2").text(big_player_title);
              $(".player-audio-min .title-author cite").text(big_player_author);

              $(".player-audio-min .headers[header-type='music-player'] .title-author cite").attr("avatar", big_player_avatar);
              $(".player-audio-min .headers[header-type='music-player'] .title-author cite").attr("album-cover", big_player_album_cover);

              $('.mini-player-song').addClass('playing');
              $('.play').addClass('active');

              if (next.hasClass("last")) {$(".player-command .next").addClass("last");}
              $(".player-command .prev").removeClass("first");

              audio.load($('a', next).attr('data-src'));
              audio.play();
            }
          }
        });

    // Load in the first track
    audio = a[0];

    // Load in a track on shuffle click button
    $(".shuffle").off('click').on('click', function(e) {
      var trackCount = $(".page-on-center .playlist-song .the-song").length;
      /* Pick random number between 1 and trackCount */
      var randomNum = Math.ceil(Math.random()*trackCount); 

      /* Choose music player style (random) */
      var minNumber = 1,
          maxNumber = 1,
          randomNumber = randomNumberFromRange(minNumber, maxNumber);
          console.log("Player 1 style is " + randomNumber)
      //function randomNumberFromRange(min,max){return Math.floor(Math.random()*(max-min+1)+min);}
      if(randomNumber == 1) {
        $('.player-audio-min').attr('music-player-style','style1');
        $('.player-audio-min .headers[header-type="music-player"]').attr('header-style','style1');
      }
      if(randomNumber == 2) {
        $('.player-audio-min').attr('music-player-style','style2');
        $('.player-audio-min .headers[header-type="music-player"]').attr('header-style','style2');
      }
      if(randomNumber == 3) {
        $('.player-audio-min').attr('music-player-style','style3');
        $('.player-audio-min .headers[header-type="music-player"]').attr('header-style','style1');
        $('.player-command .list .icon, .home-indicator-container, .player-audio-min, .album-cover-blur, .container-album-cover, .up-next-option, .player-audio-min.big, .scrubber-command.scrubber-options').removeClass('active');
      }
      /* Choose music player style (random) */
      var randomSong = $(".page-on-center .playlist-song .the-song:nth-child("+ randomNum +")");
      e.preventDefault();
      $('.the-song').removeClass('playing').removeClass('current');
      randomSong.addClass('playing').addClass('current').siblings().removeClass('playing').removeClass('current');

      audio.load($('.page-on-center .playlist-song .the-song:nth-child('+ randomNum +') a').attr('data-src'));
      $('audio').animate({volume: 1}, 600, function () {
        audio.play();


        // // custom tweak to count number of times track played
        // var a = document.getElementsByTagName("audio")[0];
        // console.log("I am the source " + a.currentSrc)
        // a.addEventListener("ended", function() {
        //   //  audio.play(); 
        //   console.log('Audio has been played' + a.currentSrc);
        //   alert('Audio has been played' + a.currentSrc); 
        // }, true);
      });

      // Initializing values
      var onplaying = true,
          onpause = false;
      // On video playing toggle values
      audio.onplaying = function() {onplaying = true; onpause = false;};
      // On video pause toggle values
      audio.onpause = function() {onplaying = false; onpause = true;};
      if (!audio.paused && onplaying) {audio.play();} //if the song is play, the next one is also played
      if (audio.paused && !onpause) {audio.pause();} //if the song is paused, the next one is also paused

      var mini_player_title = randomSong.find("h2").text(),
          mini_player_author = randomSong.find("cite").text(),
          mini_player_avatar = randomSong.attr("avatar"),
          mini_album_cover = randomSong.attr("album-cover"),
          mini_player_avatar_src = "";

      $('.play').addClass('active');
      $('.mini-player-song').addClass('playing');
      $(".the-song").removeClass('current');
      randomSong.addClass('current');

      $(".player-attribute .avatar-author img").attr("src", mini_player_avatar_src + mini_player_avatar);
      $(".player-attribute .album-cover img").attr("src", mini_player_avatar_src + mini_album_cover);
      $(".player-attribute .album-cover-blur img").attr("src", mini_player_avatar_src + mini_album_cover);
      $(".player-attribute .title-author h2").text(mini_player_title);
      $(".player-attribute .title-author cite").text(mini_player_author);

      $(".player-audio-min .headers[header-type='music-player'] .title-author cite").attr("avatar", mini_player_avatar);
      $(".player-audio-min .headers[header-type='music-player'] .title-author cite").attr("album-cover", mini_album_cover);

      if ( $('.player-video-min.mini.mini-active').length ) {
        /* Lowering Mini Video Player if it is active when a song is opened */
        $('.player-video-min.general').addClass('mini-disactive');
        setTimeout(function(){
          $('.player-video-min.general').removeClass('mini-active'); 
          $('.player-video-min.general').removeClass('alwaysblock');
        }, 500);

        /* Deactivating Mini Video Player if it is active when a song is opened */
        setTimeout(function(){
          $('.player-video-min.general').removeClass('mini');
          $('.player-video-min.general').removeClass('mini-disactive');
          $('.player-video-min.general').removeClass('alwaysblock');
        }, 700);
      }

      if ( PlayerOpenStyle == 0 ) {
        // THE CLICK OPENS THE BIG PLAYER
        if($('.player-audio-min.general.mini-active').is(':visible')) {
          //nothing
        } else if(!$('.player-audio-min.general').is(':visible')) {
          $('.player-audio-min.general').addClass('alwaysblock');
          setTimeout(function(){$('.player-audio-min.general').addClass('big');
                                $('.player-audio-min.general').addClass('big-active');
                                $('#status-bar').removeClass('ios-topnavbar-bg');}, 100);
          setTimeout(function(){
            $('.big.big-active .scrubber-options').addClass('open');
          }, 400);
        }
      } else if ( PlayerOpenStyle == 1 ) {
        // THE CLICK OPENS THE SMALL PLAYER
        if($('.player-audio-min.general.big-active').is(':visible')) {
          //nothing
        } else if(!$('.player-audio-min.general').is(':visible')) {
          $('.player-audio-min.general').addClass('alwaysblock');
          setTimeout(function(){
            $('.tabbed-menu .blur').addClass('active');
            $('.player-audio-min.general').addClass('mini');
            $('.player-audio-min.general').addClass('mini-active');
          }, 100);
        }
      }
      $('.page').removeClass('nope');
      $('.panel.sidebar').addClass('player-active');      
    });



    /* ID3
$(".checkPlaylist .the-song").each(function(index, element) {
	var audioSrc = $(this).find('a').attr('data-src');
	id3(audioSrc, function(err, tags) {
		console.log(tags.title);
		$(".checkPlaylist .the-song").each(function(index, element) {
			$(this).find("h2").text(tags.title);
		});
	});
});
/*
var li = $(".the-song");
for (var i = 0; i < li.length; i++) {
	var audioSrc = $(li[i]).find('a').attr('data-src');
	id3(audioSrc, function(err, tags) {
		for (i = i; i < li.length; i++) {
			console.log(tags.title);
			$(li[i]).find('h2').text(tags.title);
		}
	});
}
*/

    // Load in a track on click
    $('.playlist-song .the-song').on('click', function(e) {
      var checkClick = $(e.target).attr('checkClick');
      if( checkClick == 'checkClick' ){

        var mini_player_title = $(this).find("h2").text(),
            mini_player_author = $(this).find("cite").text(),
            mini_album_cover = $(this).attr("album-cover"),
            mini_player_avatar_src = "";

        $(".options-container-overlay.music-player-add-to .album-cover img").attr("src", mini_player_avatar_src + mini_album_cover);
        $(".options-container-overlay.music-player-add-to .title-author h2").text(mini_player_title);
        $(".options-container-overlay.music-player-add-to .title-author cite").text(mini_player_author);

      }else{
        /* Choose music player style (random) */
        var minNumber = 1,
            maxNumber = 1,
            randomNumber = randomNumberFromRange(minNumber, maxNumber);
            console.log("Player 2 style is " + randomNumber)
        //function randomNumberFromRange(min,max){return Math.floor(Math.random()*(max-min+1)+min);}
        if(randomNumber == 1) {
          $('.player-audio-min').attr('music-player-style','style1');
          $('.player-audio-min .headers[header-type="music-player"]').attr('header-style','style1');
        }
        if(randomNumber == 2) {
          $('.player-audio-min').attr('music-player-style','style2');
          $('.player-audio-min .headers[header-type="music-player"]').attr('header-style','style2');
        }
        if(randomNumber == 3) {
          $('.player-audio-min').attr('music-player-style','style3');
          $('.player-audio-min .headers[header-type="music-player"]').attr('header-style','style1');
          $('.player-command .list .icon, .home-indicator-container, .player-audio-min, .album-cover-blur, .container-album-cover, .up-next-option, .player-audio-min.big, .scrubber-command.scrubber-options').removeClass('active');
        }
        /* Choose music player style (random) */

        e.preventDefault();
        $('.the-song').removeClass('playing').removeClass('current');
        $(this).addClass('playing').addClass('current').siblings().removeClass('playing').removeClass('current');

        audio.load($('a', this).attr('data-src'));
        $('audio').animate({volume: 1}, 600, function () {
          audio.play();

          
        });

        // Initializing values
        var onplaying = true,
            onpause = false;
        // On video playing toggle values
        audio.onplaying = function() {onplaying = true; onpause = false;};
        // On video pause toggle values
        audio.onpause = function() {onplaying = false; onpause = true;};
        if (!audio.paused && onplaying) {audio.play();} //if the song is play, the next one is also played
        if (audio.paused && !onpause) {audio.pause();} //if the song is paused, the next one is also paused

        var mini_player_title = $(this).find("h2").text(),
            mini_player_author = $(this).find("cite").text(),
            mini_player_avatar = $(this).attr("avatar"),
            mini_album_cover = $(this).attr("album-cover"),
            mini_player_avatar_src = "";

        $('.play').addClass('active');
        $('.mini-player-song').addClass('playing');
        $(".the-song").removeClass('current');
        $(this).addClass('current');

        $(".player-attribute .avatar-author img").attr("src", mini_player_avatar_src + mini_player_avatar);
        $(".player-attribute .album-cover img").attr("src", mini_player_avatar_src + mini_album_cover);
        $(".player-attribute .album-cover-blur img").attr("src", mini_player_avatar_src + mini_album_cover);
        $(".player-attribute .title-author h2").text(mini_player_title);
        $(".player-attribute .title-author cite").text(mini_player_author);

        $(".player-audio-min .headers[header-type='music-player'] .title-author cite").attr("avatar", mini_player_avatar);
        $(".player-audio-min .headers[header-type='music-player'] .title-author cite").attr("album-cover", mini_album_cover);

        if ( $('.player-video-min.mini.mini-active').length ) {
          /* Lowering Mini Video Player if it is active when a song is opened */
          $('.player-video-min.general').addClass('mini-disactive');
          setTimeout(function(){
            $('.player-video-min.general').removeClass('mini-active'); 
            $('.player-video-min.general').removeClass('alwaysblock');
          }, 500);

          /* Deactivating Mini Video Player if it is active when a song is opened */
          setTimeout(function(){
            $('.player-video-min.general').removeClass('mini');
            $('.player-video-min.general').removeClass('mini-disactive');
            $('.player-video-min.general').removeClass('alwaysblock');
          }, 700);
        }

        if ( PlayerOpenStyle == 0 ) {
          // THE CLICK OPENS THE BIG PLAYER
          if($('.player-audio-min.general.mini-active').is(':visible')) {
            //nothing
          } else if(!$('.player-audio-min.general').is(':visible')) {
            $('.player-audio-min.general').addClass('alwaysblock');
            setTimeout(function(){$('.player-audio-min.general').addClass('big');
                                  $('.player-audio-min.general').addClass('big-active');
                                  $('#status-bar').removeClass('ios-topnavbar-bg');}, 100);
            setTimeout(function(){
              $('.big.big-active .scrubber-options').addClass('open');
            }, 400);
          }
        } else if ( PlayerOpenStyle == 1 ) {
          // THE CLICK OPENS THE SMALL PLAYER
          if($('.player-audio-min.general.big-active').is(':visible')) {
            //nothing
          } else if(!$('.player-audio-min.general').is(':visible')) {
            $('.player-audio-min.general').addClass('alwaysblock');
            setTimeout(function(){
              $('.tabbed-menu .blur').addClass('active');
              $('.player-audio-min.general').addClass('mini');
              $('.player-audio-min.general').addClass('mini-active');
            }, 100);
          }
        }
        $('.page').removeClass('nope');
        $('.panel.sidebar').addClass('player-active');
      }
    });

    /* Switch from Mini Player Video to Big Player Video */ 
    $('.player-video-min .mini-player .player-song-info').on('click', function() {

      if ( $("body").attr("device-size") != "iphoneX" ) {
        $("#status-bar").css("opacity","0");
      } else {
        $("#status-bar").css("opacity","1");
      }

      /* Lowering Mini Player */
      $('.player-video-min.general').addClass('mini-disactive');
      setTimeout(function(){
        $('.player-video-min.general').removeClass('mini-active'); 
        $('.player-video-min.general').removeClass('alwaysblock');
      }, 500);

      setTimeout(function(){$('.close-video').removeClass('active');}, 500);

      /* Disabling Mini Player */
      setTimeout(function(){
        $('.player-video-min.general').removeClass('mini');
        $('.player-video-min.general').removeClass('mini-disactive');
        $('.player-video-min.general').addClass('alwaysblock');
      }, 700);

      /* Opening Big Player */
      setTimeout(function(){
        $('#status-bar').removeClass('ios-topnavbar-bg');
        $('.player-video-min.general').addClass('big');
        $('.player-video-min.general').addClass('big-active');
      }, 900);

      setTimeout(function(){
        $('.big.big-active .scrubber-options').addClass('open');
      }, 1200);

      setTimeout(function(){ $('.page').addClass('nope'); }, 1500);
    });

    //provare all play



    function createVideoPlayerGeneral() {
      if ( $("body").attr("device-size") != "iphoneX" ) {
        $("#status-bar").css({"opacity":"0","visibility":"hidden"});
      } else {
        $("#status-bar").css({"opacity":"1","visibility":"visible"});
      }
      $(window).resize(function() {
        if ( $("body").attr("device-size") != "iphoneX" ) {
          $("#status-bar").css({"opacity":"0","visibility":"hidden"});
        } else {
          $("#status-bar").css({"opacity":"1","visibility":"visible"});
        }
      });
      $('#status-bar').removeClass('ios-topnavbar-bg');
      $('.the-video').removeClass('playing').removeClass('current');

      var minNumber = 100000,
          maxNumber = 1000000,
          randomNumberVisual,
          randomNumberLike;
      do {
        //function randomNumberFromRange(min,max){return Math.floor(Math.random()*(max-min+1)+min);}
        randomNumberVisual = randomNumberFromRange(minNumber, maxNumber).toString(),
          randomNumberLike = randomNumberFromRange(minNumber, maxNumber).toString();

        var randomNumberVisualWithCommas = randomNumberVisual.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."),
            randomNumberLikeWithCommas = randomNumberLike.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
      }
      while (randomNumberVisual < randomNumberLike);
      $('.player-video-footer .video-visual p').text(randomNumberVisualWithCommas);
      $('.player-video-footer .video-like.like-container .like').text(randomNumberLikeWithCommas);

      /* Lowering Mini Player */
      $('.player-audio-min.general').addClass('mini-disactive');
      setTimeout(function(){
        $('.player-audio-min.general').removeClass('mini-active'); 
        $('.player-audio-min.general').removeClass('alwaysblock');
      }, 500);

      /* Disabling Mini Player */
      setTimeout(function(){
        $('.player-audio-min.general').removeClass('mini');
        $('.player-audio-min.general').removeClass('mini-disactive');
        $('.player-audio-min.general').removeClass('alwaysblock');
        $('.tabbed-menu .blur').removeClass('active');
      }, 700);

      if($('.player-video-min.general.mini-active').is(':visible')) {
        /* Lowering Mini Player */
        $('.player-video-min.general').addClass('mini-disactive');
        setTimeout(function(){
          $('.player-video-min.general').removeClass('mini-active'); 
          $('.player-video-min.general').removeClass('alwaysblock');
        }, 500);
        /* Disabling Mini Player */
        setTimeout(function(){
          $('.player-video-min.general').removeClass('mini');
          $('.player-video-min.general').removeClass('mini-disactive');
          $('.player-video-min.general').addClass('alwaysblock');
        }, 700);
        /* Opening Big Player */
        setTimeout(function(){
          $('#status-bar').removeClass('ios-topnavbar-bg');
          $('.player-video-min.general').addClass('big');
          $('.player-video-min.general').addClass('big-active');
        }, 900);
      } else {
        /* Opening Big Player */
        $('#status-bar').removeClass('ios-topnavbar-bg');
        $('.player-video-min.general').addClass('big');
        $('.player-video-min.general').addClass('big-active');
      }
    }

    function CreateVideoAndPlayerEffect() {
      var CreateHeaderVideoPlayer = $('<div class="gradient-top"></div><section class="headers" header-type="video-player"><header><div class="main-grids safe-area"><div class="inner"><button class="close-video-player"><svg width="18" height="18" viewBox="0 0 18 18"><g fill="none" fill-rule="evenodd"><path d="M-6-5h28v28H-6z"/><path fill="#FFF" d="M11.547 9.219l4.95-4.95a2 2 0 1 0-2.829-2.829l-4.95 4.95-4.95-4.95A2 2 0 1 0 .94 4.268l4.95 4.95-4.95 4.95a2 2 0 1 0 2.83 2.829l4.95-4.95 4.95 4.95a2 2 0 1 0 2.829-2.83l-4.95-4.95z"/></g></svg></button><button class="option"><svg width="4" height="18" viewBox="0 0 4 18"><g fill="none" fill-rule="evenodd"><path d="M-12-5h28v28h-28z"/><path fill="#FFF" d="M0 2a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm0 7a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm0 7a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/></g></svg></button></div></div></header></section>');
      videojs(document.querySelector('.video-js'));
      CreateHeaderVideoPlayer.prependTo('.vjs-default-skin');

      $('.vjs-fullscreen-control').appendTo('.headers[header-type="video-player"] .inner');
      $('.vjs-play-control').insertAfter('.vjs-big-play-button');
      $('.vjs-current-time').insertAfter('.vjs-play-control');
      $('.vjs-duration').insertAfter('.vjs-current-time');
      $('.vjs-play-control, .vjs-big-play-button').addClass('no-fastclick');

      $('.close-video').on('click', function(e) {
        $(this).addClass('close');
        $('.video-wrapper video, #video-js').addClass('close');
        $('.video-wrapper iframe').addClass('close');
        $('.the-video').removeClass('playing').removeClass('current');

        setTimeout(function(){
          $(this).remove();
          $('.video-wrapper video, #video-js').remove();
          $('.video-wrapper iframe').remove();
        }, 500);

        setTimeout(function(){
          $('.player-video-min.general').removeClass('alwaysblock');
          $('.player-video-min.general').removeClass('mini');
          $('.player-video-min.general').removeClass('mini-active');
        }, 1500);

      });

      $('.video-player-comment-list .published').on('click', function() {
        setTimeout(function(){
          $('.page.profile').addClass('other-user-profile');
        }, 200);
      });

      $('.headers[header-type="video-player"] .inner button.option').on('click', function() {$(".video-player-options").addClass('open');});
      // Switch from Big Player Video to Mini Player Video 
      $('.headers[header-type="video-player"] .inner button.close-video-player, .video-playlist-control-player .playlist-icon, .video-player-comment-list .published').on('click', function() {
        if ( $("body").attr("device-size") != "iphoneX" ) {
          $("#status-bar").css({"opacity":"1","visibility":"visible"});
        }
        $(window).resize(function() {
          if ( $("body").attr("device-size") != "iphoneX" ) {
            $("#status-bar").css({"opacity":"1","visibility":"visible"});
          }
        });

        $('.player-video-min').addClass('big-disactive');
        // Closing Big Player
        setTimeout(function(){
          $('.player-video-min.general').removeClass('big');
          $('.player-video-min.general').removeClass('big-active');
          $('.player-video-min.general').removeClass('big-disactive');
          $('.player-video-min.general').removeClass('alwaysblock');
          $('.scrubber-options').removeClass('open');
        }, 700);
        // Disabling Big Player and Opening Mini Player
        setTimeout(function(){
          $('#status-bar').addClass('ios-topnavbar-bg');
          $('.player-video-min.general').addClass('alwaysblock');
          setTimeout(function(){
            $('.player-video-min.general').addClass('mini');
            $('.player-video-min.general').addClass('mini-active');
          }, 100);
        }, 1000);
        setTimeout(function(){
          $('.close-video').addClass('active');
        }, 1500);
        setTimeout(function(){
          $('.page').addClass('nope');
        }, 700);
      });
    } // end CreateVideoAndPlayerEffect()

    // Load in a track on play all click
    $('.video-play-all').on('click', function(e) {

      var theVideo = $(".page-on-center .vertical-playlist-video .the-video:nth-child(1)");
      var mini_player_title = theVideo.find("h2").text(),
          mini_player_author = theVideo.find("cite").text(),
          mini_album_cover = theVideo.attr("album-cover"),
          mini_player_avatar_src = "";

      $(".options-container-overlay.music-player-add-to .album-cover img").attr("src", mini_player_avatar_src + mini_album_cover);
      $(".options-container-overlay.music-player-add-to .title-author h2, .options-container-overlay.video-player-options .title-author h2").text(mini_player_title);
      $(".options-container-overlay.music-player-add-to .title-author cite, .options-container-overlay.video-player-options .title-author cite").text(mini_player_author);

      $('.options-container-overlay.video-player-options .resolution').on('click', function(e) {
        $('.options-container-overlay.video-player-options .resolution').removeClass('active');
        $(this).addClass('active');
      });

      $('audio').animate({volume: 0}, 600, function () {
        audio.pause();
        $('.play').removeClass('active');
      });

      e.preventDefault();
      var typevideo = theVideo.attr('typevideo'),
          urlvideo = theVideo.find('a').attr('data-src'),
          video_title = theVideo.find("h2").text(),
          video_author = theVideo.find("cite").text(),
          video_avatar = theVideo.attr("avatar"),
          video_src = "";

      $('.player-video-description h2').text(video_title);
      $('.player-video-description cite').text(video_author);

      /* Reset video */
      $('.video-wrapper video, #video-js, .video-js, .close-video').remove();

      /* Check Video Type */
      switch (typevideo) {
        case 'video/mp4':
          $("<button class='close-video'><svg width='14px' height='14px' viewBox='0 0 16 17'><g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'><g transform='translate(-7.000000, -6.000000)'><rect x='0' y='0' width='28' height='28'></rect><path d='M16.9953742,14.5024854 L22.3097444,9.18811519 C22.8600654,8.63779413 22.8600654,7.74554742 22.3097444,7.19522637 C21.7594233,6.64490532 20.8671766,6.64490532 20.3168556,7.19522637 L20.3168556,7.19522637 L15.0024854,12.5095966 L9.68811519,7.19522637 L9.68811519,7.19522637 C9.13779413,6.64490532 8.24554742,6.64490532 7.69522637,7.19522637 C7.14490532,7.74554742 7.14490532,8.63779413 7.69522637,9.18811519 L13.0095966,14.5024854 L7.69522637,19.8168556 C7.14490532,20.3671766 7.14490532,21.2594233 7.69522637,21.8097444 L7.69522637,21.8097444 C8.24554742,22.3600654 9.13779413,22.3600654 9.68811519,21.8097444 L9.68811519,21.8097444 L15.0024854,16.4953742 L20.3168556,21.8097444 L20.3168556,21.8097444 C20.8671766,22.3600654 21.7594233,22.3600654 22.3097444,21.8097444 L22.3097444,21.8097444 C22.8600654,21.2594233 22.8600654,20.3671766 22.3097444,19.8168556 L16.9953742,14.5024854 Z' fill='#120810'></path></g></g></svg></button><video controls id='video-js' class='video-js vjs-default-skin vjs-16-9' width='600' height='200'><source src="+urlvideo+" type="+typevideo+"></video>").appendTo('.video-wrapper .video-wrapper-inner');
          CreateVideoAndPlayerEffect();
          break;
        case 'video/youtube':
          $("<button class='close-video'><svg width='14px' height='14px' viewBox='0 0 16 17'><g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'><g transform='translate(-7.000000, -6.000000)'><rect x='0' y='0' width='28' height='28'></rect><path d='M16.9953742,14.5024854 L22.3097444,9.18811519 C22.8600654,8.63779413 22.8600654,7.74554742 22.3097444,7.19522637 C21.7594233,6.64490532 20.8671766,6.64490532 20.3168556,7.19522637 L20.3168556,7.19522637 L15.0024854,12.5095966 L9.68811519,7.19522637 L9.68811519,7.19522637 C9.13779413,6.64490532 8.24554742,6.64490532 7.69522637,7.19522637 C7.14490532,7.74554742 7.14490532,8.63779413 7.69522637,9.18811519 L13.0095966,14.5024854 L7.69522637,19.8168556 C7.14490532,20.3671766 7.14490532,21.2594233 7.69522637,21.8097444 L7.69522637,21.8097444 C8.24554742,22.3600654 9.13779413,22.3600654 9.68811519,21.8097444 L9.68811519,21.8097444 L15.0024854,16.4953742 L20.3168556,21.8097444 L20.3168556,21.8097444 C20.8671766,22.3600654 21.7594233,22.3600654 22.3097444,21.8097444 L22.3097444,21.8097444 C22.8600654,21.2594233 22.8600654,20.3671766 22.3097444,19.8168556 L16.9953742,14.5024854 Z' fill='#120810'></path></g></g></svg></button>").appendTo('.video-wrapper .video-wrapper-inner');
          var dataSetup = '{ "techOrder": ["youtube"], "sources": [{ "type": "video/youtube", "src": "'+urlvideo+'"}] }';
          $("<video class='video-js vjs-tech vsg-player vjs-default-skin vjs-16-9' controls width='640' height='264' data-setup='"+dataSetup+"'></video>").appendTo('.video-wrapper .video-wrapper-inner'); 
          CreateVideoAndPlayerEffect();
          break;
        case 'video/vimeo':
          $("<button class='close-video'><svg width='14px' height='14px' viewBox='0 0 16 17'><g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'><g transform='translate(-7.000000, -6.000000)'><rect x='0' y='0' width='28' height='28'></rect><path d='M16.9953742,14.5024854 L22.3097444,9.18811519 C22.8600654,8.63779413 22.8600654,7.74554742 22.3097444,7.19522637 C21.7594233,6.64490532 20.8671766,6.64490532 20.3168556,7.19522637 L20.3168556,7.19522637 L15.0024854,12.5095966 L9.68811519,7.19522637 L9.68811519,7.19522637 C9.13779413,6.64490532 8.24554742,6.64490532 7.69522637,7.19522637 C7.14490532,7.74554742 7.14490532,8.63779413 7.69522637,9.18811519 L13.0095966,14.5024854 L7.69522637,19.8168556 C7.14490532,20.3671766 7.14490532,21.2594233 7.69522637,21.8097444 L7.69522637,21.8097444 C8.24554742,22.3600654 9.13779413,22.3600654 9.68811519,21.8097444 L9.68811519,21.8097444 L15.0024854,16.4953742 L20.3168556,21.8097444 L20.3168556,21.8097444 C20.8671766,22.3600654 21.7594233,22.3600654 22.3097444,21.8097444 L22.3097444,21.8097444 C22.8600654,21.2594233 22.8600654,20.3671766 22.3097444,19.8168556 L16.9953742,14.5024854 Z' fill='#120810'></path></g></g></svg></button>").appendTo('.video-wrapper .video-wrapper-inner');
          var dataSetup = '{ "techOrder": ["vimeo"], "sources": [{ "type": "video/vimeo", "src": "'+urlvideo+'"}] }';
          $("<video class='video-js vjs-tech vsg-player vjs-default-skin vjs-16-9' controls width='640' height='264' data-setup='"+dataSetup+"'></video>").appendTo('.video-wrapper .video-wrapper-inner'); 
          CreateVideoAndPlayerEffect();
      }

      createVideoPlayerGeneral();
      theVideo.addClass('playing').addClass('current').siblings().removeClass('playing').removeClass('current');

    });

    var video = $(".the-video");
    video.on('click', function(e) {
      var checkClick = $(e.target).attr('checkClick');
      if( checkClick == 'checkClick' ){
      } else {

        var mini_player_title = $(this).find("h2").text(),
            mini_player_author = $(this).find("cite").text(),
            mini_album_cover = $(this).attr("album-cover"),
            mini_player_avatar_src = "";

        $(".options-container-overlay.music-player-add-to .album-cover img").attr("src", mini_player_avatar_src + mini_album_cover);
        $(".options-container-overlay.music-player-add-to .title-author h2, .options-container-overlay.video-player-options .title-author h2").text(mini_player_title);
        $(".options-container-overlay.music-player-add-to .title-author cite, .options-container-overlay.video-player-options .title-author cite").text(mini_player_author);

        $('.options-container-overlay.video-player-options .resolution').on('click', function(e) {
          $('.options-container-overlay.video-player-options .resolution').removeClass('active');
          $(this).addClass('active');
        });

        $('audio').animate({volume: 0}, 600, function () {
          audio.pause();
          $('.play').removeClass('active');
        });
        $('#status-bar').removeClass('ios-topnavbar-bg');

        e.preventDefault();
        var typevideo = $(this).attr('typevideo'),
            urlvideo = $('a', this).attr('data-src'),
            video_title = $(this).find("h2").text(),
            video_author = $(this).find("cite").text(),
            video_avatar = $(this).attr("avatar"),
            video_src = "";

        $(this).addClass('playing').addClass('current').siblings().removeClass('playing').removeClass('current');

        $('.player-video-description h2').text(video_title);
        $('.player-video-description cite').text(video_author);

        /* Reset video */
        $('.video-wrapper video, #video-js, .video-js, .close-video').remove();

        /* Check Video Type */
        switch (typevideo) {
          case 'video/mp4':
            $("<button class='close-video'><svg width='14px' height='14px' viewBox='0 0 16 17'><g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'><g transform='translate(-7.000000, -6.000000)'><rect x='0' y='0' width='28' height='28'></rect><path d='M16.9953742,14.5024854 L22.3097444,9.18811519 C22.8600654,8.63779413 22.8600654,7.74554742 22.3097444,7.19522637 C21.7594233,6.64490532 20.8671766,6.64490532 20.3168556,7.19522637 L20.3168556,7.19522637 L15.0024854,12.5095966 L9.68811519,7.19522637 L9.68811519,7.19522637 C9.13779413,6.64490532 8.24554742,6.64490532 7.69522637,7.19522637 C7.14490532,7.74554742 7.14490532,8.63779413 7.69522637,9.18811519 L13.0095966,14.5024854 L7.69522637,19.8168556 C7.14490532,20.3671766 7.14490532,21.2594233 7.69522637,21.8097444 L7.69522637,21.8097444 C8.24554742,22.3600654 9.13779413,22.3600654 9.68811519,21.8097444 L9.68811519,21.8097444 L15.0024854,16.4953742 L20.3168556,21.8097444 L20.3168556,21.8097444 C20.8671766,22.3600654 21.7594233,22.3600654 22.3097444,21.8097444 L22.3097444,21.8097444 C22.8600654,21.2594233 22.8600654,20.3671766 22.3097444,19.8168556 L16.9953742,14.5024854 Z' fill='#120810'></path></g></g></svg></button><video controls id='video-js' class='video-js vjs-default-skin vjs-16-9' width='600' height='200'><source src="+urlvideo+" type="+typevideo+"></video>").appendTo('.video-wrapper .video-wrapper-inner');
            CreateVideoAndPlayerEffect();
            break;
          case 'video/youtube':
            $("<button class='close-video'><svg width='14px' height='14px' viewBox='0 0 16 17'><g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'><g transform='translate(-7.000000, -6.000000)'><rect x='0' y='0' width='28' height='28'></rect><path d='M16.9953742,14.5024854 L22.3097444,9.18811519 C22.8600654,8.63779413 22.8600654,7.74554742 22.3097444,7.19522637 C21.7594233,6.64490532 20.8671766,6.64490532 20.3168556,7.19522637 L20.3168556,7.19522637 L15.0024854,12.5095966 L9.68811519,7.19522637 L9.68811519,7.19522637 C9.13779413,6.64490532 8.24554742,6.64490532 7.69522637,7.19522637 C7.14490532,7.74554742 7.14490532,8.63779413 7.69522637,9.18811519 L13.0095966,14.5024854 L7.69522637,19.8168556 C7.14490532,20.3671766 7.14490532,21.2594233 7.69522637,21.8097444 L7.69522637,21.8097444 C8.24554742,22.3600654 9.13779413,22.3600654 9.68811519,21.8097444 L9.68811519,21.8097444 L15.0024854,16.4953742 L20.3168556,21.8097444 L20.3168556,21.8097444 C20.8671766,22.3600654 21.7594233,22.3600654 22.3097444,21.8097444 L22.3097444,21.8097444 C22.8600654,21.2594233 22.8600654,20.3671766 22.3097444,19.8168556 L16.9953742,14.5024854 Z' fill='#120810'></path></g></g></svg></button>").appendTo('.video-wrapper .video-wrapper-inner');
            var dataSetup = '{ "techOrder": ["youtube"], "sources": [{ "type": "video/youtube", "src": "'+urlvideo+'"}] }';
            $("<video class='video-js vjs-tech vsg-player vjs-default-skin vjs-16-9' controls width='640' height='264' data-setup='"+dataSetup+"'></video>").appendTo('.video-wrapper .video-wrapper-inner'); 
            CreateVideoAndPlayerEffect();
            break;
          case 'video/vimeo':
            $("<button class='close-video'><svg width='14px' height='14px' viewBox='0 0 16 17'><g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'><g transform='translate(-7.000000, -6.000000)'><rect x='0' y='0' width='28' height='28'></rect><path d='M16.9953742,14.5024854 L22.3097444,9.18811519 C22.8600654,8.63779413 22.8600654,7.74554742 22.3097444,7.19522637 C21.7594233,6.64490532 20.8671766,6.64490532 20.3168556,7.19522637 L20.3168556,7.19522637 L15.0024854,12.5095966 L9.68811519,7.19522637 L9.68811519,7.19522637 C9.13779413,6.64490532 8.24554742,6.64490532 7.69522637,7.19522637 C7.14490532,7.74554742 7.14490532,8.63779413 7.69522637,9.18811519 L13.0095966,14.5024854 L7.69522637,19.8168556 C7.14490532,20.3671766 7.14490532,21.2594233 7.69522637,21.8097444 L7.69522637,21.8097444 C8.24554742,22.3600654 9.13779413,22.3600654 9.68811519,21.8097444 L9.68811519,21.8097444 L15.0024854,16.4953742 L20.3168556,21.8097444 L20.3168556,21.8097444 C20.8671766,22.3600654 21.7594233,22.3600654 22.3097444,21.8097444 L22.3097444,21.8097444 C22.8600654,21.2594233 22.8600654,20.3671766 22.3097444,19.8168556 L16.9953742,14.5024854 Z' fill='#120810'></path></g></g></svg></button>").appendTo('.video-wrapper .video-wrapper-inner');
            var dataSetup = '{ "techOrder": ["vimeo"], "sources": [{ "type": "video/vimeo", "src": "'+urlvideo+'"}] }';
            $("<video class='video-js vjs-tech vsg-player vjs-default-skin vjs-16-9' controls width='640' height='264' data-setup='"+dataSetup+"'></video>").appendTo('.video-wrapper .video-wrapper-inner'); 
            CreateVideoAndPlayerEffect();
        }

        createVideoPlayerGeneral();
        $(this).addClass('playing').addClass('current').siblings().removeClass('playing').removeClass('current');

      }
    });

    $('#tab97').on('tab:show', function () {
      $('.player-audio-min.big .headers[header-type="music-player"]').addClass('review-show');
    });
    $('#tab97').on('tab:hide', function () {
      $('.player-audio-min.big .headers[header-type="music-player"]').removeClass('review-show');
    });

    $('#tab94').on('tab:show', function () {
      var albumsBarHeight = $('.page.albums .headers[header-type="back"]').height();
      $('.page.albums .scrollable-content').scroll(function() {
        if( $('#tab94').hasClass('active') ) {
          $('#status-bar').removeClass('ios-topnavbar-bg')
          if ($(this).scrollTop() > albumsBarHeight + 1) {
            $('.page.albums').addClass('scrolling');
          } else {
            $('.page.albums').removeClass('scrolling');
          }
        }
      });
    });

    $('.page.news .scrollable-content').scroll(function() {
      $('#status-bar').removeClass('ios-topnavbar-bg')
    });

    var heightObject = $('.special-scroll .big-player-queue-container'),
        tabsObject = $('.special-scroll .section-tabs[section-type="tabs"]'),
        playlistTitle = $('.section-titles[section-type="playlists-large"]'),
        coverBlur =  $('.special-scroll .album-cover-blur img'),
        coverBlurHeight = coverBlur.height(),
        range = 50;

    $('.special-scroll .scrollable-content').scroll(function() {
      var specialScrollBarHeight = $('.special-scroll .headers[header-type="back"]').height();

      if( $('.special-scroll .special-scroll-tab').hasClass('active') ) {
        $('#status-bar').removeClass('ios-topnavbar-bg')
        if ($(this).scrollTop() > specialScrollBarHeight + 1) {
          $('.special-scroll').addClass('special-scrolling');
          /*
var scrollTop = $(this).scrollTop(),
height = heightObject.outerHeight(),
offset = height / 2,
calc = 1 - (scrollTop - offset + range) / range,
calc2 = coverBlurHeight - scrollTop;

tabsObject.css({ 'opacity': calc});
heightObject.css({ 'opacity': calc + 1.71});
playlistTitle.css({ 'opacity': calc + 2.71});

coverBlur.css({ 'height': calc2 + 50});

if ( calc > '1' ) {
tabsObject.css({ 'opacity': 1 });
heightObject.css({ 'opacity': 1 });
playlistTitle.css({ 'opacity': 1 });
} else if ( calc + 2.71 < '0' ) {
tabsObject.css({ 'opacity': 0 });
heightObject.css({ 'opacity': 0 });
playlistTitle.css({ 'opacity': 0 });
}
*/
          if ($(this).scrollTop() > specialScrollBarHeight + 160) {
            $('.special-scroll').addClass('header-show');
          } else {
            $('.special-scroll').removeClass('header-show');
          }

        } else {
          $('.special-scroll').removeClass('special-scrolling');
        }
      }
    });

    bbflyCheckRatings();

    $('.social-functions.like').on('click', function() {
      var likeNumber = $(this).text(),
          like = parseInt(likeNumber);
      if ( $(this).hasClass('active') ) {
        $(this).removeClass('active');
        $(this).text(like - 1);
      } else {
        $(this).addClass('active');
        $(this).text(like + 1);
      }
    });

    bbflyShuffleRepeat();
    bbflyFollowButton();

    // PlayPause Mini Player
    var muted = false;
    $('.player-audio-min.general .play').off('click').on('click', function(e) {
      e.preventDefault();
      $('.mini-player-song').addClass('playing');
      $('.play').addClass('active');
      var button = $(this);
      if (muted) {
        $('audio').animate({volume: 1}, 600, function () {
          audio.play();
          muted = false;
        });
      }
    });
    $('.player-audio-min.general .pause').off('click').on('click', function(e) {
      e.preventDefault();
      $('.mini-player-song').removeClass('playing');
      $('.play').removeClass('active');
      var button = $(this);
      if (!muted) {
        $('audio').animate({volume: 0}, 600, function () {
          audio.pause();
          muted = true;
        });
      }
    });

    // PlayPause Big Player
    $('.player-command .playPause, button.play').off('click').on('click', function(e) {
      e.preventDefault();
      var button = $(this);
      if (!muted) {
        $('.play').removeClass('active');
        $('audio').animate({volume: 0}, 600, function () {
          audio.playPause();
          muted = true;
        });
      } else {
        $('.play').addClass('active');
        audio.playPause();
        $('audio').animate({volume: 1}, 600, function () {
          muted = false;
        });
      }
    });

    $('.playlist-song .the-song').on('click', function(e) {
      var checkClick = $(e.target).attr('checkClick');
      if( checkClick == 'checkClick' ){
      }else{
        if ( $(this).hasClass('first') ) {
          $(".player-command .prev").addClass("first");
          $(".player-command .next").removeClass("last");
        } else if ( $(this).hasClass('last') ) {
          $(".player-command .next").addClass("last");
          $(".player-command .prev").removeClass("first");
        } else {
          $(".player-command .next").removeClass("last");
          $(".player-command .prev").removeClass("first");
        }
      }
    });


    // rifinire
    // right arrow
    $('.player-command .next').on('click', function(e) {
      if (muted) {
        $('.play').addClass('active');
        audio.playPause();
        $('audio').animate({volume: 1}, 600, function () {
          muted = false;
        });
      }
    });
    // back arrow
    $('.player-command .prev').on('click', function(e) {
      if (muted) {
        $('.play').addClass('active');
        audio.playPause();
        $('audio').animate({volume: 1}, 600, function () {
          muted = false;
        });
      }
    });
    // rifinire
  } // bbflyCreateMusicPlayer

  function bbflySimulationNewComment() {
    $('.video-player-leave-comment button').on('click', function(e) {
      var text = $('.video-player-leave-comment input').val();
      if ( text != '') {
        $('<div class="comment-container"><a href="profile.html"><div class="comment"><div class="gravatar" avatar="'+userProfileAvatar+'" country="'+userProfileCountry+'"><img alt="UserAvatar" src="'+userProfileAvatar+'" class="avatar photo" width="100%" height="100%"></div><section><p>'+text+'</p></section><footer><cite class="author">'+userProfileName+'</cite><span class="date">Now</span></footer></div></a></div>').prependTo('.video-player-comment-list');
        setTimeout( function(){$('.video-player-comment-list .comment-container').addClass('published'); $('.video-player-comment-list .comment-container').removeClass('comment-container'); text = $('.leave-comment input').val(''); }, 1000);
      }
    });

    $('.player-video-description button.description').on('click', function() {
      $(this).toggleClass('open');
      $('.player-video-description .description-all').slideToggle(300);
    });

    $('.video-player-comment-list .published').on('click', function() {
      var minNumber = 100,
          maxNumber = 1000,
          randomNumberFollowers = randomNumberFromRange(minNumber, maxNumber),
          randomNumberFollowing = randomNumberFromRange(minNumber, maxNumber),
          userAvatar = $(this).find('.gravatar').attr("avatar"),
          userAuthor = $(this).find("cite").text(),
          userCountry = $(this).find('.gravatar').attr("country"),
          userAvatarSrc = "";
      function randomNumberFromRange(min,max){return Math.floor(Math.random()*(max-min+1)+min);}

      setTimeout(function(){
        $('.page.profile .headers .title-author h2').text(userAuthor);
        $('.page.profile .headers .album-cover img').attr("src", userAvatarSrc + userAvatar);
        $('.page.profile .album-cover-blur img').attr("src", userAvatarSrc + userAvatar);
        $(".profile-follow-info .followers .number").text(randomNumberFollowers);
        $(".profile-follow-info .following .number").text(randomNumberFollowing);
        $(".profile-avatar-user img").attr("src", userAvatarSrc + userAvatar);
        $(".profile-avatar-user .user-country cite").text(userAuthor);
        $(".profile-avatar-user .user-country .country").text(userCountry);
      }, 200);

    });

    var loadMoreComment = $('<div class="published"><div class="comment"><div class="gravatar" avatar="" country="London"><img alt="UserAvatar" src="" class="avatar photo" width="100%" height="100%"></div><section><p>One of my favorite song and this song touch my soul﻿</p></section><footer><cite class="author">John Hazey</cite><span class="date">1 month ago</span></footer></div></a></div><div class="published"><a href="profile.html"><div class="comment"><div class="gravatar" avatar="" country="Argentina"><img alt="UserAvatar" src="" class="avatar photo" width="100%" height="100%"></div><section><p>Love song nice song to meet you﻿</p></section><footer><cite class="author">Martin</cite><span class="date">1 month ago</span></footer></div></a></div><div class="published"><a href="profile.html"><div class="comment"><div class="gravatar" avatar=" country="Hawai"><img alt="UserAvatar" src="124sz2.jpg" class="avatar photo" width="100%" height="100%"></div><section><p>Nice song, beautiful! 💕😘💌﻿</p></section><footer><cite class="author">Carl Huly</cite><span class="date">2 month ago</span></footer></div></a></div><div class="published"><a href="profile.html"><div class="comment"><div class="gravatar" avatar="" country="Japan"><img alt="UserAvatar" src="" class="avatar photo" width="100%" height="100%"></div><section><p>I am big fan of this song its<br> truly amazing song﻿</p></section><footer><cite class="author">Martina Shiro</cite><span class="date">2 month ago</span></footer></div></a></div><div class="published"><a href="profile.html"><div class="comment"><div class="gravatar" avatar="" country="'+userProfileCountry+'"><img alt="UserAvatar" src="" class="avatar photo" width="100%" height="100%"></div><section><p>Most romantic song﻿</p></section><footer><cite class="author">Alessia Tienk</cite><span class="date">4 month ago</span></footer></div></div>'),
        loadMoreNews = $('<div class="profile-news news-preview"><a href="single-news.html" checkclick="checkClick"><div class="title-news-img-container author-info"><img alt="Avatar User" src="" width="100%" height="auto" checkclick="checkClick"></div></a><div class="title-news-container"><a href="single-news.html" checkclick="checkClick"><h2 class="title-news" checkclick="checkClick" avatar="">Hazey Still In Top 10 With One More Night</h2></a><p class="news-content">Hazey Single "One More Night" still in Top 10 of the Global Top 50 chart after two week…</p><span class="like">687</span><span class="shares">566</span><span class="news-date">29 September, 2017</span><span class="news-author">Wail</span></div></div><div class="profile-news news-preview"><a href="single-news.html" checkclick="checkClick"><div class="title-news-img-container author-info"><img alt="Avatar User" src="user_avatar.jpg" width="100%" height="auto" checkclick="checkClick"></div></a><div class="title-news-container"><a href="single-news.html" checkclick="checkClick"><h2 class="title-news" checkclick="checkClick" avatar="35sz2">The Album "Life Happens" Is Now Available</h2></a><p class="news-content">Heize new Album "Life Happens" is now available for purchase…</p><span class="like">786</span><span class="shares">456</span><span class="news-date">20 September, 2017</span><span class="news-author">Lill</span></div></div>'),
        loadMoreVideo = $('<div class="the-video" typevideo="video/mp4" avatar="" album-cover=""><div> <a href="#" data-src=""></a> <div class="video-container"><div class="video-avatar"><img alt="avatar" src="" class="avatar" width="100%" height="100%"> <div class="like-container"><span checkclick="checkClick" class="heart-icon "><svg checkclick="checkClick" width="17px" height="15px" viewBox="0 0 17 15"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-7.000000, -9.000000)" fill="#8A7F87"><g><path checkclick="checkClick" d="M15.4200001,12.3674936 C16.2709429,10.2381896 17.615006,9 19.1037501,9 C21.7197286,9 23.8400002,11.3731073 23.8400002,14.3006408 C23.8400002,20.3635207 15.4200001,23.8417942 15.4200001,23.8417942 C15.4200001,23.8417942 7,20.3635207 7,14.3006408 C7,11.3731073 9.12027159,9 11.73625,9 C13.2249941,9 14.5685344,10.1493509 15.4200001,12.3674936 Z"></path></g></g></g></svg></span></div><div class="video-time-label"><div class="blur"></div><p class="video-time">2.15</p></div></div><div class="video-info"><h2 class="title">Devil Inside Me</h2><cite class="author" avatar="67sz2" album-cover="">Jay Park</cite><p class="video-views"><svg width="17" height="14" viewBox="0 0 17 14"><path fill="#FFF" fill-rule="evenodd" d="M8.502 13.29c5.294 0 8.32-5.667 8.32-6.611 0-.945-3.026-6.611-8.32-6.611-5.295 0-8.32 5.666-8.32 6.61 0 .945 3.025 6.612 8.32 6.612zm0-3.584a3.025 3.025 0 1 0 0-6.05 3.025 3.025 0 0 0 0 6.05z" opacity=".42"></path></svg>488.007</p></div></div></div></div><div class="the-video last" typevideo="video/mp4" avatar="" album-cover=""><div> <a href="#" data-src=""></a> <div class="video-container"><div class="video-avatar"><img alt="avatar" src="" class="avatar" width="100%" height="100%"> <div class="like-container"><span checkclick="checkClick" class="heart-icon "><svg checkclick="checkClick" width="17px" height="15px" viewBox="0 0 17 15"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-7.000000, -9.000000)" fill="#8A7F87"><g><path checkclick="checkClick" d="M15.4200001,12.3674936 C16.2709429,10.2381896 17.615006,9 19.1037501,9 C21.7197286,9 23.8400002,11.3731073 23.8400002,14.3006408 C23.8400002,20.3635207 15.4200001,23.8417942 15.4200001,23.8417942 C15.4200001,23.8417942 7,20.3635207 7,14.3006408 C7,11.3731073 9.12027159,9 11.73625,9 C13.2249941,9 14.5685344,10.1493509 15.4200001,12.3674936 Z"></path></g></g></g></svg></span></div><div class="video-time-label"><div class="blur"></div><p class="video-time">2.54</p></div></div><div class="video-info"><h2 class="title">A Silent Film</h2><cite class="author" avatar="206sz2" album-cover="">G Dragon</cite><p class="video-views"><svg width="17" height="14" viewBox="0 0 17 14"><path fill="#FFF" fill-rule="evenodd" d="M8.502 13.29c5.294 0 8.32-5.667 8.32-6.611 0-.945-3.026-6.611-8.32-6.611-5.295 0-8.32 5.666-8.32 6.61 0 .945 3.025 6.612 8.32 6.612zm0-3.584a3.025 3.025 0 1 0 0-6.05 3.025 3.025 0 0 0 0 6.05z" opacity=".42"></path></svg>668.442</p></div></div></div></div>');
    $('.video-player-comment-container .load-more-button-container button.load-more').on('click', function(e) {
      var lastComment = $('.video-player-comment-list:visible .published:last-of-type');
      loadMoreComment.insertAfter(lastComment);
      e.stopImmediatePropagation();
      $(this).prop("disabled", true);
    });

    $('.vertical-playlist-container button.vertical-playlist-button').on('click', function(e) {
      var lastNews = $('.all-profile-news:visible .inner .profile-news:last-of-type');
      var lastVideo = $('.vertical-playlist-video:visible .inner .the-video:last-of-type');
      lastVideo.removeClass('last');
      loadMoreNews.insertAfter(lastNews);
      loadMoreVideo.insertAfter(lastVideo);
      e.stopImmediatePropagation();
      $(this).prop("disabled", true);
    });

  }

  function bbflyCreateControllerPlayer() {

    bbflyCreateMusicPlayer();

    // next arrow - audio player
    $('.player-command .next').on('click', function(e) {
      setTimeout(function(){
        var next = $('.the-song.playing').next();
        if (next.is('.the-song')){
          next.click();
        } else {
          next = $('.the-song.playing').findNext('.the-song');
          next.click();
        }
        if (next.hasClass("last")) {$(".player-command .next").addClass("last");}
        $(".player-command .prev").removeClass("first");
        $(".the-song").removeClass('current');
        next.addClass('current');
      }, 100);
    });
    // prev arrow - audio player
    $('.player-command .prev').on('click', function(e) {
      setTimeout(function(){ 
        var prev = $('.the-song.playing').prev();
        if (prev.is('.the-song')){
          prev.click();
        } else {
          prev = $('.the-song.playing').findPrev('.the-song');
          prev.click();
        }
        if (prev.hasClass("first")) {$(".player-command .prev").addClass("first");}
        $(".player-command .next").removeClass("last");
        $(".the-song").removeClass('current');
        prev.addClass('current');
      }, 100);
    });

    // next arrow - video player
    $('.player-video-min .next').on('click', function(e) {
      var next = $('.the-video.playing').next();
      if (next.is('.the-video')){
        next.click();
      } else {
        next = $('.the-video.playing').parent().next().find(".the-video:first-child");
        next.click();
      }
      $(".the-video").removeClass('current');
      if (next.hasClass("last")) {$(".player-video-min .next").addClass("last");}
      $(".player-video-min .previous").removeClass("first");
      next.addClass('current');
    });
    // prev arrow - video player
    $('.player-video-min .previous').on('click', function(e) {   	
      var prev = $('.the-video.playing').prev();
      if (prev.is('.the-video')){
        prev.click();
      } else {
        prev = $('.the-video.playing').parent().prev().find(".the-video:last-child");
        prev.click();
      }
      $(".the-video").removeClass('current');
      if (prev.hasClass("first")) {$(".player-video-min .previous").addClass("first");}
      $(".player-video-min .next").removeClass("last");
      prev.addClass('current');
    });

    bbflySimulationNewComment();

  } // end bbflyCreateControllerPlayer()

  function bbflyMiniPlayerAudio() {
    $('.player-audio-min .mini-player .player-song-info').on('click', function(e) {
      var checkClick = $(e.target).attr('checkClick');
      if( checkClick == 'checkClick' ){
      }else{
        /* Abbassamento Mini Player */
        $('.player-audio-min.general').addClass('mini-disactive');
        $('.tabbed-menu .blur').removeClass('active');
        setTimeout(function(){
          $('.player-audio-min.general').removeClass('mini-active'); 
          $('.player-audio-min.general').removeClass('alwaysblock');
        }, 500);

        /* Disattivazione Mini Player */
        setTimeout(function(){
          $('.player-audio-min.general').removeClass('mini');
          $('.player-audio-min.general').removeClass('mini-disactive');
          $('.player-audio-min.general').addClass('alwaysblock');
        }, 700);

        /* Apertura Big Player */
        setTimeout(function(){
          $('#status-bar').removeClass('ios-topnavbar-bg');
          $('.player-audio-min.general').addClass('big');
          $('.player-audio-min.general').addClass('big-active');
        }, 900);

        setTimeout(function(){
          $('.big.big-active .scrubber-options').addClass('open');
        }, 1200);

        setTimeout(function(){ $('.page').addClass('nope'); }, 1500);
      }
    });

    $('.player-audio-min .headers[header-type="music-player"] .minimize').on('click', function() {
      $('.player-audio-min').addClass('big-disactive');
      $('.player-audio-min .tab, .player-audio-min .buttons-row .tab-link').removeClass('active');
      $('.player-audio-min #tab98, .player-audio-min .buttons-row .tab-link.listen').addClass('active');
      /* Chiusura Big Player */
      setTimeout(function(){
        $('.player-audio-min.general').removeClass('big');
        $('.player-audio-min.general').removeClass('big-active');
        $('.player-audio-min.general').removeClass('big-disactive');
        $('.player-audio-min.general').removeClass('alwaysblock');
        $('.scrubber-options').removeClass('open');
      }, 700);

      /* Disattivazione Big Player e apertura Mini Player */
      setTimeout(function(){
        var StatusBarHeight = $('#status-bar').height();
        if ($(".scrollable-content, .options-container-overlay").scrollTop() > StatusBarHeight + 1) {
          $('#status-bar').addClass('ios-topnavbar-bg');
        } 
        $('.player-audio-min.general').addClass('alwaysblock');
        setTimeout(function(){
          $('.player-audio-min.general').addClass('mini');
          $('.player-audio-min.general').addClass('mini-active');
        }, 100);
        setTimeout(function(){$('.tabbed-menu .blur').addClass('active');}, 150);
      }, 1000);

      setTimeout(function(){
        $('.page').removeClass('nope');
      }, 700);

    });
  } // end bbflyMiniPlayerAudio()

  function bbflyBigPlayerToggleButton() {

    /* Cancellazione canzone dalla lista coda */
    $('.the-song .delete-track').on('click', function() {
      $('.the-song.playing').addClass('delete');
      $('.the-song.playing').animate( {'width':'0','height':'0'}, 300, 'swing');
      setTimeout(function(){ $('.the-song.playing.delete').remove() }, 1000);
    });

    $('.player-command .list .icon').on('click', function() {
      $('.player-audio-min, .album-cover-blur, .container-album-cover, .up-next-option, .player-audio-min.big .scrubber-command.scrubber-options').toggleClass('active');
      $('.player-audio-min, .album-cover-blur, .container-album-cover, .up-next-option, .player-audio-min.big .scrubber-command.scrubber-options').addClass('close');
      setTimeout(function(){ $('.home-indicator-container').toggleClass('only'); 	$('.player-audio-min, .album-cover-blur, .container-album-cover, .up-next-option, .player-audio-min.big .scrubber-command.scrubber-options').removeClass('close'); }, 300);
      $(this).toggleClass('active');
    });

    var musicPlayerBarHeight = $('.player-audio-min .headers[header-type="music-player"]').height();
    $('.player-audio-min[music-player-style="style1"] .audiojs').scroll(function() {
      if ($(this).scrollTop() > musicPlayerBarHeight + 1) {
        $('.player-audio-min[music-player-style="style1"] .headers[header-type="music-player"]').addClass('review-show').addClass('now-show');
      } else {
        $('.player-audio-min[music-player-style="style1"] .headers[header-type="music-player"]').removeClass('review-show').addClass('now-show');
      }
    });

    $('.player-audio-min button.share-icon').on('click', function() {$(".options-container-overlay.music-player-share").addClass('open'); $('.page').addClass('options-container-overlay-open'); });
    $('.player-audio-min button.addto-icon, .song-plus, .video-add-to-share-button').on('click', function() {$(".options-container-overlay.music-player-add-to").addClass('open'); $('.page').addClass('options-container-overlay-open'); });
    $('.player-audio-min .options-icon').on('click', function() {$(".options-container-overlay.music-player-option").addClass('open'); $('.page').addClass('options-container-overlay-open'); });

    $('.add-to-button').on('click', function() {
      var addToText = $(this).text(),
          addToButtonClicked = $(this);
      if ( addToButtonClicked.hasClass('active') ) {
        $('.add-to-button-container .notice-popup p').text('Removed to');
        $('.add-to-button-container .notice-popup h2').text(addToText);
        $('.add-to-button').removeClass('remove').removeClass('active').removeClass('add');
        addToButtonClicked.addClass('active').addClass('remove');
        setTimeout(function(){
          $('.notice-popup-container').addClass('active').addClass('fail');
        }, 1000);
        setTimeout(function(){
          addToButtonClicked.removeClass('remove').removeClass('active');
        }, 1500);
        setTimeout(function(){
          $('.notice-popup-container').removeClass('active');
          setTimeout(function(){
            $('.notice-popup-container').removeClass('fail');
          }, 1000);
        }, 2000);
      } else {
        $('.add-to-button-container .notice-popup p').text('Added to');
        $('.add-to-button-container .notice-popup h2').text(addToText);
        $('.add-to-button').removeClass('active').removeClass('remove').removeClass('add');
        addToButtonClicked.addClass('add');
        setTimeout(function(){
          $('.notice-popup-container').addClass('active').addClass('ok');
        }, 1000);
        setTimeout(function(){
          addToButtonClicked.addClass('active');
        }, 1500);
        setTimeout(function(){
          $('.notice-popup-container').removeClass('active');
          setTimeout(function(){
            $('.notice-popup-container').removeClass('ok');
          }, 1000);
        }, 2000);
      }
    });

    /* Chiude Music Player Share Overlay */
    $('.options-container-overlay.music-player-share .share-back .back').on('click', function() {
      $('.options-container-overlay.music-player-share').addClass('close');
      setTimeout(function(){
        $('.options-container-overlay.music-player-share').removeClass('open').removeClass('close');
        $('.page').removeClass('options-container-overlay-open');
      }, 500);
    });

    /* Chiude Music Player AddTo Overlay */
    $('.options-container-overlay.music-player-add-to .add-to-back .back').on('click', function() {
      $('.options-container-overlay.music-player-add-to').addClass('close');
      setTimeout(function(){
        $('.options-container-overlay.music-player-add-to').removeClass('open').removeClass('close');
        $('.page').removeClass('options-container-overlay-open');
      }, 500);
    });

    /* Chiude Music Player MusicPlayerPption Overlay */
    $('.options-container-overlay.music-player-option .music-player-option-back .back').on('click', function() {
      $('.options-container-overlay.music-player-option').addClass('close');
      setTimeout(function(){
        $('.options-container-overlay.music-player-option').removeClass('open').removeClass('close');
        $('.page').removeClass('options-container-overlay-open');
      }, 500);
    });

    /* Chiude Le Opzioni Audio Player */
    $('.music-player-option button.option').on('click', function() {
      $(".music-player-option").addClass('close');
      setTimeout(function(){ $('.music-player-option').removeClass('open'); $('.music-player-option').removeClass('close'); }, 400);
    });

    /* Chiude Le Opzioni Video Player */
    $('.video-player-options button.back').on('click', function() {
      $(".video-player-options").addClass('close');
      setTimeout(function(){ $('.video-player-options').removeClass('open'); $('.video-player-options').removeClass('close'); }, 400);
    });

    /* Chiude Le Opzioni, il Big Player e avvia il Download */
    $('.music-player-option button.download').on('click', function() {
      $(".music-player-option").addClass('close');
      setTimeout(function(){ $('.music-player-option').removeClass('open'); $('.music-player-option').removeClass('close'); }, 400);

      setTimeout(function(){
        $('.player-audio-min').addClass('big-disactive');
        /* Chiusura Big Player */
        setTimeout(function(){
          $('.player-audio-min.general').removeClass('big').removeClass('big-active').removeClass('big-disactive').removeClass('alwaysblock');
          $('.scrubber-options').removeClass('open');
        }, 700);

        /* Disattivazione Big Player e apertura Mini Player */
        setTimeout(function(){
          $('#status-bar').addClass('ios-topnavbar-bg');
          $('.player-audio-min.general').addClass('alwaysblock');
          setTimeout(function(){
            $('.player-audio-min.general').addClass('mini').addClass('mini-active');
          }, 100);
          setTimeout(function(){$('.tabbed-menu .blur').addClass('active');}, 150);
        }, 1000);
        setTimeout(function(){
          $('.page').removeClass('nope');
        }, 700);
      }, 400);

      setTimeout(function(){ 
        var big_player_title = $('.music-player-option .title-author .title').text(),
            big_player_author = $('.music-player-option .title-author .author').text(),
            big_player_avatar = $('.music-player-option .album-cover img').attr('src');

        $(".download-popup .download-title-author h2").text(big_player_title);
        $(".download-popup .download-title-author cite").text(big_player_author);
        $(".download-popup .download-avatar-author img").attr("src", big_player_avatar);

        $('.download-popup-container').addClass('open');
        $('.tabbed-menu .blur').addClass('no-blur');
        $('.download-popup-hide button').on('click', function() {
          $('.download-popup-container').addClass('close');
          $('.tabbed-menu .blur').removeClass('no-blur'); 
          setTimeout(function(){ $('.download-popup-container').removeClass('open'); $('.download-popup-container').removeClass('close'); }, 400)
        });
        $('.download-progress').css('width','0%');
        var DownloadPercentage = 0,
            DownloadInterval = setInterval(function(){
              var minNumber = 1,
                  maxNumber = 9,
                  randomNumber = randomNumberFromRange(minNumber, maxNumber);
              function randomNumberFromRange(min,max){return Math.floor(Math.random()*(max-min+1)+min);}
              DownloadPercentage = DownloadPercentage + randomNumber;
              $('.download-progress').animate( {'width':  DownloadPercentage +'%' }, 300, 'swing');
              $(".download-popup .download-title-author h2").text(big_player_title + " (" + DownloadPercentage + "%)" );
              if( DownloadPercentage >= 100 ) {
                $(".download-popup .download-title-author h2").text(big_player_title + " (100%)" );
                $('.download-progress').animate( {'width':'100%' }, 300, 'swing');
                clearInterval(DownloadInterval);
                setTimeout(function(){ $('.download-popup-container').addClass('close'); $('.ok.icon').addClass('open'); $('.tabbed-menu .blur').removeClass('no-blur'); }, 800);
                setTimeout(function(){ $('.download-popup-container').removeClass('open'); $('.download-popup-container').removeClass('close'); }, 1200);
                setTimeout(function(){ $('.ok.icon').addClass('close');}, 1600);
                setTimeout(function(){ $('.ok.icon').removeClass('open'); $('.ok.icon').removeClass('close');}, 1800);
              }
            }, 900);
      }, 1000);

    });

    $('.player-command .heart').on('click', function() {$(this).toggleClass('active');});

  } // end bbflyBigPlayerToggleButton()

  function bbflycheckNews(){
    $('.news-preview').on('click', function(e) {
      var checkClick = $(e.target).attr('checkClick');
      if( checkClick == 'checkClick' ){

        var checkNews_title = $(this).find("h2").text(),
            checkNews_date = $(this).find(".news-date").text(),
            checkNews_content = $(this).find(".news-content").text(),
            checkNews_author = $(this).find(".news-author").text(),
            checkNews_like = $(this).find(".like").text(),
            checkNews_shares = $(this).find(".shares").text(),
            checkNews_avatar = $(this).find("h2").attr('avatar'),
            checkNews_img =  $(this).find(".author-info img").attr("src"),
            checkNews_src = "";

        setTimeout(function(){
          $('.single-news-info img').attr("src", checkNews_img);
          $('.page.single-news .album-cover-blur img').attr("src", checkNews_img);
          $('.single-news-title').text(checkNews_title);
          $('.single-news-date').text(checkNews_date);
          $('.single-news-content .mini-news').text(checkNews_content);
          $('.video-like .like').text(checkNews_like);
          $('.video-add-to p').text(checkNews_shares);
          $('.author-listener cite').text(checkNews_author);     
          $('.author-listener img').attr("src", checkNews_src + checkNews_avatar);

          $('.music-player-share .title-author h2').text(checkNews_title);
          $('.music-player-share .title-author cite').text(checkNews_date);
          $('.music-player-share .album-cover img').attr("src", checkNews_src + checkNews_avatar);
        }, 200);
      }
    });
  }

  function bbflyVolumePlayer() {
    // HANDLER
    $(".volume").slider({
      min: 0,
      max: 100,
      value: 50,
      range: "min",
      animate: false,
      slide: function(event, ui) {setVolume((ui.value) / 100);}
    });
    $('.audio-icon').on('click', function(e) { $('.volume-content').addClass('active'); });
    function setVolume(myVolume) {
      var myMedia = document.getElementsByClassName('the-song');
      myMedia.volume = myVolume;
    }
    var Volumeaudio = document.getElementsByTagName('audio')[0];
    //VOLUME BAR
    //volume bar event
    var volumeDrag = false;
    var updateVolume = function (a, vol) {
      var volume = $('.volume');
      var percentage = 0;
      //if only volume have specificed
      //then direct update volume
      if (vol) {
        percentage = vol * 100;
      } else {
        var position = a - volume.offset().left;
        percentage = 100 * position / volume.width();
      }
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      //update volume bar and video volume
      Volumeaudio.volume = percentage / 100;
      $('.volumeBar').css('width', percentage + '%');
      //change sound icon based on volume
      if (Volumeaudio.volume == 0) {
        $('.sound').removeClass('sound2').addClass('muted');
      } else if (Volumeaudio.volume > 0.5) {
        $('.sound').removeClass('muted').addClass('sound2');
      } else {
        $('.sound').removeClass('muted').removeClass('sound2');
      }
    };
    $('.volume').on('touchStart mousedown', function (e) {
      volumeDrag = true;
      Volumeaudio.muted = false;
      $('.sound').removeClass('muted');
      /*updateVolume(e.pageX);*/
    });
    $(document).on('touchEnd mouseup', function (e) {
      if (volumeDrag) {
        volumeDrag = false;
        updateVolume(e.pageX);
        $('.volume-content').removeClass('active');
      }
    });
    $(document).on('mousemove', function (e) {
      if (volumeDrag) {
        updateVolume(e.pageX);
      }
    });
  } // end bbflyVolumePlayer()

  bbflyLikeContainer();

  $$(document).on('page:init', function(e) {
    var page = e.detail.page;
    setTimeout(function(){
      bbflyOpacity();
      bbflyStatusBarBgBlur();
      bbflyEssentialSearch();
      bbflySeeAllPage();
      bbflyAppSwiper();
      bbflyCheckInfo();
      bbflycheckPrice();
      bbflyLikeContainer();

      if (page.name == 'messages') { $('.tabbed-menu, .player-audio-min').addClass('disactive'); if ($('.player-audio-min').hasClass('mini-active') ) {$('.tabbed-menu .blur').removeClass('active'); }} else { $('.tabbed-menu, .player-audio-min').removeClass('disactive'); if ($('.player-audio-min').hasClass('mini-active') ) {$('.tabbed-menu .blur').addClass('active');}}
      bbflyCheckAuthor();
      bbflyCreateMusicPlayer();
      bbflyMiniPlayerAudio();
      //musicappDataSound();

      $('.song-plus').on('click', function() {$(".options-container-overlay.music-player-add-to").addClass('open'); $('.page').addClass('options-container-overlay-open'); });

      if ( $('#browse-1').hasClass('page-on-center') ) {$('.tabbed-menu ul a').removeClass('active');$('.tabbed-menu ul a.explore').addClass('active');}
      if ( $('#videos-1').hasClass('page-on-center') ) {$('.tabbed-menu ul a').removeClass('active');$('.tabbed-menu ul a.videos').addClass('active');}
      if ( $('#profile-1').hasClass('page-on-center') ) {$('.tabbed-menu ul a').removeClass('active');$('.tabbed-menu ul a.library').addClass('active');}
      if ( $('#news-1').hasClass('page-on-center') ) {$('.tabbed-menu ul a').removeClass('active');$('.tabbed-menu ul a.news').addClass('active');}
      if ( $('#community-1').hasClass('page-on-center') ) {$('.tabbed-menu ul a').removeClass('active');$('.tabbed-menu ul a.social').addClass('active');}

      $('.headers[header-icon-style="user"] .icon').css('background','url("'+userProfileAvatar+'") no-repeat 0 center / cover');

    }, 200);

  });

  $$(document).on('page:back', function(e) {
    bbflyLikeContainer();
    bbflyShuffleRepeat();
    var StatusBarHeight = $('#status-bar').height();
    if ($('.scrollable-content, .options-container-overlay').scrollTop() > StatusBarHeight + 1) { $('#status-bar').addClass('ios-topnavbar-bg'); }
    if( $('.tabbed-menu, .player-audio-min, .player-video-min').hasClass('hide') ) { $('.tabbed-menu, .player-audio-min, .player-video-min').removeClass('hide'); $('.home-indicator-container').removeClass('only');}
  });

  $$(document).on('page:afterback', function(e) {
    setTimeout(function(){
      if ( $('#browse-1').hasClass('page-on-center') ) {$('.tabbed-menu ul a').removeClass('active');$('.tabbed-menu ul a.explore').addClass('active');}
      if ( $('#videos-1').hasClass('page-on-center') ) {$('.tabbed-menu ul a').removeClass('active');$('.tabbed-menu ul a.videos').addClass('active');}
      if ( $('#profile-1').hasClass('page-on-center') ) {$('.tabbed-menu ul a').removeClass('active');$('.tabbed-menu ul a.library').addClass('active');}
      if ( $('#news-1').hasClass('page-on-center') ) {$('.tabbed-menu ul a').removeClass('active');$('.tabbed-menu ul a.news').addClass('active');}
      if ( $('#community-1').hasClass('page-on-center') ) {$('.tabbed-menu ul a').removeClass('active');$('.tabbed-menu ul a.social').addClass('active');}
    }, 200);
  });

  // In page events:
  $$(document).on('page:init', function(e) {
    // Page Data contains all required information about loaded and initialized page 
    var page = e.detail.page;

    setTimeout(function(){ if ( $('.player-audio-min.mini').length ) { $('.page').removeClass('nope'); } }, 100);

    if (page.name === 'search') {
      $('.tabbed-menu, .player-audio-min, .player-video-min').addClass('hide');
      $('.home-indicator-container').addClass('only');
    }

    if (page.name === 'playlist') {
      setTimeout(function(){ $('#status-bar').removeClass('ios-topnavbar-bg'); }, 300);
      $('.playlist .headers button.back-icon').addClass('animated').attr('data-fx','fadeInLeft');
      $('.playlist .headers button.search-icon').addClass('animated').attr('data-fx','fadeInRight');
      $('.playlist .big-player-queue-container .container-album-cover').addClass('animated').attr('data-fx','fadeInDown');      
      $('.playlist .big-player-queue-container .menu-options, .playlist .big-player-queue-container .title-author').addClass('animated').attr('data-fx','fadeInUp');
    }

    if (page.name === 'charts') {
      setTimeout(function(){ $('#status-bar').removeClass('ios-topnavbar-bg'); }, 300);
      $('.charts .headers button.back-icon').addClass('animated').attr('data-fx','fadeInLeft');
      $('.charts .headers button.search-icon').addClass('animated').attr('data-fx','fadeInRight');
      $('.charts .big-player-queue-container .container-album-cover').addClass('animated').attr('data-fx','fadeInDown');      
      $('.charts .big-player-queue-container .menu-options, .charts .big-player-queue-container .title-author').addClass('animated').attr('data-fx','fadeInUp');
    }

    if (page.name === 'profile') {
      setTimeout(function(){
        if(!$('.page.profile').hasClass('other-user-profile')) {
          var playlist_src = "";
          $('.profile .headers .title-author h2').text(userProfileName +" "+ userProfileSurname);
          $('.profile .user-country cite').text(userProfileName +" "+ userProfileSurname);
          $('.profile .user-country .country').text(userProfileCountry);
          $('.profile-avatar-user img').attr("src", playlist_src + userProfileAvatar);
          $('.profile .headers .album-cover img').attr("src", playlist_src + userProfileAvatar );
          $('.profile .album-cover-blur img').attr("src", playlist_src + userProfileAvatar);
        }
      }, 300);
    }

    if ((page.name === 'news') || (page.name === 'artist-profile')) {
      bbflycheckNews();
    }

    if (page.name === 'single-news') {
      bbflySimulationNewComment();
      $('.single-news-share-button').on('click', function() {$(".options-container-overlay.music-player-share").addClass('open'); $('.page').addClass('options-container-overlay-open'); });

      $('.video-player-comment-list .published').on('click', function() {
        setTimeout(function(){
          $('.page.profile').addClass('other-user-profile');
        }, 200);
      });

    }

    if (page.name === 'albums') {
      setTimeout(function(){ $('#status-bar').removeClass('ios-topnavbar-bg'); }, 300);
    }



    if (page.name === 'messages') {
      $('.page').removeClass('options-container-overlay-open');

      var height = $('.chat-messages .top-navbar-slider').height();
      $('.chat-messages .messages-content').scroll(function(){
        if ( $(this).scrollTop() > height - 80) {
          $('.chat-messages .top-navbar-slider').addClass('scroll');
        } else {
          $('.chat-messages .top-navbar-slider').removeClass('scroll');
        }
      });

      var app = new Framework7(); 
      var bbflymySearchbar1 = app.searchbar('.emoji-list-searchbar', {
        searchList: '.list-block-emoji',
        searchIn: '.emojiType'
      });
      var bbflymySearchbar2 = app.searchbar('.gif-list-searchbar', {
        searchList: '.list-block-gif',
        searchIn: '.gifType'
      });
    }

    if (page.name === 'community') {

      $('.community .start-new-chat button').on('click', function() {
        $(".contact-list-overlay").addClass('open');
        $('.page').addClass('options-container-overlay-open');

        $('.tabbed-menu, .player-audio-min').addClass('disactive'); 
        if ($('.player-audio-min').hasClass('mini-active') ) {
          $('.tabbed-menu .blur').removeClass('active');
        }
      });

      /* Close Contact List */
      $('.contact-list-overlay .share-back').on('click', function() {
        $(".contact-list-overlay").addClass('close');
        setTimeout(function(){ $('.contact-list-overlay').removeClass('open'); $('.contact-list-overlay').removeClass('close'); $('.page').removeClass('options-container-overlay-open'); }, 400);
        $('.tabbed-menu, .player-audio-min').removeClass('disactive'); 
        if ($('.player-audio-min').hasClass('mini-active') ) {
          $('.tabbed-menu .blur').addClass('active');
        }
      });

      /* Close Contact List if chat open*/
      $('.your-contact').on('click', function() {
        if( $(".contact-list-overlay").hasClass('open') ) {
          $(".contact-list-overlay").addClass('close');
          setTimeout(function(){ $('.contact-list-overlay').removeClass('open'); $('.contact-list-overlay').removeClass('close'); $('.page').removeClass('options-container-overlay-open'); }, 400);
        }
      });

    } // end page.name === 'community'

  });

  // Inizialize Functions
  bbflyOpacity();
  bbflyStatusBar();
  bbflyStatusBarBgBlur();
  bbflyEssentialSearch();
  bbflySeeAllPage();
  bbflyMiniMenu();
  bbflyAppSwiper();
  bbflyCreateControllerPlayer();
  bbflyBigPlayerToggleButton();
  bbflyMiniPlayerAudio();
  bbflyVolumePlayer();
  //musicappDataSound();

})(jQuery); //end document