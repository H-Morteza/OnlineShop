using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace OnlineShopAPI.CustomMiddleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _environment;
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment environment)
        {
            _environment = environment;
            _logger = logger;
            _next = next;
        }
        public async Task Invoke(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                httpContext.Response.ContentType = "applicationjson";
                httpContext.Response.StatusCode = 500;
                var response = new ProblemDetails
                {
                    Status = 500,
                    Detail = _environment.IsDevelopment() ? ex.StackTrace?.ToString() : null,
                    Title = ex.Message,
                };
                await httpContext.Response.WriteAsJsonAsync(response);
            }
        }
    }
    public static class ExceptionMiddlewareExtensions
    {
        public static IApplicationBuilder UseExceptionMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ExceptionMiddleware>();
        }
    }
}