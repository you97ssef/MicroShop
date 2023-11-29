using Microsoft.EntityFrameworkCore;
using OrderPro.Data;
using OrderPro.Data.Repos;
using OrderPro.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<OrderProContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<ICartRepo, CartRepo>(); 

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<OrderProContext>();

    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
        await Migrator.MigrateAndSeedDatabase(context, 1000, 10000, 100, 100, 3, 500);
    }
    else 
    {
        await Migrator.MigrateAndSeedDatabase(context, 2000, 20000, 200, 200, 3, 1000);
    }
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
