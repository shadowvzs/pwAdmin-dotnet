using MediatR;
using Model;
using Application.Interfaces;

using System.Threading;
using System.Threading.Tasks;
using MySqlConnector;
using System;
using Application.dto;

namespace Application.Users
{
    public class CurrentUser
    {
        public class CurrentUserQuery : IRequest<CurrentUserDto> { }

        public class Handler : IRequestHandler<CurrentUserQuery, CurrentUserDto>
        {
            private readonly IJwtGenerator _jwtGenerator;
            private readonly IUserAccessor _userAccessor;
            private readonly string _conString;
            public Handler(IJwtGenerator jwtGenerator, IUserAccessor userAccessor, DatabaseOptions databaseOptions)
            {
                _jwtGenerator = jwtGenerator;
                _userAccessor = userAccessor;
                _conString = databaseOptions.ConnectionString;
            }

            public async Task<CurrentUserDto> Handle(CurrentUserQuery request, CancellationToken cancellationToken)
            {
                var username = _userAccessor.GetCurrentUsername();

                var connection = new MySqlConnection(_conString);
                await connection.OpenAsync();
                var command = new MySqlCommand("SELECT * FROM users WHERE name=@username", connection);
                command.Prepare();
                command.Parameters.AddWithValue("@username", username);
                var reader = await command.ExecuteReaderAsync();
                if (await reader.ReadAsync() == false)
                {
                    throw new Exception("Missing User");
                };
                var truename = (string)reader["truename"];
                var userId = (int)reader["ID"];
                var email = (string)reader["email"];
                await reader.CloseAsync();
                await connection.CloseAsync();

                return new CurrentUserDto
                {
                    DisplayName = truename,
                    Token = _jwtGenerator.CreateToken(username),
                    Username = username,
                    Email = email,
                    Id = userId
                };
            }
        }
    }
}