using System;
using System.Text;
using System.Security.Cryptography;
using System.Linq;

namespace Application.dto
{
    public class UserUtility
    {
        public static string Salter(string username, string password)
        {
            String input = username + password;
            using (var md5 = MD5.Create())
            {
                var result = md5.ComputeHash(Encoding.ASCII.GetBytes(input));
                return "0x" + BitConverter.ToString(result).Replace("-", "");
            }
        }

        public static bool IsAdmin(int userId)
        {
            int[] admins = { 32 };
            return admins.Contains(userId);
        }
    }
}