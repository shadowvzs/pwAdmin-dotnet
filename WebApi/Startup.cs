using Application.Interfaces;
using Application.Users;
using WebApi.Middleware;
using MediatR;
using Model;
using Infrastructure.Security;
using Infrastructure.Swagger;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Authorization;

using System;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using Microsoft.OpenApi.Models;
using static Application.Users.UserList;
using Microsoft.Extensions.FileProviders;
using static Application.Servers.CheckInstancesStatus;
using static Application.Servers.ManageInstances;

namespace WebApi
{
    ///<Summary>
    /// Program.cs will call this for the service configuratiopn
    ///</Summary>
    public class Startup
    {
        ///<Summary>
        /// The Startup constructor for assign the configuration (from appSettings.json)
        ///</Summary>
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        ///<Summary>
        /// This the configurations from appSettings.json
        ///</Summary>
        public IConfiguration Configuration { get; }

        ///<Summary>
        /// This method gets called by the runtime. Use this method to add services to the container.
        ///</Summary>
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddOptions();
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy => 
                {
                    policy
                        .AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .WithExposedHeaders("WWW-Authenticate")
                        .WithOrigins("http://localhost:8080", "http://127.0.0.1:5000", "http://localhost:5000")
                        .AllowCredentials();
                });
            });
            services.AddHttpContextAccessor();
            services.AddSingleton(new DatabaseOptions() { ConnectionString = Configuration.GetConnectionString("DefaultConnection") });
            services.AddMediatR(typeof(Login.Handler).Assembly);

            services.AddSignalR();
            services.AddControllers(opt =>
            {
                 var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                 opt.Filters.Add(new AuthorizeFilter(policy));
            });
			services.AddSwaggerGen(options =>
			{
                options.SchemaFilter<EnumSchemaFilter>();
                options.SchemaFilter<NullableSchemaFilter>();
                // enforce to create the following types
                options.DocumentFilter<CustomModelDocumentFilter<UserListQuery>>();
                options.DocumentFilter<CustomModelDocumentFilter<ManageInstancesCommand>>();
                options.DocumentFilter<CustomModelDocumentFilter<CheckInstancesStatusQuery>>();
                // custom type generation ending
                options.OperationFilter<AddHeader>();
				options.SwaggerDoc("v1", new OpenApiInfo {
                    Title = "PWAdmin API - v1",
                    Version = "v1"
                });

				var baseDirectory = System.AppContext.BaseDirectory;
				var commentsFileName = Assembly.GetExecutingAssembly().GetName().Name + ".xml";
				var commentsFile = Path.Combine(baseDirectory, commentsFileName);
				options.IncludeXmlComments(commentsFile);
			});

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["TokenKey"]));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>
                {
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        ValidateAudience = false,
                        ValidateIssuer = false,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero
                    };

                    opt.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context => 
                        {
                            var accessToken = context.Request.Query["access_token"];
                            var path = context.HttpContext.Request.Path;
                            if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/chat"))
                            {
                                context.Token = accessToken;
                            }
                            return Task.CompletedTask;
                        }
                    };
                });

            services.AddScoped<IJwtGenerator, JwtGenerator>();
            services.AddScoped<IUserAccessor, UserAccessor>();
        }

        ///<Summary>
        /// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        ///</Summary>
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
 
            app.UseSwagger();
            app.UseSwaggerUI(options =>
            {
                options.DocumentTitle = "PWAdmin API";
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "PWAdmin API v1");
            });

            app.UseMiddleware<ErrorHandlingMiddleware>();
            // app.UseHttpsRedirection();
           
            app.UseXContentTypeOptions();
            app.UseReferrerPolicy(opt => opt.NoReferrer());
            app.UseXXssProtection(opt => opt.EnabledWithBlockMode());
            app.UseXfo(opt => opt.Deny());
            app.UseCsp(opt => opt
                .ReportUris(r => r.Uris("/"))
                .BlockAllMixedContent()
                .StyleSources(s => s.Self().CustomSources("https://fonts.googleapis.com", "sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU="))
                .FontSources(s => s.Self().CustomSources("https://fonts.gstatic.com", "data:"))
                .FormActions(s => s.Self())
                .FrameAncestors(s => s.Self())
                .ScriptSources(s => s.Self().CustomSources("https://fonts.googleapis.com", "sha256-lYd7smU36stEaC+qXwEU+xLEbTjbnlQVYZvBi2Mf59E="))
            );
            
            var dir = AppDomain.CurrentDomain.BaseDirectory;

            var assemblyDirectory = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            Console.WriteLine(Path.Combine(assemblyDirectory, "WebApi", "wwwroot"));
            app.UseDefaultFiles();
            app.UseStaticFiles(new StaticFileOptions());

            app.UseRouting();
            app.UseCors("CorsPolicy");

            app.UseAuthentication();
            app.UseAuthorization();


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapFallbackToController("Index", "Fallback");
            });
        }
    }
}
