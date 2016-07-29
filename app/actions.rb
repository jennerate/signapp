helpers do
  PATH_TO_PROFILE_PICS = './public/assets/profile_pics/'
  PATH_TO_STORAGE = './public/assets/storage/'

  def current_user
    @current_user ||= User.find_by(id: session[:user])
  end

  def logged_in?
    !current_user.nil?
  end

    def upload_file(upload_file, file_type = 'profile_pic')
      return nil unless params[:file] && !params[:file].empty? 
      @filename = Time.now.to_i.to_s + "_" + params[:file][:filename].gsub(/\s+/, '-')
      file = params[:file][:tempfile]

      file_path = file_type == 'profile_pic' ? PATH_TO_PROFILE_PICS : PATH_TO_STORAGE

      File.open("#{file_path + @filename}", 'wb') do |f|
        f.write(file.read)
      end
      @filename 
  end

  def random_pass_generator
    random_string = SecureRandom.base64
  end

  def github_signup(password)
    @driver.navigate.to "https://github.com/join"
    username_input = @driver.find_element(:id, 'user_login')
    username_input.send_keys(@username)
    email_input = @driver.find_element(:id, 'user_email')
    email_input.send_keys(@email)

    password_input = @driver.find_element(:id, 'user_password')
    password_input.send_keys(password)
    sleep 2
    
    errors = @driver.find_elements(:css, 'dd.error')
    errors.reverse.each do |error|
      @errors << error.text
    end

    password_input.submit
    true
  end

  def codeschool_signup(password)
    @driver.navigate.to "https://www.codeschool.com/users/sign_up"
    email_input = @driver.find_element(:id, 'registration_email')
    email_input.send_keys(@email)

    username = @driver.find_element(:id, 'registration_username')
    username.send_keys(@username)

    password_input = @driver.find_element(:id, 'registration_password')
    password_input.send_keys(password)

    conditions_button = @driver.find_element(:id, 'registration_terms')
    conditions_button.click

    password_input.submit
    sleep 2

    errors = @driver.find_elements(:css, '.form-field .field_with_errors:first-child')
    # errors = @driver.find_elements(:css, '.field_with_errors')
    errors.each do |error|
      @errors << "#{error.text} has already been taken."
    end
    true
  end

  def codecademy_signup(password)
    @driver.navigate.to "https://www.codecademy.com/register?redirect=https%3A%2F%2Fwww.codecademy.com%2F"
    email_input = @driver.find_element(:id, 'user_email')
    email_input.send_keys(@email)

    username_input = @driver.find_element(:id, 'user_username')
    username_input.click
    sleep 1

    error = @driver.find_elements(:css, "div.field-error")
    if error.empty?
    else
      @errors << error.first.text
    end
    username_input.send_keys(@username)

    password_input = @driver.find_element(:id, 'user_password')
    password_input.click
    sleep 1

    error = @driver.find_elements(:css, "div.field-error")
    if error.empty?
    else
      @errors << error.first.text
    end

    password_input.send_keys(password)
    password_input.submit
    true
  end
end

# Homepage (Root path)
get '/' do
  erb :index
end

get '/accounts' do
  erb :'accounts/index'
end

# Sign up to github, codeschool, codecademy
post '/accounts/signup' do
  @username = "SignAppTestDummy"
  @email = "signappdummy@gmail.com"

  @github_password = random_pass_generator
  @codecademy_password = random_pass_generator
  @codeschool_password = random_pass_generator
  @errors = Hash.new { |h, k| h[k] = [] }

  @driver = Selenium::WebDriver.for :chrome
  # @github_status = github_signup(@github_password) if params[:github] == 'true'
  # @codeschool_status = codeschool_signup(@codeschool_password) if params[:codeschool] == 'true'
  # @codecademy_status = codecademy_signup(@codecademy_password) if params[:codecademy] == 'true'
  @github_status = params[:github] == 'true' ? github_signup(@github_password) : false
  @codeschool_status = params[:codeschool] == 'true' ? codeschool_signup(@codeschool_password) : false
  @codecademy_status = params[:codecademy] == 'true' ? codecademy_signup(@codecademy_password) : false

  erb :'accounts/response'
end

