namespace TikTactics.Models
{
    public class Game
    {
        public List<Player> players { get; set; } = new List<Player>();
        public List<List<string>> board { get; set; } = [["", "", ""], ["", "", ""], ["", "", ""]];
        public string turn { get; set; } = "x";
        public string winner { get; set; } = "";
    }
}

