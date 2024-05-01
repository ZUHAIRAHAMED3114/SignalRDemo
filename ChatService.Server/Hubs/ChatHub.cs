
using ChatService.Server.Models;
using Microsoft.AspNetCore.SignalR;

namespace ChatService.Server.Hubs
{
    public class ChatHub :Hub
    {
        public async Task JoinChat(UserConnection conn) {
                      await Clients
                      .All
                      .SendAsync("RecieveMessage", "admin", $"{conn.UserName} has joined");
        }

        public async Task JoinSpecificChatRoom(UserConnection conn) {

            await Groups.AddToGroupAsync(Context.ConnectionId, conn.ChatRoom);
            await Clients.Group(conn.ChatRoom).SendAsync("RecieveMessage", "admin", $"{conn.UserName} has joined");
      
        }
    }
}
