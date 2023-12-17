using MediatR;
using Model;
using Application.dto;
using Application.Interfaces;

using System.Threading;
using System.Threading.Tasks;
using MySqlConnector;
using System.Collections.Generic;

namespace Application.Users
{
    public class UserList
    {
        public class UserListQuery : IRequest<List<UserListItemDto>>
        {
            public string IsGm { get; set; } = null;
            public string Name { get; set; } = null;
        }

        public class Handler : IRequestHandler<UserListQuery, List<UserListItemDto>>
        {
            private readonly IJwtGenerator _jwtGenerator;
            private readonly string _conString;
            public Handler(IJwtGenerator jwtGenerator, DatabaseOptions databaseOptions)
            {
                _jwtGenerator = jwtGenerator;
                _conString = databaseOptions.ConnectionString;
            }

            public async Task<List<UserListItemDto>> Handle(UserListQuery request, CancellationToken cancellationToken)
            {
                var connection = new MySqlConnection(_conString);
                await connection.OpenAsync();
                var command = new MySqlCommand("SELECT ID, email, name, truename, (SELECT Count(userid) FROM auth WHERE auth.userid = ID LIMIT 1) > 0 as isGM, (SELECT Count(uid) FROM point WHERE point.zoneid IS NOT NULL AND point.uid=ID) > 0 as isOnline FROM users WHERE 1", connection);
                var reader = await command.ExecuteReaderAsync();
                List<UserListItemDto> users = new List<UserListItemDto>();

                while (await reader.ReadAsync())
                {
                    var userId = reader.GetInt32("ID");
                    var rank = UserUtility.IsAdmin(userId) ? UserRankEnum.ADMIN : (reader.GetInt32("isGM") == 1 ? UserRankEnum.GM : UserRankEnum.MEMBER);
                    users.Add(new UserListItemDto
                    {
                        Id = reader.GetInt32("ID"),
                        DisplayName = reader.GetString("truename"),
                        Email = reader.GetString("email"),
                        Username = reader.GetString("name"),
                        Rank = rank,
                        IsOnline = reader.GetBoolean("isOnline")
                    });
                }
 
                reader.Close();
                await command.DisposeAsync();
                await connection.CloseAsync();
                return users;
            }
        }
    }
}