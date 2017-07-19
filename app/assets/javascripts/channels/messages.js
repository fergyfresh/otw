$(document).on('turbolinks:load', function() {
  groupchatId = $('input#message_groupchat_id').val();
  locations = {};
  var map = L.map('map').setView([0, 0], 13);
  var bounds = new L.LatLngBounds();
  // load a tile layer
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  
  App.messages = App.cable.subscriptions.create({channel: 'MessagesChannel', groupchat_id: groupchatId}, {
    received: function(data) {
      var latlng = data.message.split(";").slice(1, 3);
      if (data.message.includes("LatitudeLongitude;")) {
        if (locations[data.user] === undefined) {
          locations[data.user] = L.marker(latlng).addTo(map).bindPopup(data.user);
        } else {
          locations[data.user].setLatLng(latlng).update();
        }
        bounds.extend(latlng);
        map.fitBounds(bounds, {padding:[50,50]});
        return;
      } else {
        $("#messages").removeClass('hidden');
        return $('#messages').append(this.renderMessage(data)).scrollTop($('#messages')[0].scrollHeight);
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
