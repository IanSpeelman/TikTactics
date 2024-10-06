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
                        if (GameList[game.Key].players.Count == 0)
                        {
                            GameList.Remove(game.Key);
                        }
                    }
                }
            }
        }

        public async Task SetGameSession(string room)
        {
            if (!GameList.ContainsKey(room))
            {
                GameList[room] = new Game();
            }


            if (GameList[room].players.Count >= 2)
            {
                await Clients.Caller.SendAsync("RoomFull", new { message = "Room is full, choose another room" });
                return;
            }

            string player = "x";
            if (GameList[room].players.Count == 1)
            {
                if (GameList[room].players[0].character == "x")
                {
                    player = "o";
                }
            }

            Player newPlayer = new Player()
            {
                id = Context.ConnectionId,
                character = player,
            };
            GameList[room].players.Add(newPlayer);
            await Groups.AddToGroupAsync(Context.ConnectionId, room);

            await Clients.Caller.SendAsync("Joined", new { message = "", player = player, turn = "x" });
            await Clients.Group(room).SendAsync("PlayerJoined", new
            {
                message = "",
                players = GameList[room].players.Count,
                board = GameList[room].board,
                turn = GameList[room].turn
            });
        }

        public async Task makeMove(string room, string move)
        {
            if (GameList[room].winner == "")
            {

                string currentTurn = GameList[room].turn;
                string[] MovePosition = move.Split(":");

                if (GameList[room].players.Where(player => player.id == Context.ConnectionId && player.character == GameList[room].turn).Any())
                {
                    if (GameList[room].board[int.Parse(MovePosition[0])][int.Parse(MovePosition[1])] == "")
                    {
                        GameList[room].board[int.Parse(MovePosition[0])][int.Parse(MovePosition[1])] = currentTurn;
                    }
                    GameList[room].turn = currentTurn == "x" ? "o" : "x";

                    GameList[room].winner = checkWinConditions(GameList[room].board);

                    await Clients.Group(room).SendAsync("TurnResponse", new
                    {
                        message = "",
                        players = GameList[room].players.Count,
                        board = GameList[room].board,
                        turn = GameList[room].turn,
                        winner = GameList[room].winner
                    });
                }
            }
        }

        private static string checkWinConditions(List<List<string>> board)
        {
            //check for hoizontal win
            foreach (var row in board)
            {
                if (row.Where(x => x == "x").Count() == 3)
                    return "x";
                if (row.Where(o => o == "o").Count() == 3)
                    return "o";
            }

            //check for vertical winner
            for (int i = 0; i < board.Count; i++)
            {
                List<string> column = new();
                for (int j = 0; j < board[i].Count; j++)
                {
                    column.Add(board[j][i]);
                }
                if (column.Where(x => x == "x").Count() == 3)
                    return "x";
                if (column.Where(o => o == "o").Count() == 3)
                    return "o";
            }

            //check for diagonal win
            List<string> diagonal = new();
            diagonal.Add(board[0][0]);
            diagonal.Add(board[1][1]);
            diagonal.Add(board[2][2]);
            if (diagonal.Where(x => x == "x").Count() == 3)
                return "x";
            if (diagonal.Where(o => o == "o").Count() == 3)
                return "o";


            diagonal = new();
            diagonal.Add(board[0][2]);
            diagonal.Add(board[1][1]);
            diagonal.Add(board[2][0]);
            if (diagonal.Where(x => x == "x").Count() == 3)
                return "x";
            if (diagonal.Where(o => o == "o").Count() == 3)
                return "o";

            //check if the game has moves left
            List<string> playedMoves = new();
            for (int i = 0; i < board.Count; i++)
            {
                for (int j = 0; j < board[i].Count; j++)
                {
                    playedMoves.Add(board[i][j]);
                }
            }
            if (playedMoves.Where(move => move == "x" || move == "o").Count() == 9)
                return "done";

            return "";
        }

        public async Task reset(string room)
        {
            GameList[room].turn = GameList[room].winner;
            if (GameList[room].winner == "done")
            {
                GameList[room].turn = "x";
            }
            GameList[room].winner = "";
            GameList[room].board = [
                ["","",""],
                ["","",""],
                ["","",""]
            ];
            await Clients.Group(room).SendAsync("TurnResponse", new
            {
                message = "",
                players = GameList[room].players.Count,
                board = GameList[room].board,
                turn = GameList[room].turn,
                winner = GameList[room].winner
            });
        }

    }
}

