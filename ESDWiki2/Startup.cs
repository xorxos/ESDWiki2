using AutoMapper;
using ESDWiki2.Data;
using ESDWiki2.Data.Entities;
using ESDWiki2.Helpers;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Security.Claims;
using System.Text;

namespace ESDWiki2
{
    public class Startup
    {
        private readonly IConfiguration _config;

        private const string SecretKey = "iNivDmHLpUA223sqsfhqGbMRdRj1PVkH"; // todo: get this from somewhere secure
        private readonly SymmetricSecurityKey _signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(SecretKey));

        public Startup(IConfiguration config)
        {
            _config = config;
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {


            services.AddDbContext<WikiContext>(options =>
                options.UseSqlServer(_config.GetConnectionString("WikiConnectionString"),
                    b => b.MigrationsAssembly("ESDWiki2")));

            services.TryAddTransient<IHttpContextAccessor, HttpContextAccessor>();

            services.AddIdentity<ApplicationUser, IdentityRole>(cfg =>
           {
               cfg.User.RequireUniqueEmail = true;
           })
            .AddEntityFrameworkStores<WikiContext>();

            services.AddAuthentication()
                .AddCookie(options =>
                {
                    options.LoginPath = "/login";
                })
                .AddJwtBearer(cfg =>
               {
                   cfg.TokenValidationParameters = new TokenValidationParameters()
                   {
                       ValidateIssuer = true,
                       ValidateAudience = true,
                       ValidateLifetime = true,
                       ValidateIssuerSigningKey = true,

                       ValidIssuer = _config["Tokens:Issuer"],
                       ValidAudience = _config["Tokens:Audience"],
                       IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Tokens:Key"]))
                   };
               });

            services.AddAuthorization(options =>
            {
                options.AddPolicy(
                    "DefaultUser",
                    policy =>
                        policy.RequireAssertion(context =>
                        (context.User.HasClaim(ClaimTypes.Role, "WikiAdmin")) || context.User.HasClaim(ClaimTypes.Role, "ESDAdmin") ||
                        (context.User.HasClaim(ClaimTypes.Role, "DefaultUser")) || (context.User.HasClaim(ClaimTypes.Role, "ESDMember")))
                    );
                options.AddPolicy(
                    "ESDMember",
                    policy =>
                        policy.RequireAssertion(context =>
                        (context.User.HasClaim(ClaimTypes.Role, "WikiAdmin")) || context.User.HasClaim(ClaimTypes.Role, "ESDAdmin")
                        || (context.User.HasClaim(ClaimTypes.Role, "ESDMember")))
                    );
                options.AddPolicy(
                    "ESDAdmin",
                    policy =>
                        policy.RequireAssertion(context =>
                        (context.User.HasClaim(ClaimTypes.Role, "WikiAdmin")) || context.User.HasClaim(ClaimTypes.Role, "ESDAdmin"))
                    );
                options.AddPolicy(
                    "WikiAdmin",
                    policy =>
                        policy.RequireAssertion(context =>
                        (context.User.HasClaim(ClaimTypes.Role, "WikiAdmin")))
                    );
            });

            services.AddCors(options =>
            {
                options.AddPolicy("EnableCORS", builder =>
                {
                    builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().AllowCredentials().Build();
                });
            });

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            services.AddAutoMapper();
            services.AddMvc().AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<Startup>());

            services.AddTransient<WikiSeeder>();

            services.AddScoped<IWikiRepository, WikiRepository>();

            services.AddMvc()
                .SetCompatibilityVersion(Microsoft.AspNetCore.Mvc.CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"StaticFiles")),
                RequestPath = new PathString("/StaticFiles")
            });

            app.UseSpaStaticFiles();
            app.UseAuthentication();
            app.UseCors("EnableCORS");

            app.UseMvc(cfg =>
            {
                cfg.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
