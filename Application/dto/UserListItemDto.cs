namespace Application.dto
{
    public class UserListItemDto
    {
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public UserRankEnum Rank { get; set; }
        public int Id { get; set; }
        public bool IsOnline { get; set; }
    }
}