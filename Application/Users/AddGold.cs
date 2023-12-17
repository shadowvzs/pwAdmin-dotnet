using Application.Interfaces;
using MediatR;
using Model;
using FluentValidation;

using System.Threading;
using System.Threading.Tasks;
using MySqlConnector;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Application.Users
{
    public class AddGold
    {
        public class AddGoldCommand : IRequest<Unit>
        {
            public int UserId { get; set; }
            public int Amount { get; set; }
        }
        public class QueryValidator : AbstractValidator<AddGoldCommand>
        {
            public QueryValidator()
            {
                RuleFor(x => x.UserId).NotEmpty();
                RuleFor(x => x.Amount).NotEmpty();
            }
        }
        public class Handler : IRequestHandler<AddGoldCommand, Unit>
        {
            private readonly IJwtGenerator _jwtGenerator;
            private readonly string _conString;
            public Handler(IJwtGenerator jwtGenerator, DatabaseOptions databaseOptions)
            {
                _jwtGenerator = jwtGenerator;
                _conString = databaseOptions.ConnectionString;
            }

            public async Task<Unit> Handle(AddGoldCommand request, CancellationToken cancellationToken)
            {
                var connection = new MySqlConnection(_conString);
                await connection.OpenAsync();
                DateTime myDateTime = DateTime.Now;
                string sqlFormattedDate = myDateTime.ToString("yyyy-MM-dd HH:mm:ss");
                var sql = "INSERT INTO usecashnow (userid, zoneid, sn, aid, point, cash, status, creatime) VALUES ("+request.UserId+", '1', '0', '1', '0',"+request.Amount+", '1', '"+ sqlFormattedDate + "') ON DUPLICATE KEY UPDATE cash = cash + "+request.Amount+";";
                var command = new MySqlCommand(sql, connection);
                await command.ExecuteNonQueryAsync();
                await command.DisposeAsync();
                await connection.CloseAsync();

                return Unit.Value;
            }
        }
    }
}