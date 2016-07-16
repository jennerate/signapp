helpers do
  def current_user
    @current_user ||= User.find_by(id: session[:user])
  end

  def logged_in?
    !current_user.nil?
  end

  def upload_file(upload_file, file_type = 'profile_pic')
    @filename = params[:file][:filename]
    file = params[:file][:tempfile]
    file_path = './public/assets/storage/' if file_type == 'storage'
    file_path = './public/assets/profile_pics/' if file_type == 'profile_pic'
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
    errors.each do |error|
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

get '/accounts/github/new' do
  @username = "SignAppTestDummy54321"
  @email = "signappdummy54321@gmail.com"
  @github_password = random_pass_generator
  @errors = Array.new

  @driver = Selenium::WebDriver.for :chrome
  @github_status = github_signup(@github_password)
  @driver.quit
  content_type :json
  {github_status: @github_status, github_password: @github_password, errors: @errors}.to_json
end

get '/accounts/codeschool/new' do
  @username = "SignAppTestDummy54321"
  @email = "signappdummy54321@gmail.com"
  @codeschool_password = random_pass_generator
  @errors = Array.new

  @driver = Selenium::WebDriver.for :chrome
  @codeschool_status = codeschool_signup(@codeschool_password)
  @driver.quit
  content_type :json
  {codeschool_status: @codeschool_status, codeschool_password: @codeschool_password, errors: @errors}.to_json
end

get '/accounts/codecademy/new' do
  @username = "SignAppTestDummy54321"
  @email = "signappdummy54321@gmail.com"
  @codecademy_password = random_pass_generator
  @errors = Array.new

  @driver = Selenium::WebDriver.for :chrome
  @codecademy_status = codecademy_signup(@codecademy_password)
  @driver.quit
  content_type :json
  {codecademy_status: @codecademy_status, codecademy_password: @codecademy_password, errors: @errors}.to_json
end

post '/session' do
  @user = User.find_by(username: params[:username])
  if @user && @user.password == params[:password]
    session[:user] = @user.id
  end
  redirect '/'
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
    email: params[:email]
  )
  @user.password = params[:password]
  @user.save!
  redirect '/'  
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

post '/session/profile' do
  #TODO
end 

post '/save_information' do
  filesname = params[:file].nil? ? nil : upload_file(params[:file], 'storage')
  current_user.storages << Storage.new(name: params[:name], link_url: filesname) 
  redirect '/storage/all'
end

get '/storage' do
  erb :'storage/storage'
end

get '/storage/all' do
  @users_storage = current_user.storages.all
  erb :'storage/all'
end

