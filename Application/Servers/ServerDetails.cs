using MediatR;
using Model;
using Application.Interfaces;

using System.Threading;
using System.Threading.Tasks;
using MySqlConnector;
using System;
using Application.dto;

namespace Application.Servers
{
    public class ServerDetails
    {
        public class ServerDetailsQuery : IRequest<ServerDetailsDto> { }

        public class Handler : IRequestHandler<ServerDetailsQuery, ServerDetailsDto>
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

            public async Task<ServerDetailsDto> Handle(ServerDetailsQuery request, CancellationToken cancellationToken)
            {
                var username = _userAccessor.GetCurrentUsername();

                var connection = new MySqlConnection(_conString);
                await connection.OpenAsync();
                var command = new MySqlCommand("SELECT COUNT(zoneid) FROM point WHERE zoneid IS NOT NULL", connection);
                int count = (int)(long)await command.ExecuteScalarAsync();
                await command.DisposeAsync();
                await connection.CloseAsync();

                return new ServerDetailsDto
                {
                    Online = count > 0,
                };
            }
        }
    }
}