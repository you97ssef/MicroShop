using Microsoft.EntityFrameworkCore;
using OrderPro.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<OrderProContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

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
        await Migrator.MigrateAndSeedDatabase(context, 100, 1000, 100, 102, 3);
    }
    else 
    {
        await Migrator.MigrateAndSeedDatabase(context);
    }
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
