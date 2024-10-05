using Microsoft.AspNetCore.SignalR;

namespace TikTactics.Hubs
{
    public class GameHub : Hub
    {
        private static Dictionary<string, List<string>> ExistingGroups = new();
        public override async Task OnDisconnectedAsync(Exception? exeption)
        {
            foreach (var group in ExistingGroups)
            {
                Console.WriteLine(group.Key);
                if (group.Value.Contains(Context.ConnectionId))
                {
                    group.Value.Remove(Context.ConnectionId);
                    await Groups.RemoveFromGroupAsync(Context.ConnectionId, group.Key);
                    await Clients.Group(group.Key).SendAsync("Disconnect", "A user has disconnected");
                }
            }
            await Clients.All.SendAsync("Disconnect", "A user has disconnected");
        }

        public async Task SetGameSession(string room)
        {
            if (!ExistingGroups.ContainsKey(room))
            {
                ExistingGroups[room] = new List<string>();
            }

            if (ExistingGroups[room].Count >= 2)
            {
                await Clients.Caller.SendAsync("RoomFull", "this room is full, choose another room");
                return;
            }

            ExistingGroups[room].Add(Context.ConnectionId);

            await Groups.AddToGroupAsync(Context.ConnectionId, room);
            await Clients.Group(room).SendAsync("Joined", "A new player has joined this session");
        }


    }

}

