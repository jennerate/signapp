$(document).ready(function() {

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
  $(".website-holder").click(function() {
    $(this).toggleClass("faded");
    $(this).children(".checkmark").toggleClass("hidden");
    var val = $(this).children("input").val()
    $(this).children("input").val(val === "true" ? "false" : "true")
  });

  $(".mass-signup-submit").click(function() {
    event.preventDefault();

    if ($("#github-signup-indicator").val() == 'true') {
      $('#github-status').html("<img src='/assets/images/ajax-loader.gif' />");
      $.ajax({
        method: "GET",
        url: "http://localhost:3000/accounts/github/new",
        success: function(data) {
          console.log(data)
          if (data.errors.length == 0) {
            $('#github-status').html("<h1>Success!</h1><p>Password: " + data.github_password + "</p>");
          } else {
            $('#github-status').html('<form class="website-status-form">');
            for (i=0; i < data.errors.length; i++) {
              if (data.errors[i].toLowerCase().indexOf('username') > -1) {
                $('#github-status').append('<div class="group"><label>Username <span class="text-danger">(was already taken)</span></label><input type="text" name="username" value="" placeholder="Please use a different username."><span class="highlight"></span><span class="bar"></span></div>');
              }
              if (data.errors[i].toLowerCase().indexOf('email') > -1) {
                $('#github-status').append('<div class="group"><label>Email <span class="text-danger">(was already taken)</span></label><input type="text" name="email" value="" placeholder="Please use a different email."><span class="highlight"></span><span class="bar"></span></div>');
              }
            }
            $('#github-status').append('</form>');
          }
        }
      });
    }

    if ($("#codeschool-signup-indicator").val() == 'true') {
      $('#codeschool-status').html("<img src='/assets/images/ajax-loader.gif' />");
      $.ajax({
        method: "GET",
        url: "http://localhost:3000/accounts/codeschool/new",
        success: function(data) {
          if (data.errors.length == 0) {
            $('#codeschool-status').html(
            "<h1>Success!</h1><p>Password: " + data.codeschool_password + "</p>"
            );
          } else {
            $('#codeschool-status').html('<form class="website-status-form">');
            for (i=0; i < data.errors.length; i++) {
              if (data.errors[i].toLowerCase().indexOf('username') > -1) {
                $('#codeschool-status').append('<div class="group"><label>Username <span class="text-danger">(was already taken)</span></label><input type="text" name="username" value="" placeholder="Please use a different username."><span class="highlight"></span><span class="bar"></span></div>');
              }
              if (data.errors[i].toLowerCase().indexOf('email') > -1) {
                $('#codeschool-status').append('<div class="group"><label>Email <span class="text-danger">(was already taken)</span></label><input type="text" name="email" value="" placeholder="Please use a different email."><span class="highlight"></span><span class="bar"></span></div>');
              }
            }
            $('#codeschool-status').append('</form>');
          }
        }
      });
    }

    if ($("#codecademy-signup-indicator").val() == 'true') {
      $('#codecademy-status').html("<img src='/assets/images/ajax-loader.gif' />");
      $.ajax({
        method: "GET",
        url: "http://localhost:3000/accounts/codecademy/new",
        success: function(data) {
          if (data.errors.length == 0) {
            $('#codecademy-status').html(
            "<h1>Success!</h1><p>Password: " + data.codecademy_password + "</p>"
            );
          } else {
            $('#codecademy-status').html('<form class="website-status-form">');
            for (i=0; i < data.errors.length; i++) {
              if (data.errors[i].toLowerCase().indexOf('username') > -1) {
                $('#codecademy-status').append('<div class="group"><label>Username <span class="text-danger">(was already taken)</span></label><input type="text" name="username" value="" placeholder="Please use a different username."><span class="highlight"></span><span class="bar"></span></div>');
              }
              if (data.errors[i].toLowerCase().indexOf('email') > -1) {
                $('#codecademy-status').append('<div class="group"><label>Email <span class="text-danger">(was already taken)</span></label><input type="text" name="email" value="" placeholder="Please use a different email."><span class="highlight"></span><span class="bar"></span></div>');
              }
            }
            $('#codecademy-status').append('</form>');
          }
        }
      });
    }
  });
});
