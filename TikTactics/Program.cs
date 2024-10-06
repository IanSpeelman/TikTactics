using TikTactics.Hubs;
var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "all",
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:5173", "http://192.168.8.150:5173");
                          policy.AllowCredentials();
                          policy.AllowAnyHeader();
                          policy.AllowAnyMethod();
                      });
});

builder.Services.AddSignalR();

var app = builder.Build();

app.UseHttpsRedirection();

app.UseCors("all");
app.MapHub<GameHub>("/TikTactics");
app.Run();

