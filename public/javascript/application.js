$.fn.pageMe = function(opts){
    var $this = this,
        defaults = {
            perPage: 7,
            showPrevNext: false,
            hidePageNumbers: false
        },
        settings = $.extend(defaults, opts);
    
    var listElement = $this;
    var perPage = settings.perPage; 
    var children = listElement.children();
    var pager = $('.pager');
    
    if (typeof settings.childSelector!="undefined") {
        children = listElement.find(settings.childSelector);
    }
    
    if (typeof settings.pagerSelector!="undefined") {
        pager = $(settings.pagerSelector);
    }
    
    var numItems = children.size();
    var numPages = Math.ceil(numItems/perPage);

    pager.data("curr",0);
    
    if (settings.showPrevNext){
        $('<li><a href="#" class="prev_link">«</a></li>').appendTo(pager);
    }
    
    var curr = 0;
    while(numPages > curr && (settings.hidePageNumbers==false)){
        $('<li><a href="#" class="page_link">'+(curr+1)+'</a></li>').appendTo(pager);
        curr++;
    }
    
    if (settings.showPrevNext){
        $('<li><a href="#" class="next_link">»</a></li>').appendTo(pager);
    }
    
    pager.find('.page_link:first').addClass('active');
    pager.find('.prev_link').hide();
    if (numPages<=1) {
        pager.find('.next_link').hide();
    }
      pager.children().eq(1).addClass("active");
    
    children.hide();
    children.slice(0, perPage).show();
    
    pager.find('li .page_link').click(function(){
        var clickedPage = $(this).html().valueOf()-1;
        goTo(clickedPage,perPage);
        return false;
    });
    pager.find('li .prev_link').click(function(){
        previous();
        return false;
    });
    pager.find('li .next_link').click(function(){
        next();
        return false;
    });
    
    function previous(){
        var goToPage = parseInt(pager.data("curr")) - 1;
        goTo(goToPage);
    }
     
    function next(){
        goToPage = parseInt(pager.data("curr")) + 1;
        goTo(goToPage);
    }
    
    function goTo(page){
        var startAt = page * perPage,
            endOn = startAt + perPage;
        
        children.css('display','none').slice(startAt, endOn).show();
        
        if (page>=1) {
            pager.find('.prev_link').show();
        }
        else {
            pager.find('.prev_link').hide();
        }
        
        if (page<(numPages-1)) {
            pager.find('.next_link').show();
        }
        else {
            pager.find('.next_link').hide();
        }
        
        pager.data("curr",page);
        pager.children().removeClass("active");
        pager.children().eq(page+1).addClass("active");
    
    }
};

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
            $('#github-password-used').append('<p>Password: ' + data.github_password + '</p>');
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
            $('#codeschool-password-used').append('<p>Password: ' + data.codeschool_password + '</p>');
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
            $('#codecademy-password-used').append('<p>Password: ' + data.codecademy_password + '</p>');
            $('#cdoecademy-status').append('<button id="codecademy-password-button" type="button">Show Password</button>');
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
          $('#codeschool-password-used').append('<p>Password: ' + data.codeschool_password + '</p>');
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
          $('#codeacademy-status').append('<div id="codecademy-email-used"></div>');
          $('#codecademy-email-used').append('<h3>Email</h3><p>' + data.codecademy_email + '</p>');
          $('#codecademy-status').append('<div id="codecademy-username-used"></div>');
          $('#codecademy-username-used').append('<h3>Username</h3><p>' + data.codecademy_username + '</p>');
          $('#codecademy-status').append('<div id="codecademy-password-used" class="hidden"></div>');
          $('#codecademy-password-used').append('<p>Password: ' + data.codecademy_password + '</p>');
          $('#cdoecademy-status').append('<button id="codecademy-password-button" type="button">Show Password</button>');
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
    $.ajax({
      method: "POST",
      url: 'http://localhost:3000/save_information',
      data: $('#addModal form').serialize(),
      success: function(data) {
        location.reload();
      }
    });
  });

  $(document).on('submit', '#addModal form', function() {
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: 'http://localhost:3000/save_information',
      data: $('#addModal form').serialize(),
      success: function(data) {
        location.reload();
      }
    });

});
