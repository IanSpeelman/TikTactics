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
                    await Clients.Group(group.Key).SendAsync("Disconnect", new { message = "", players = ExistingGroups[group.Key].Count });
                }
            }
        }

        public async Task SetGameSession(string room)
        {
            string player = "o";
            if (!ExistingGroups.ContainsKey(room))
            {
                ExistingGroups[room] = new List<string>();
                player = "x";

            }

            if (ExistingGroups[room].Count >= 2)
            {
                await Clients.Caller.SendAsync("RoomFull", new { message = "Room is full, choose another room" });
                return;
            }

            ExistingGroups[room].Add(Context.ConnectionId);
            await Groups.AddToGroupAsync(Context.ConnectionId, room);

            await Clients.Caller.SendAsync("Joined", new { message = "", player = player, turn = "x" });
            await Clients.Group(room).SendAsync("PlayerJoined", new { message = "", players = ExistingGroups[room].Count });
        }


    }
}

