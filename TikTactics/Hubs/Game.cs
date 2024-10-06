using Microsoft.AspNetCore.SignalR;
using TikTactics.Models;


namespace TikTactics.Hubs
{
    public class GameHub : Hub
    {

        private static Dictionary<string, Game> GameList = new();

        public override async Task OnDisconnectedAsync(Exception? exeption)
        {
            foreach (var game in GameList)
            {
                if (game.Value.players.Where(player => player.id == Context.ConnectionId).Any())
                {
                    for (int i = 0; i < GameList[game.Key].players.Count; i++)
                    {
                        if (GameList[game.Key].players[i].id == Context.ConnectionId)
                        {
                            GameList[game.Key].players.Remove(GameList[game.Key].players[i]);
                        }
                    }

                    await Groups.RemoveFromGroupAsync(Context.ConnectionId, game.Key);
                    await Clients.Group(game.Key).SendAsync("Disconnect", new { message = "", players = GameList[game.Key].players.Count });

                    if (GameList.ContainsKey(game.Key))
                    {
                        GameList.Remove(game.Key);
                    }


                }
            }
        }

        public async Task SetGameSession(string room)
        {
            string player = "o";
            if (!GameList.ContainsKey(room))
            {
                GameList[room] = new Game();
                player = "x";
            }


            if (GameList[room].players.Count >= 2)
            {
                await Clients.Caller.SendAsync("RoomFull", new { message = "Room is full, choose another room" });
                return;
            }

            Player newPlayer = new Player()
            {
                id = Context.ConnectionId,
                character = player,
            };
            GameList[room].players.Add(newPlayer);
            await Groups.AddToGroupAsync(Context.ConnectionId, room);

            await Clients.Caller.SendAsync("Joined", new { message = "", player = player, turn = "x" });
            await Clients.Group(room).SendAsync("PlayerJoined", new { message = "", players = GameList[room].players.Count, board = GameList[room].board, turn = GameList[room].turn });
        }


    }
}

