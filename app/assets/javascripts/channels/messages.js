$(document).ready(function() {
	groupchatId = $('input#message_groupchat_id').val();
	App.messages = App.cable.subscriptions.create({channel: 'MessagesChannel', groupchat_id: groupchatId}, {
		received: function(data) {
			$("#messages").removeClass('hidden');
			return $('#messages').append(this.renderMessage(data));
		},
		groupchat_id: function(data) {
			return data.groupchat_id
		},
		renderMessage: function(data) {
			return "<p> <b>" + data.user + ": </b>" + data.message + "</p>";
		}
	});
})
