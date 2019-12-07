// This code was built on Squarespace, which is mainly used here to detect mobile vs. desktop.

function load_js() {
    var head= document.getElementsByTagName('head')[0];
    var script= document.createElement('script');
    script.src= 'https://unpkg.com/typer-dot-js@0.1.0/typer.js';
    head.appendChild(script);
    $('.top-button-wrapper').fadeOut(180);
}

window.Squarespace.onInitialize(Y, function() {
  load_js();
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent)) {
    // load mobile classes
    $('.top-button-wrapper').addClass('top-button-wrapper-mobile');
    $('.main-title-hey').addClass('main-title-hey-mobile');
    $('.js-index-item-image').addClass('index-item-image-mobile');
    $('.anchor-wrapper').fadeOut(0);
    $('.site-header').fadeOut(0);
    $('.anchor-block').parent().parent().fadeOut(0);
    $('.sqs-block-spacer').fadeOut(0);
    $('#picture-container').fadeOut(0);
    $('.design-anchor').fadeIn(0);
    try {
      document.getElementById('home-intro-wrapper').className += 'mobile-main-paragraph-wrapper';
      document.getElementById('home-intro').className += 'mobile-main-paragraph';
    } catch(e) {
      console.log("Not on home page");
    }
    $('.home-btn').css('font-size', '4.1vw');
    $('.sqs-svg-icon--list').css({'text-align': 'center', 'margin': '0px'});
    $('.footer-center').css({'text-align': 'center', 'margin': '0px'});
    $('#footer').css({'padding-top': '15px', 'padding-bottom': '0px'});
    $('.sqs-block-button-container--left').css('text-align', 'center');
    $('.anchor-link').find('.anchor-button').css('float', '');
    $('.btn:nth-child(n+3)').css('order', '1');
  } else {
    $('.wrap-title').css({'margin-left': 'auto', 'margin-right': 'auto'}); 
    $('.wrap-title-wrap').css('float', 'left');
    $('.scroll-wrapper').css('float', 'left');
    $('#picture-container').css('margin-left', '150px');
  }
});


// INDEX PAGE FILTER
var index = 'index-section-';
var thumbnail_labels = {
  'research': ['ibm-internship', 'qualcomm-internship', 'felicity', 'blyss'],
  'design': ['google-design', 'ibm-design-challenge', 'qualcomm-internship', 'felicity', 'blyss', 'ticktbox'],
  'design-v': ['rmk-research', 'felicity'],
  'other': ['teaching-experience', 'codingprojects']
};
$(function() {
  $('.home-btn').on("click", function() {
    // deactivate all other buttons
    $('.home-btn').each(function() {
      $(this).removeClass('active-btn');
      //$(this).addClass('home-btn');
    });
    $(this).addClass('active-btn');
    //$(this).removeClass('home-btn');
    
  });
});

function filter(s) {
  if (s == 'all') {
    $('.index-page-transition-link').removeClass('index-active').fadeOut().promise().done(function() {
      $('.index-page-transition-link').addClass('index-active').fadeIn();
    });
  } else if (s in thumbnail_labels) {
    $('.index-page-transition-link').removeClass('index-active').fadeOut().promise().done(function() {
        thumbnail_labels[s].forEach(function(e) {
        var idname = index + e;
        //show idname
        $('#' + idname).addClass('index-active').fadeIn();
      });
    });
  } 
}



var anchor_scroll = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent) == false) {
  var lastScrollTop = 0;
  $(function() {
    $(document).on("scroll", function() {  
      var st = window.pageYOffset || document.documentElement.scrollTop; 
      if (st == 0) {
        $('.site-header').stop(true).animate({ 
          boxShadow: "0px 6px 10px -4px rgba(0, 0, 0, 0)"
        }, 180); 
      }
      if (st > lastScrollTop){ // scrolling down
        if(st > 380){
          $('.site-header').fadeOut(350);
        }
      } else { // scrolling up
        if (anchor_scroll == false) {
          $('.site-header').fadeIn(350);
          $('.site-header').css('box-shadow', '0px 6px 10px -4px rgba(0, 0, 0, 0.15)');
        }
      }
      lastScrollTop = st <= 0 ? 0 : st;  
    });
  });
}
  
