require 'sinatra'
require 'json'

API_KEY = ENV['GITHUB_API_SECRET']

get '/' do
  send_file 'public/index.html'
end

get '/key' do
  { access_token: API_KEY }.to_json
end
