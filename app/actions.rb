# Homepage (Root path)
get '/' do
  erb :index
end

get '/accounts' do
  @accounts = Account.all
  erb :'accounts/index'
end