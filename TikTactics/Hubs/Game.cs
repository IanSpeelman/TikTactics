using Microsoft.AspNetCore.SignalR;

namespace TikTactics.Hubs
{
    public class GameHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {

            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

    }

}

