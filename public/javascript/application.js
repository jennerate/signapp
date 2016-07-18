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
    $(this).attr('disabled', true);
    if ($("#github-signup-indicator").val() == 'true') {
      $('#github-status').html("<img src='/assets/images/ajax-loader.gif' /><p>Please wait while we register your account...</p>");
      $.ajax({
        method: "POST",
        url: "http://localhost:3000/accounts/github/new",
        data: $('#github-resubmit-form').serialize(),
        success: function(data) {
          console.log(data)
          if (data.errors.length == 0) {
            $('#github-status').html('<h1>Success!</h1>');
            $('#github-status').append('<div id="github-email-used"></div>');
            $('#github-email-used').append('<h3>Email</h3><p>' + data.github_email + '</p>');
            $('#github-status').append('<div id="github-username-used"></div>');
            $('#github-username-used').append('<h3>Username</h3><p>' + data.github_username + '</p>');
            $('#github-status').append('<div id="github-password-used" class="hidden"></div>');
            $('#github-password-used').append('<h3>Password</h3><p>' + data.github_password + '</p>');
            $('#github-status').append('<button id="github-password-button" type="button">Show Password</button>');
          } else {
            $('#github-status').html('');
            $('#github-status').append('<form id="github-resubmit-form" class="website-status-form">');
            for (i=0; i < data.errors.length; i++) {
              if (data.errors[i].toLowerCase().indexOf('username') > -1) {
                $('#github-resubmit-form').append('<div class="group"><label>Username <span class="text-danger">(was already taken)</span></label><input type="text" name="username" value="" placeholder="Please use a different username."><span class="highlight"></span><span class="bar"></span></div>');
              }
              if (data.errors[i].toLowerCase().indexOf('email') > -1) {
                $('#github-resubmit-form').append('<div class="group"><label>Email <span class="text-danger">(was already taken)</span></label><input type="text" name="email" value="" placeholder="Please use a different email."><span class="highlight"></span><span class="bar"></span></div>');
              }
            }
            $('#github-resubmit-form').append('<div class="col-xs-12"><button id="github-submit-button" class="btn btn-default">Submit</button></div>');
          }
        }
      });
    }

    if ($("#codeschool-signup-indicator").val() == 'true') {
      $('#codeschool-status').html("<img src='/assets/images/ajax-loader.gif' /><p>Please wait while we register your account...</p>");
      $.ajax({
        method: "POST",
        url: "http://localhost:3000/accounts/codeschool/new",
        data: $('#codeschool-resubmit-form').serialize(),
        success: function(data) {
          console.log(data)
          if (data.errors.length == 0) {
            $('#codeschool-status').html('<h1>Success!</h1>');
            $('#codeschool-status').append('<div id="codeschool-email-used"></div>');
            $('#codeschool-email-used').append('<h3>Email</h3><p>' + data.codeschool_email + '</p>');
            $('#codeschool-status').append('<div id="codeschool-username-used"></div>');
            $('#codeschool-username-used').append('<h3>Username</h3><p>' + data.codeschool_username + '</p>');
            $('#codeschool-status').append('<div id="codeschool-password-used" class="hidden"></div>');
            $('#codeschool-password-used').append('<h3>Password </h3><p>' + data.codeschool_password + '</p>');
            $('#codeschool-status').append('<button id="codeschool-password-button" type="button">Show Password</button>');
          } else {
            $('#codeschool-status').html('');
            $('#codeschool-status').append('<form id="codeschool-resubmit-form" class="website-status-form">');
            for (i=0; i < data.errors.length; i++) {
              if (data.errors[i].toLowerCase().indexOf('username') > -1) {
                $('#codeschool-resubmit-form').append('<div class="group"><label>Username <span class="text-danger">(was already taken)</span></label><input type="text" name="username" value="" placeholder="Please use a different username."><span class="highlight"></span><span class="bar"></span></div>');
              }
              if (data.errors[i].toLowerCase().indexOf('email') > -1) {
                $('#codeschool-resubmit-form').append('<div class="group"><label>Email <span class="text-danger">(was already taken)</span></label><input type="text" name="email" value="" placeholder="Please use a different email."><span class="highlight"></span><span class="bar"></span></div>');
              }
            }
            $('#codeschool-resubmit-form').append('<div class="col-xs-12"><button id="codeschool-submit-button" class="btn btn-default">Submit</button></div>');
          }
        }
      });
    }

    if ($("#codecademy-signup-indicator").val() == 'true') {
      $('#codecademy-status').html("<img src='/assets/images/ajax-loader.gif' /><p>Please wait while we register your account...</p>");
      $.ajax({
        method: "POST",
        url: "http://localhost:3000/accounts/codecademy/new",
        data: $('#codecademy-resubmit-form').serialize(),
        success: function(data) {
          console.log(data)
          if (data.errors.length == 0) {
            $('#codecademy-status').html('<h1>Success!</h1>');
            $('#codecademy-status').append('<div id="codecademy-email-used"></div>');
            $('#codecademy-email-used').append('<h3>Email</h3><p>' + data.codecademy_email + '</p>');
            $('#codecademy-status').append('<div id="codecademy-username-used"></div>');
            $('#codecademy-username-used').append('<h3>Username</h3><p>' + data.codecademy_username + '</p>');
            $('#codecademy-status').append('<div id="codecademy-password-used" class="hidden"></div>');
            $('#codecademy-password-used').append('<h3>Password</h3><p>' + data.codecademy_password + '</p>');
            $('#codecademy-status').append('<button id="codecademy-password-button" type="button">Show Password</button>');
          } else {
            $('#codecademy-status').html('');
            $('#codecademy-status').append('<form id="codecademy-resubmit-form" class="website-status-form">');
            for (i=0; i < data.errors.length; i++) {
              if (data.errors[i].toLowerCase().indexOf('username') > -1) {
                $('#codecademy-resubmit-form').append('<div class="group"><label>Username <span class="text-danger">(was already taken)</span></label><input type="text" name="username" value="" placeholder="Please use a different username."><span class="highlight"></span><span class="bar"></span></div>');
              }
              if (data.errors[i].toLowerCase().indexOf('email') > -1) {
                $('#codecademy-resubmit-form').append('<div class="group"><label>Email <span class="text-danger">(was already taken)</span></label><input type="text" name="email" value="" placeholder="Please use a different email."><span class="highlight"></span><span class="bar"></span></div>');
              }
            }
            $('#codecademy-resubmit-form').append('<div class="col-xs-12"><button id="codecademy-submit-button" class="btn btn-default">Submit</button></div></form>');
          }
        }
      });
    }
  });

  $(document).on("click", '#github-submit-button', function() {
    event.preventDefault();
    console.log($('#github-resubmit-form').serialize());
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/accounts/github/new",
      data: $('#github-resubmit-form').serialize(),
      success: function(data) {
        console.log(data)
        if (data.errors.length == 0) {
          $('#github-status').html('<h1>Success!</h1>');
          $('#github-status').append('<div id="github-email-used"></div>');
          $('#github-email-used').append('<h3>Email</h3><p>' + data.github_email + '</p>');
          $('#github-status').append('<div id="github-username-used"></div>');
          $('#github-username-used').append('<h3>Username</h3><p>' + data.github_username + '</p>');
          $('#github-status').append('<div id="github-password-used" class="hidden"></div>');
          $('#github-password-used').append('<h3>Password</h3><p>' + data.github_password + '</p>');
          $('#github-status').append('<button id="github-password-button" type="button">Show Password</button>');
        } else {
          $('#github-status').html('');
          $('#github-status').append('<form id="github-resubmit-form" class="website-status-form">');
          for (i=0; i < data.errors.length; i++) {
            if (data.errors[i].toLowerCase().indexOf('username') > -1) {
              $('#github-resubmit-form').append('<div class="group"><label>Username <span class="text-danger">(was already taken)</span></label><input type="text" name="username" value="" placeholder="Please use a different username."><span class="highlight"></span><span class="bar"></span></div>');
            }
            if (data.errors[i].toLowerCase().indexOf('email') > -1) {
              $('#github-resubmit-form').append('<div class="group"><label>Email <span class="text-danger">(was already taken)</span></label><input type="text" name="email" value="" placeholder="Please use a different email."><span class="highlight"></span><span class="bar"></span></div>');
            }
          }
          $('#github-resubmit-form').append('<div class="col-xs-12"><button id="github-submit-button" class="btn btn-default">Submit</button></div>');
        }
      }
    });
    $('#github-status').html("<img src='/assets/images/ajax-loader.gif' />");
  });

  $(document).on("click", '#codeschool-submit-button', function() {
    event.preventDefault();
    console.log($('#codeschool-resubmit-form').serialize());
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/accounts/codeschool/new",
      data: $('#codeschool-resubmit-form').serialize(),
      success: function(data) {
        console.log(data)
        if (data.errors.length == 0) {
          $('#codeschool-status').html('<h1>Success!</h1>');
          $('#codeschool-status').append('<div id="codeschool-email-used"></div>');
          $('#codeschool-email-used').append('<h3>Email</h3><p>' + data.codeschool_email + '</p>');
          $('#codeschool-status').append('<div id="codeschool-username-used"></div>');
          $('#codeschool-username-used').append('<h3>Username</h3><p>' + data.codeschool_username + '</p>');
          $('#codeschool-status').append('<div id="codeschool-password-used" class="hidden"></div>');
          $('#codeschool-password-used').append('<h3>Password</h3><p>' + data.codeschool_password + '</p>');
          $('#codeschool-status').append('<button id="codeschool-password-button" type="button">Show Password</button>');
        } else {
          $('#codeschool-status').html('');
          $('#codeschool-status').append('<form id="codeschool-resubmit-form" class="website-status-form">');
          for (i=0; i < data.errors.length; i++) {
            if (data.errors[i].toLowerCase().indexOf('username') > -1) {
              $('#codeschool-resubmit-form').append('<div class="group"><label>Username <span class="text-danger">(was already taken)</span></label><input type="text" name="username" value="" placeholder="Please use a different username."><span class="highlight"></span><span class="bar"></span></div>');
            }
            if (data.errors[i].toLowerCase().indexOf('email') > -1) {
              $('#codeschool-resubmit-form').append('<div class="group"><label>Email <span class="text-danger">(was already taken)</span></label><input type="text" name="email" value="" placeholder="Please use a different email."><span class="highlight"></span><span class="bar"></span></div>');
            }
          }
          $('#codeschool-resubmit-form').append('<div class="col-xs-12"><button id="codeschool-submit-button" class="btn btn-default">Submit</button></div>');
        }
      }
    });
    $('#codeschool-status').html("<img src='/assets/images/ajax-loader.gif' />");
  });

  $(document).on("click", '#codecademy-submit-button', function() {
    event.preventDefault();
    console.log($('#codecademy-resubmit-form').serialize());
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/accounts/codecademy/new",
      data: $('#codecademy-resubmit-form').serialize(),
      success: function(data) {
        console.log(data)
        if (data.errors.length == 0) {
          $('#codecademy-status').html('<h1>Success!</h1>');
          $('#codecademy-status').append('<div id="codecademy-email-used"></div>');
          $('#codecademy-email-used').append('<h3>Email</h3><p>' + data.codecademy_email + '</p>');
          $('#codecademy-status').append('<div id="codecademy-username-used"></div>');
          $('#codecademy-username-used').append('<h3>Username</h3><p>' + data.codecademy_username + '</p>');
          $('#codecademy-status').append('<div id="codecademy-password-used" class="hidden"></div>');
          $('#codecademy-password-used').append('<h3>Password</h3><p> ' + data.codecademy_password + '</p>');
          $('#codecademy-status').append('<button id="codecademy-password-button" type="button">Show Password</button>');
        } else {
          $('#codecademy-status').html('');
          $('#codecademy-status').append('<form id="codecademy-resubmit-form" class="website-status-form">');
          for (i=0; i < data.errors.length; i++) {
            if (data.errors[i].toLowerCase().indexOf('username') > -1) {
              $('#codecademy-resubmit-form').append('<div class="group"><label>Username <span class="text-danger">(was already taken)</span></label><input type="text" name="username" value="" placeholder="Please use a different username."><span class="highlight"></span><span class="bar"></span></div>');
            }
            if (data.errors[i].toLowerCase().indexOf('email') > -1) {
              $('#codecademy-resubmit-form').append('<div class="group"><label>Email <span class="text-danger">(was already taken)</span></label><input type="text" name="email" value="" placeholder="Please use a different email."><span class="highlight"></span><span class="bar"></span></div>');
            }
          }
          $('#codecademy-resubmit-form').append('<div class="col-xs-12"><button id="codecademy-submit-button" class="btn btn-default">Submit</button></div>');
        }
      }
    });
    $('#codecademy-status').html("<img src='/assets/images/ajax-loader.gif' />");
  });

  $(document).on("click", '#github-password-button', function() {
    $('#github-password-used').toggleClass('hidden');
    $(this).text("Hide Password");
  });

  $(document).on("click", '#codeschool-password-button', function() {
    $('#codeschool-password-used').toggleClass('hidden');
    $(this).text("Hide Password");
  });

  $(document).on("click", '#codecademy-password-button', function() {
    $('#codecademy-password-used').toggleClass('hidden');
    $(this).text("Hide Password");
  });

  $('.file-rows').on("click", "td:not(.file-actions)", function() {
    window.open($(this).parent().data('href'), "_blank");
  });

  $(document).on('click', '.storage-rename-link', function() {
    event.preventDefault();
    var file_id = $(this).data('id');
    var name = $(this).data('name');
    $('#renameModal #file_id').val(file_id);
    $('#renameModal #file_name').val(name);
  });

  $(document).on('click', '#renameModal-submit', function() {
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: 'http://localhost:3000/storage/rename',
      data: $('#renameModal form').serialize(),
      success: function(data) {
        location.reload();
      }
    });
  });

  $(document).on('submit', '#renameModal form', function() {
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: 'http://localhost:3000/storage/rename',
      data: $('#renameModal form').serialize(),
      success: function(data) {
        location.reload();
      }
    });
  });
    
  $(document).on('click', '#addModal-submit', function() {
    event.preventDefault();
    $('#addModal form').submit();
  });

  $(document).on('click', '#descriptionModal-submit', function() {
    event.preventDefault();
    $('#descriptionModal form').submit();
  });

  $(document).on('click', '#photoModal-submit', function() {
    event.preventDefault();
    $('#photoModal form').submit();
  });


});
