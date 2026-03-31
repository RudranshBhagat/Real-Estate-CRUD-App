
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            //builder.Services.AddOpenApi();

            IConfiguration configuration;

            configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();

            builder.Services.AddDbContext<RealEstateDbContext>
                (option => option.UseSqlServer(configuration.GetConnectionString("AppDbConnection")));

            var allowedOrigins = "_myAllowSpecificOrigins";
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: allowedOrigins,
                    builder =>
                    {
                        builder.WithOrigins("http://localhost", "http://localhost:5173")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .SetIsOriginAllowedToAllowWildcardSubdomains();
                    });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                //app.MapOpenApi();
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors(allowedOrigins);

            app.UseAuthorization();


            app.MapControllers();

            

            app.Run();
        }
    }
}
