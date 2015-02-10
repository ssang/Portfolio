$(document).ready(function() {

	//Header Image
	var winW = $(window).width();
	var winH = $(window).height() - 65;

	$("#home_header").css({
    "height": winH + "px",
    "background-image": "url('thumbnail.php?file=images/header_bg.jpg&width=" + winW + "&height=" + winH + "&quality=50')",
    "backround-repeat" : "no-repeat",
  });

  $("#projects_main").css({
    "height": winH - 40 + "px",
  });

  $("#projBG").css({
    "height": winH - 40 + "px",
  });

  $("#home_header").css("display", "block");

  $(".break_first").css({
    "background-image": "url('thumbnail.php?file=images/banner-1.jpg&width=" + winW + "&height=400')",
    "backround-repeat" : "no-repeat",
  });

  $(".break_second").css({
    "background-image": "url('thumbnail.php?file=images/banner-2.jpg&width=" + winW + "&height=400')",
    "backround-repeat" : "no-repeat",
  });

  $(".break_third").css({
    "background-image": "url('thumbnail.php?file=images/banner-3.jpg&width=" + winW + "&height=400')",
    "backround-repeat" : "no-repeat",
  });

  $(".contact_field").focus(function() {
    var input_id = $(this).attr('id');
    var label = $('label[for=' + input_id + ']').text();

    if($(this).val() == label)
      $(this).val("");
    
  });

  $(".contact_field").blur(function() {
    var input_id = $(this).attr('id');
    var label = $('label[for=' + input_id + ']').text();

    if($(this).val() == "")
      $(this).val(label);
    
  });

  $('.project').click(function(e){
    e.preventDefault();
    if($(this).css("overflow") == "visible") {
      $(this).animate().css({
        overflow: "hidden",
        background: "transparent"
      });
      $("#project_container").removeClass("one-third column omega").addClass("sixteen column");
      $("a[rel='projects']").click();
    } else if($("#project_container").hasClass("one-third column")) {
      $(".project").animate().css({
        overflow: "hidden",
        background: "transparent"
      });
      $(this).animate().css({
        overflow: "visible",
        background: "#f4783b"
      });
    } else {
      $("#project_container").removeClass("sixteen column").addClass("one-third column omega");
      $(this).animate().css({
        overflow: "visible",
        background: "#f4783b"
      });
      var target = $(this);
      setTimeout(function() {
        $('html,body').animate({
          scrollTop: target.offset().top - 65
        }, 1000);
      } ,500);
    }
    var proj = $(this);
    if(winW <= 767) {
      $('.project').animate().css("margin-bottom", "0");
      proj.animate().css("margin-bottom", function() {
        return proj.children(".proj_info").height() + 70 + "px";
      });
    }
  });

  /*Contact*/
  $("#submit_btn").click(function(e) {
      e.preventDefault();
      var proceed = true; 
      $("#contact_form input[required=true], #contact_form textarea[required=true]").each(function(){
          $(this).css('border-color',''); 
          if(!$.trim($(this).val())){ 
              $(this).css('border-color','red'); 
              proceed = false;
          }

          var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
          if($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))){
              $(this).css('border-color','red');  
              proceed = false;            
          }   
      });
     
      if(proceed)
      {
          $("#submit_btn").fadeOut(400, function(){
            $("#submit_btn").html("Sending...");
            $("#submit_btn").fadeIn(400);
          });
          post_data = {
              'firstname'     : $('input[name=first_name]').val(), 
              'lastname'     : $('input[name=last_name]').val(), 
              'user_email'    : $('input[name=email]').val(),  
              'subject'       : $('input[name=subject]').val(), 
              'msg'           : $('textarea[name=comments]').val()
          };
          $.post('contact.php', post_data, function(response) {  
              if(response.type == 'error'){     
                  $("#submit_btn").fadeOut(400, function(){
                    $("#submit_btn").html("Error");
                    $("#submit_btn").fadeIn(400, function() {
                      setTimeout(1000, function() {
                        $("#submit_btn").fadeOut(400, function(){
                          $("#submit_btn").html("Send");
                          $("#submit_btn").fadeIn(400);
                        });
                      });
                    });
                  });
                  $(".error").html(response.text);
                  $(".error").fadeIn(400);
              } else {
                  $("#submit_btn").fadeOut(400, function(){
                    $("#submit_btn").html("Sent!");
                    $("#submit_btn").fadeIn(400);
                  });
              }
          }, 'json');
      }
  });

  $(".contact_form  input[required=true], .contact_form textarea[required=true]").keyup(function() { 
      $(this).css('border-color',''); 
      $("#result").slideUp();
  });

  /*Mobile Navigation*/
  var $trigger = $('.hamburgerBtn');
  var $overlay = $('div.overlay');

    $trigger.click(function toggleOverlay(e) {
      e.preventDefault();
      if($overlay.hasClass("open")) {
        $overlay.removeClass("open");
      } else {
        $overlay.addClass("open");
      }
    });
    $('.scrollTo').click(function toggleOverlay(e) {
      e.preventDefault();
      if($overlay.hasClass("open")) {
        $overlay.removeClass("open");
      } else {
        $overlay.addClass("open");
      }
    });
});

