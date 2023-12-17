using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Infrastructure.Swagger
{
	public class SwaggerHostFactory
	{
		public static IHost CreateHost()
		{
			return Host.CreateDefaultBuilder()
			.ConfigureWebHostDefaults(b => b.UseStartup<SwaggerStartup>())
			.Build();
		}
		private sealed class SwaggerStartup
		{
			public SwaggerStartup(IConfiguration configuration)
			{
				Configuration = configuration;
			}

			public IConfiguration Configuration { get; }

			// public void ConfigureServices(IServiceCollection services)
			// {
			// 	ServiceRegistrations.ConfigureServices(services, Configuration);
			// }

			public static void Configure(IApplicationBuilder app) { }
		}
	}
}
