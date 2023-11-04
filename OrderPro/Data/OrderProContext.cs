using Microsoft.EntityFrameworkCore;
using OrderPro.Models;

namespace OrderPro.Data;

public class OrderProContext : DbContext
{
    public OrderProContext(DbContextOptions<OrderProContext> options) : base(options)
    {
    }

    public DbSet<Cart> Carts { get; set; } = default!;
    public DbSet<Item> Items { get; set; } = default!;
}