helpers do
  def current_user
    @current_user ||= User.find_by(id: session[:user])
  end

  def logged_in?
    !current_user.nil?
  end

  def upload_file(upload_file)
    @filename = params[:file][:filename]
    file = params[:file][:tempfile]

    File.open("./public/assets/profile_pics/#{@filename}", 'wb') do |f|
      f.write(file.read)
    end

    current_user.photo = @filename
    current_user.save!
  end

  def random_pass_generator
    random_string = SecureRandom.base64
  end

  def github_signup(password)
    @driver.navigate.to "https://github.com/join"
    element = @driver.find_element(:id, 'user_login')
    element.send_keys("superman")
    element = @driver.find_element(:id, 'user_email')
    element.send_keys("Email input by user")

    element = @driver.find_element(:id, 'user_password')
    element.send_keys(password)
    sleep 2
    
    @errors = @driver.find_elements(:css, 'dd.error')
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
get '/accounts/signup' do
  github_password = random_pass_generator
  codecademy_password = random_pass_generator
  codeschool_password = random_pass_generator

  @driver = Selenium::WebDriver.for :chrome
  github_signup(github_password)
  erb :'accounts/response'
end

post '/save_image' do
  upload_file(params[:file])
  redirect '/'
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