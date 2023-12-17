using Application.Interfaces;
using Application.dto;
using MediatR;
using Model;
using FluentValidation;

using System.Threading;
using System.Threading.Tasks;
using System;
using MySqlConnector;

namespace Application.Users
{
    public class Login
    {
        public class LoginCommand : IRequest<CurrentUserDto>
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }
        public class QueryValidator : AbstractValidator<LoginCommand>
        {
            public QueryValidator()
            {
                RuleFor(x => x.Username).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
            }
        }
        public class Handler : IRequestHandler<LoginCommand, CurrentUserDto>
        {
            private readonly IJwtGenerator _jwtGenerator;
            private readonly string _conString;
            public Handler(IJwtGenerator jwtGenerator, DatabaseOptions databaseOptions)
            {
                _jwtGenerator = jwtGenerator;
                _conString = databaseOptions.ConnectionString;
            }

            public async Task<CurrentUserDto> Handle(LoginCommand request, CancellationToken cancellationToken)
            {
                var connection = new MySqlConnection(_conString);
                await connection.OpenAsync();
                var pw = UserUtility.Salter(request.Username, request.Password);
                var command = new MySqlCommand("SELECT ID, truename, email, ((SELECT Count(userid) FROM auth WHERE auth.userid = ID LIMIT 1) > 0) as isGM FROM users WHERE passwd=CONVERT(" + pw + " USING latin1)", connection);
                var reader = await command.ExecuteReaderAsync();
                if (await reader.ReadAsync() == false)
                {
                    throw new Exception("Missing User");
                };
                var currentUser = new CurrentUserDto
                {
                    DisplayName = (string)reader["truename"],
                    Token = _jwtGenerator.CreateToken(request.Username),
                    Username = request.Username,
                    Email = (string)reader["email"],
                    Rank = (int)reader["isGM"] == 1 ? UserRankEnum.GM : UserRankEnum.ADMIN,
                    Id = (int)reader["ID"]
                };
                reader.Close();
                await command.DisposeAsync();
                await connection.CloseAsync();

                if (UserUtility.IsAdmin(currentUser.Id))
                {
                    currentUser.Rank |= UserRankEnum.ADMIN;
                }


                return currentUser;
            }
        }
    }
}