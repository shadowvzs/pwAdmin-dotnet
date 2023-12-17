using Application.Interfaces;
using Application.dto;
using MediatR;
using Model;
using FluentValidation;
using Application.Validators;

using System;
using System.Threading;
using System.Threading.Tasks;
using MySqlConnector;

namespace Application.Users
{
    public class Register
    {
 public class RegisterCommand : IRequest<CurrentUserDto>
        {
            public string DisplayName { get; set; }
            public string Username { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class CommandValidator : AbstractValidator<RegisterCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.DisplayName).NotEmpty();
                RuleFor(x => x.Username).NotEmpty();
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
                RuleFor(x => x.Password).Password();
            }
        }

        public class Handler : IRequestHandler<RegisterCommand, CurrentUserDto>
        {
            private readonly IJwtGenerator _jwtGenerator;
            private readonly string _conString;

            public Handler(IJwtGenerator jwtGenerator, DatabaseOptions databaseOptions)
            {
                _jwtGenerator = jwtGenerator;
                _conString = databaseOptions.ConnectionString;
            }

            public async Task<CurrentUserDto> Handle(RegisterCommand request, CancellationToken cancellationToken)
            {
                var connection = new MySqlConnection(_conString);
                await connection.OpenAsync();
                var command = new MySqlCommand("SELECT COUNT(name) FROM users WHERE name=@username OR email=@email", connection);
                await command.PrepareAsync();
                command.Parameters.AddWithValue("@username", request.Username);
                command.Parameters.AddWithValue("@email", request.Email);
                int count = (int)(long)await command.ExecuteScalarAsync();
                command.Dispose();

                if (count > 0)
                {
                    await connection.CloseAsync();
                    throw new Exception("Username or Email already in use!");
                }

                DateTime myDateTime = DateTime.Now;
                string sqlFormattedDate = myDateTime.ToString("yyyy-MM-dd HH:mm:ss");

                var pw = UserUtility.Salter(request.Username, request.Password);
                string sql = "call adduser(\"" + request.Username + "\", " + pw + ", \"\", \"\", \"" + request.DisplayName + "\", \"0.0.0.0\", \"" + request.Email + "\", \"0\", \"0\", \"0\", \"0\", \"0\", \"0\", \"0\", \"" + sqlFormattedDate + "\", \" \", " + pw + ");";
                command = new MySqlCommand(sql, connection);
                await command.ExecuteNonQueryAsync();
                await command.DisposeAsync();

                command = new MySqlCommand("SELECT ID FROM users WHERE name=@username", connection);
                await command.PrepareAsync();
                command.Parameters.AddWithValue("@username", request.Username);
                var reader = await command.ExecuteReaderAsync();
                if (await reader.ReadAsync() == false)
                {
                    throw new Exception("User creation was failed!");
                };
                var userId = (int)reader["ID"];
                await command.DisposeAsync();
                await connection.CloseAsync();
                var isAdmin = UserUtility.IsAdmin(userId);

                return new CurrentUserDto
                {
                    DisplayName = request.DisplayName,
                    Token = _jwtGenerator.CreateToken(request.Username),
                    Email = request.Email,
                    Username = request.Username,
                    Rank = isAdmin ? UserRankEnum.ADMIN : UserRankEnum.MEMBER,
                    Id = userId
                };
            }
        }
    }
}