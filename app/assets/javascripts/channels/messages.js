var my_connections = [];

$(document).on('turbolinks:load', function() {
  groupchatId = $('input#message_groupchat_id').val();
  var map = L.map('map');
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 16}).addTo(map);
  var locations = {};
  var bounds = [];
  if (my_connections.indexOf(groupchatId) < -1) {
    my_connections.push(groupchatId);
    App.messages = App.cable.subscriptions.create({channel: 'MessagesChannel', groupchat_id: groupchatId}, {
      received: function(data) {
        var latlng = data.message.split(";").slice(1, 3);
        if (data.message.includes("LatitudeLongitude;")) {
          if (locations[data.user] === undefined) {
            locations[data.user] = L.marker(latlng).addTo(map).bindPopup(data.user);
          } else {
            locations[data.user].setLatLng(latlng).update();
          }
        
          bounds = Object.keys(locations).map(function (key) {
              return locations[key].getLatLng();
          });
        
          map.fitBounds(bounds, {padding: [70, 70]});
        
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
        var msg = '';
        if (data.user == gon.current_user.name) {
          msg = "<p class='my-content'>" + data.message + "</p>";
        } else {
          msg = "<p class='their-name'>" + data.user + "</p>";
          msg = msg + "<p class='their-content'>" + data.message + "</p>";
        }
        return msg;
      }
    });
  }
})
