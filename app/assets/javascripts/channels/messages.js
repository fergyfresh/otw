$(document).on('turbolinks:load', function() {
  groupchatId = $('input#message_groupchat_id').val();
  locations = {}
  var map = L.map('map').setView([41.4000000, -72.1000000], 13);
  // load a tile layer
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 17,
      minZoom: 9
    }).addTo(map);
  
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
