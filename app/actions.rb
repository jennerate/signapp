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

end

# Homepage (Root path)
get '/' do
  erb :index
end

post '/session' do
  @user = User.find_by(username: params[:username])
  if @user && @user.password == params[:password]
    session[:user] = @user.id
  end
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
  
  @user.password = params[:password]
  @user.save!
  redirect '/'  
end

get '/user/new' do
  @user = User.new
  erb :'user/new'
end

post '/save_image' do
  upload_file(params[:file])
  redirect '/'
end

get '/accounts' do
  @accounts = Account.all
  erb :'accounts/index'
end