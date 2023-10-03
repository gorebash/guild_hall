// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

import * as jquery from "jquery"
import "semantic-ui"
import "channels"


function scroll_bottom () {
  if ($('#messages').length > 0) {
    $('#messages').scrollTop($('#messages')[0].scrollHeight);
  }
}

function submit_message () {
  $('#message_body').on('keydown', function(e) {
    if (e.keyCode == 13) {
      $('button').click();
      e.target.value = "";
    };
  });
};

$(document).on('turbo:load', function() {
  $('.ui.dropdown').dropdown();

  scroll_bottom();
  submit_message();
});