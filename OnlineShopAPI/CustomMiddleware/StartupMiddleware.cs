using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OnlineShopAPI.Data;
using OnlineShopAPI.Entities;

namespace OnlineShopAPI.CustomMiddleware
{
    /// <summary>
    /// Initialise and seed database
    /// this Middleware for sure if database not exist then created and add some data on it
    /// </summary>
    public class StartupMiddleware
    {
        private readonly RequestDelegate _next;

        public StartupMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            using var scop = httpContext.RequestServices.CreateScope();
            var context = scop.ServiceProvider.GetRequiredService<ShopContext>();
            var userManager = scop.ServiceProvider.GetRequiredService<UserManager<User>>();
            var looger= scop.ServiceProvider.GetRequiredService<ILogger<Program>>();
            try
            {               
                await context.Database.MigrateAsync();
                await DbInitializer.Initialize(context, userManager);
            }
            catch (Exception ex)
            {
                looger.LogError(ex, "Problem migration data");
            }
            await _next(httpContext);
        }
    }
    public static class StartupMiddlewareExtensions
    {
        public static IApplicationBuilder UseStartupMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<StartupMiddleware>();
        }
    }
}