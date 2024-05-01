
using ChatService.Server.DataService;
using ChatService.Server.Models;
using Microsoft.AspNetCore.SignalR;

namespace ChatService.Server.Hubs
{
    public class ChatHub :Hub
    {
        private readonly SharedDB _shared;

        public ChatHub(SharedDB shared)
        {
            _shared = shared;
        }

        public async Task JoinChat(UserConnection conn) {
                      await Clients
                      .All
                      .SendAsync("RecieveMessage", "admin", $"{conn.UserName} has joined");
        }

        public async Task JoinSpecificChatRoom(UserConnection conn) {
            _shared._connection[Context.ConnectionId]=conn;
            await Groups.AddToGroupAsync(Context.ConnectionId, conn.ChatRoom);
            await Clients.Group(conn.ChatRoom).SendAsync("RecieveMessage", "admin", $"{conn.UserName} has joined to {conn.ChatRoom} ChatRoom");
      
        }
        public async Task SendMessage(string message) {
            if (_shared._connection.TryGetValue(Context.ConnectionId, out UserConnection conn)) {
                await Clients.Group(conn.ChatRoom)
                             .SendAsync("RecieveSpecificMessage", conn.UserName, message);  
            }
        }
    }
}
