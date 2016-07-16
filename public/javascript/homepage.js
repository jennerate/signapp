$( document ).ready(function() {

  $( window ).resize(function() {

    windowSize = $( window ).width();

    if (windowSize >= 768) {
      mouseMove();
    } else {
      $(".js-side-left").css({
        "left": 0
      });

      // Image translation
      $(".js-side-left-image").css({
        "margin-left": 0
      });

      $(".js-side-right-image").css({
        "right": 0
      });
    }
    
  });//sideis here aswell

  var windowSize = $( window ).width();

  // Getting mouse move and animating div and images
  function mouseMove() {

    $( ".js-home-desktop-wrapper" ).mousemove(function( event ) {
      if (windowSize >= 768) {

        var mouseX = event.pageX,
          result = mouseX * 100/windowSize,
          move   = -(windowSize/2) - mouseX;

        $(".js-side-left").css({
          "left": move
        });

        // Image translation
        $(".js-side-left-image").css({
          "margin-left": -windowSize - move+(mouseX-(windowSize/2))/40,
        });

        $(".js-side-right-image").css({
          "right": -(mouseX-(windowSize/2))/40,
        });
      }
    });
  }

  mouseMove();
  
});