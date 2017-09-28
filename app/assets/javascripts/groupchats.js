$(document).on('turbolinks:load', function() {
  submitNewMessage();
  $('#messages').scrollTop($('#messages')[0].scrollHeight);
});

function submitNewMessage(){
  $('textarea#message_content').keydown(function(event) {
    if (event.keyCode == 13) {
        $('[data-send="message"]').click();
        $('[data-textarea="message"]').val("");
        return false;
     }
  });
  $('input.send_icon').click(function() {
    $('[data-send="message"]').click();
    $('[data-textarea="message"]').val("");
  });
}
