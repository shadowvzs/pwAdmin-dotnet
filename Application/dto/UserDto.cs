using System;

namespace Application.dto
{
    /// <summary>
    /// Enum for the user ranks
    /// </summary>
    [Flags]
    public enum UserRankEnum : int
    {
        MEMBER = 0,
        GM = 0x1 << 0,
        ADMIN = 0x1 << 1,
    }

    public class UserDto
    {
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public UserRankEnum Rank { get; set; }
        public int Id { get; set; }
    }
}