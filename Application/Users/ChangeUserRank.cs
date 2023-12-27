using Application.Interfaces;
using Application.dto;
using MediatR;
using Model;
using FluentValidation;

using System.Threading;
using System.Threading.Tasks;
using MySqlConnector;
using Microsoft.AspNetCore.Mvc;

namespace Application.Users
{
    public class ChangeUserRank
    {
        public class ChangeUserRankCommand : IRequest<Unit>
        {
            public int UserId { get; set; }
            public UserRankEnum Rank { get; set; }
        }
        public class QueryValidator : AbstractValidator<ChangeUserRankCommand>
        {
            public QueryValidator()
            {
                RuleFor(x => x.UserId).NotEmpty();
                RuleFor(x => x.Rank).Must(x => x == UserRankEnum.MEMBER || x == UserRankEnum.GM);
            }
        }
        public class Handler : IRequestHandler<ChangeUserRankCommand, Unit>
        {
            private readonly IJwtGenerator _jwtGenerator;
            private readonly string _conString;
            public Handler(IJwtGenerator jwtGenerator, DatabaseOptions databaseOptions)
            {
                _jwtGenerator = jwtGenerator;
                _conString = databaseOptions.ConnectionString;
            }

            public async Task<Unit> Handle(ChangeUserRankCommand request, CancellationToken cancellationToken)
            {
                var connection = new MySqlConnection(_conString);
                await connection.OpenAsync();
                MySqlCommand command;
                if (request.Rank == UserRankEnum.MEMBER || request.Rank == UserRankEnum.ADMIN)
                {
                    command = new MySqlCommand("DELETE from auth WHERE userid="+request.UserId+";", connection);
                }
                else
                {
                    command = new MySqlCommand("call addGM("+request.UserId+", 1);", connection);
                }
                await command.ExecuteNonQueryAsync();
                await command.DisposeAsync();
                await connection.CloseAsync();

                return Unit.Value;
            }
        }
    }
}