$(document).on('turbolinks:load', function() {
  groupchatId = $('input#message_groupchat_id').val();
  locations = {}     
  App.messages = App.cable.subscriptions.create({channel: 'MessagesChannel', groupchat_id: groupchatId}, {
    received: function(data) {
      if (data.message.includes("LatitudeLongitude:")) {
        locations[data.user] = data.message.split(";")[0];
        return;
      } else {
        $("#messages").removeClass('hidden');
        return $('#messages').append(this.renderMessage(data));
      }
    },
    groupchat_id: function(data) {
      return data.groupchat_id
    },
    renderMessage: function(data) {
      return "<p> <b>" + data.user + ": </b>" + data.message + "</p>";
    }
  });
})
