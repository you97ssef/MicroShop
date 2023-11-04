using Microsoft.EntityFrameworkCore;
using OrderPro.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<OrderProContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("OrderProContext")));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
