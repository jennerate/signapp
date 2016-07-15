$(document).ready(function() {

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
  $(".website-holder").click(function() {
    $(this).toggleClass("faded");
    $(this).children(".checkmark").toggleClass("hidden");
  });
});
