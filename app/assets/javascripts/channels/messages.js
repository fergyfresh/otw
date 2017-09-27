$(document).on('turbolinks:load', function() {
  groupchatId = $('input#message_groupchat_id').val();
  var locations = {};
  var map = L.map('map');
  var bounds = [];
  // load a tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  
  App.messages = App.cable.subscriptions.create({channel: 'MessagesChannel', groupchat_id: groupchatId}, {
    received: function(data) {
      var latlng = data.message.split(";").slice(1, 3);
      if (data.message.includes("LatitudeLongitude;")) {
        if (locations[data.user] === undefined) {
          locations[data.user] = L.marker(latlng).addTo(map).bindPopup(data.user);
        } else {
          locations[data.user].setLatLng(latlng).update();
        }
        bounds = Object.values(locations);
        
        var vals = Object.keys(locations).map(function (key) {
            return locations[key].getLatLng();
        });

        alert(vals);
        alert(bounds);
        map.fitBounds(vals);
        map.panToBounds(vals);
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
})
