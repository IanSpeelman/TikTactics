using TikTactics.Hubs;
var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "all",
                      policy =>
                      {
                          policy.WithOrigins("https://tiktactics.ianspeelman.com", "https://tiktactics.172.234.99.188");
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