post '/accounts/github/new' do
  @username = params[:username] ? params[:username] : current_user.username
  @email = params[:email] ? params[:email] : current_user.email
  @github_password = random_pass_generator
  @errors = Array.new

  @driver = Selenium::WebDriver.for :chrome
  @github_status = github_signup(@github_password)
  @driver.quit
  if @errors.empty? 
    current_user.accounts << Account.create(account_type: "github", email: @email)
  end
  content_type :json
  {github_status: @github_status, github_email: @email, github_username: @username, github_password: @github_password, errors: @errors}.to_json
end

post '/accounts/codeschool/new' do
  @username = params[:username] ? params[:username] : current_user.username
  @email = params[:email] ? params[:email] : current_user.email
  @codeschool_password = random_pass_generator
  @errors = Array.new

  @driver = Selenium::WebDriver.for :chrome
  @codeschool_status = codeschool_signup(@codeschool_password)
  @driver.quit
  if @errors.empty? 
    current_user.accounts << Account.create(account_type: "codeschool", email: @email)
  end
  content_type :json
  {codeschool_status: @codeschool_status, codeschool_email: @email, codeschool_username: @username, codeschool_password: @codeschool_password, errors: @errors}.to_json
end

post '/accounts/codecademy/new' do
  @username = params[:username] ? params[:username] : current_user.username
  @email = params[:email] ? params[:email] : current_user.email
  @codecademy_password = random_pass_generator
  @errors = Array.new

  @driver = Selenium::WebDriver.for :chrome
  @codecademy_status = codecademy_signup(@codecademy_password)
  @driver.quit
  if @errors.empty? 
    current_user.accounts << Account.create(account_type: "codecademy", email: @email)
  end
  content_type :json
  {codecademy_status: @codecademy_status, codecademy_email: @email, codecademy_username: @username, codecademy_password: @codecademy_password, errors: @errors}.to_json
end

post '/session' do
  @user = User.find_by(username: params[:username])
  if @user && @user.password == params[:password]
    session[:flash] = "Welcome back #{@user.name}!"
    session[:user] = @user.id
    redirect '/'
  elsif
    @user = User.find_by(username: params[:username])
    if @user && @user.password != params[:password]
      session[:flash] = "Incorrect username or password! Try again."
      redirect '/session/new'
    end
  else
    session[:flash] = "Hmm, that doesn't look right. Try again!"
     redirect '/session/new'
  end
end

get '/session/delete' do
  session.delete(:user)
  redirect '/'
end

get '/session/new' do
  @user = User.new
  erb :'session/new'
end

post '/user' do
  @user = User.new(
    name: params[:name],
    username: params[:username],
    email: params[:email],
    description: params[:description]
  ) 
  @user.password = params[:password]
  filename = upload_file(params[:file], 'profile_pic')
  @user.photo = filename
  @user.save
  if @user.errors.empty? && logged_in? == false
    session[:flash] = "Welcome to SignApp, #{@user.username}!"
    session[:user] = @user.id
    redirect '/accounts'
  elsif 
    logged_in? == true
      session[:flash] = "You cannot sign up if you are currently logged in."
      redirect '/user/new'
  else 
    redirect '/user/new'
  end
end


get '/user/new' do
  @user = User.new
  erb :'user/new'
end

post '/save_image' do
  filename = upload_file(params[:file], 'profile_pic')
  current_user.photo = filename
  current_user.save!
  redirect '/'
end

get '/downloads/new' do
  erb :'downloads/new'
end

get '/user/profile' do
  erb :'user/profile'
end 

post '/user/profile/edit' do
  unless params[:description].nil? || params[:description].empty?
    current_user.description = params[:description]
    current_user.save
  end

  unless params[:file].nil? 
    filename = upload_file(params[:file], 'profile_pic')
    current_user.photo = filename
    current_user.save 
  end
  redirect '/user/profile'
end


post '/save_information' do
  filename = params[:file].nil? ? nil : upload_file(params[:file], 'storage')
  if filename 
    current_user.storages << Storage.new(name: params[:name], link_url: filename) 
  else
    current_user.storages << Storage.new(name: params[:name], link_url: params[:link], bookmark: true)
  end
  redirect '/storage/all'
end

get '/storage/all' do
  @users_storage = current_user.storages.all
  erb :'storage/all'
end

get '/storage/delete/:id' do
  current_user.storages.find(params[:id]).destroy
  redirect '/storage/all'
end

post '/storage/rename' do
  storage_file = current_user.storages.find(params[:file_id])
  storage_file.name = params[:name]
  storage_file.save
end