$(document).on('click', 'a[href^="#"]', function(event) {
  event.preventDefault();

  anchor_scroll = true;
  
  $('html, body').animate({
    scrollTop: $($.attr(this, 'href')).offset().top
  }, 500, function() {
    window.setTimeout(function() {
      anchor_scroll = false; 
    }, 20);
  });
});


// TABLE OF CONTENTS
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent) == false) {
    window.Squarespace.onInitialize(Y, function() {
    function offset(element) {
      var top = 0;
      do {
          top += element.offsetTop  || 0;
          element = element.offsetParent;
      } while(element);
      return top;
    }
    function getIndexToIns(arr, num) {
        return arr.concat(num).sort((a, b) => a - b).indexOf(num);
    } 
    var anchor_list = document.querySelectorAll(".anchor-block, .anchor-block-text");
    var toc_list = document.getElementsByClassName("anchor-link-item");
    var i;
    var anchor_scroll_list = [];
    for (i = 0; i < anchor_list.length; i++) {
      var anchor_pos = offset(anchor_list[i]);
      anchor_scroll_list.push(anchor_pos);
    }
    jQuery(toc_list[0]).find('.anchor-link').find('svg').find('.svg-circle-filled').animate({opacity: 1}, 180);
    jQuery(toc_list[0]).find('.anchor-link').find('.anchor-link-text').animate({opacity: 1}, 180);
    var oldPos = 0;
    var newPos;
    $(document).on("scroll", function() {
      var st = window.pageYOffset || document.documentElement.scrollTop;
      var ind = getIndexToIns(anchor_scroll_list, st + 80) - 1;
      newPos = (ind < 1) ? 0 : ind;
      if (newPos != oldPos) {
        var active = toc_list[newPos];
        var inactive = toc_list[oldPos];   
        jQuery(inactive).find('.anchor-link').find('svg').find('.svg-circle-filled').animate({opacity: 0}, 180);
        jQuery(inactive).find('.anchor-link').find('.anchor-link-text').animate({opacity: 0.3}, 180); 
        jQuery(active).find('.anchor-link').find('svg').find('.svg-circle-filled').animate({opacity: 1}, 180);
        jQuery(active).find('.anchor-link').find('.anchor-link-text').animate({opacity: 1}, 180);
        oldPos = newPos;
      }
    });
    $('.anchor-link-item').hover(function() {
        $(this).find('svg').find('.svg-circle-filled').animate({opacity: 1}, 180);
        $(this).find('.anchor-link-text').animate({opacity: 1}, 180);
      }, function() {
        if (this != toc_list[oldPos]) {
          $(this).find('svg').find('.svg-circle-filled').animate({opacity: 0}, 180);
          $(this).find('.anchor-link-text').animate({opacity: 0.3}, 180);
        }
    });
  });
}






window.Squarespace.onInitialize(Y, function() {
  var top_scroll = false;
  var lastScrollTop = 0;
  $(function() {
    $(document).on("scroll", function() {  
      var st = window.pageYOffset || document.documentElement.scrollTop; 
      if (st == 0) {
        $('.top-button-wrapper').fadeOut(180);
      } else {
        $('.top-button-wrapper').fadeIn(180);
      }
      if (st > lastScrollTop) { // scrolling down
        
      } else { // scrolling up
        
      }
      lastScrollTop = st <= 0 ? 0 : st;  
    });
  });
  
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent) == false) {
    $('.top-button').hover(function() {
      $('.top-hover').stop().animate({opacity: 1}, 250);
    }, function() {
      if (top_scroll == false) {
        $('.top-hover').stop().animate({opacity: 0}, 250);
      }
    });
  }
  
  $('.top-button').click(function() {
    top_scroll = true;
    $('html, body').animate({scrollTop: 0}, 500, function() {
      window.setTimeout(function() {
        $('.top-hover').stop().animate({opacity: 0}, 250);
        top_scroll = false; 
    }, 50);
    });
    top_scroll = false;
  });
});



window.Squarespace.onInitialize(Y, function() {
  $('.nav-item').hover(function() {
    $(this).addClass('underline--magical');
  }, function() {
    $(this).removeClass('underline--magical'); 
  });
  
  $('.nav-item').click(function() {
    $('.nav-item').removeClass('underline--magical');
  });
});