$(window).resize(function() {
  var winH = $(window).height() - 65;

  $("#home_header").css({
    "height": winH + "px",
  });

  $(".content_section").each(function(){
    $(this).css("min-height", winH + "px");
  });

});

$.fn.isOnScreen = function(x, y){
    
    if(x == null || typeof x == 'undefined') x = 1;
    if(y == null || typeof y == 'undefined') y = 1;
    
    var win = $(window);
    
    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();
    
    var height = this.outerHeight();
    var width = this.outerWidth();
 
    if(!width || !height){
        return false;
    }
    
    var bounds = this.offset();
    bounds.right = bounds.left + width;
    bounds.bottom = bounds.top + height;
    
    var visible = (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
    
    if(!visible){
        return false;   
    }
    
    var deltas = {
        top : Math.min( 1, ( bounds.bottom - viewport.top ) / height),
        bottom : Math.min(1, ( viewport.bottom - bounds.top ) / height),
        left : Math.min(1, ( bounds.right - viewport.left ) / width),
        right : Math.min(1, ( viewport.right - bounds.left ) / width)
    };
    
    return (deltas.left * deltas.right) >= x && (deltas.top * deltas.bottom) >= y;
    
};

/*Projects Carousel*/

$.fn.projCarousel = function() {

  function repeat(str, n) {
    return new Array( n + 1 ).join( str );
  }

  return this.each(function () {
    var $wrapper = $(' > .projWrapper', this).css('overflow', 'hidden');
    var $slide = $wrapper.find('> ul');
    var $items = $slide.find('> li');
    var $single = $items.filter(':first');

    var width = $single.outerWidth() + 20;
    var visible = Math.floor($wrapper.innerWidth() / width);
    if(visible === 0) {
      visible = 1;
    }
    var currentPage = 1;
    var pages = Math.ceil($items.length / visible);

    if (($items.length % visible) != 0) {
      $slide.append(repeat('<li class="one-third column empty"></li>', visible - ($items.length % visible)));
      $items = $slide.find('> li');
    }

    $items.filter(':first').before($items.slice(-visible).clone().addClass('cloned'));
    $items.filter(':last').after($items.slice(0, visible).clone().addClass('cloned'));
    $items = $slide.find('> li');

    $wrapper.scrollLeft(width * visible);

    function gotoPage(page) {
      var dir = page < currentPage ? -1 : 1;
      var n = Math.abs(currentPage - page);
      var left = width * dir * visible * n;
      if(left === 320)
        left = 300;

      $wrapper.filter(':not(:animated)').animate({
        scrollLeft : '+=' + left
      }, 500, function () {
        if (page == 0) {
          $wrapper.scrollLeft(width * visible * pages);
          page = pages;
        } else if (page > pages) {
          $wrapper.scrollLeft(width * visible);
          page = 1;
        }

        currentPage = page;
      });

      return false;
    }

    var sites = ["chaney", "britton", "ibs", "hebron"];
    var curURL = window.location.pathname;
    curURL = curURL.split("/");
    if(curURL.length > 2) {
      if(sites.indexOf(curURL[2]) != -1) {
        gotoPage(sites.indexOf(curURL[2])+1);
      }
    }
    

    $('a.back', this).click(function (e) {
        e.preventDefault();
        return gotoPage(currentPage - 1);
    });

    $('a.forward', this).click(function (e) {
         e.preventDefault();
        return gotoPage(currentPage + 1);
    });
  });
};
