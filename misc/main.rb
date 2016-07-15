require 'selenium-webdriver'

driver = Selenium::WebDriver.for :chrome

driver.navigate.to "https://www.codeschool.com/users/sign_up"

email = driver.find_element(:id, 'registration_email')
email.send_key('email@email.com')

sleep 3

username = driver.find_element(:id, 'registration_username')
username.send_key('jenny')

sleep 3

password = driver.find_element(:id, 'registration_password')
password.send_key('123123123123')

conditions_button = driver.find_element(:id, 'registration_terms')
conditions_button.click

password.submit 

error = driver.find_elements(:css, '.field_with_errors')
unless error.empty?
  error.each do |e| 
  puts e.text
  end
end 

sleep 3

driver.quit