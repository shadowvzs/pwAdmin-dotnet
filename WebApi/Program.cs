using Model;
using Microsoft.AspNetCore.Identity;

using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using System.IO;
using System.Reflection;

namespace WebApi
{
    ///<Summary>
    /// The dotnet application start here
    ///</Summary>
    public class Program
    {
        ///<Summary>
        /// Everything starts here
        ///</Summary>
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {

                    // context.Database.Migrate();
                    // Seed.SeedData(context, userManager).Wait();
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occured during migration");
                }
            }
            host.Run();
        }

        ///<Summary>
        /// Create the host server for the web
        ///</Summary>
        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder
                        .ConfigureAppConfiguration((builderContext, config) =>
                        {
                            config.AddJsonFile("appsettings.json", optional: false);
                        })
                        .UseContentRoot(Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location))
                        .UseKestrel(x => x.AddServerHeader = false)
                        .UseStartup<Startup>();
                });
    }
}
