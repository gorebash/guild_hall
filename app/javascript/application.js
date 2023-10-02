// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

import * as jquery from "jquery"
import "semantic-ui"


$(document).on('turbo:load', function() {
  console.log('loaded turbo links')
  $('.ui.dropdown').dropdown()
});import "channels"

$("#new_message").on("submit", function () {
  $("#new_message").submit();
});