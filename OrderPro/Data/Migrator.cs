namespace OrderPro.Data;
using Microsoft.EntityFrameworkCore;
using OrderPro.Models;

public class Migrator
{
    private static IEnumerable<Cart> GenerateCarts(int count, int users, int firstUser) 
    {
        var carts = new List<Cart>();
        for (int i = 1; i <= count; i++) {
            carts.Add(new Cart {
                Id = i,
                UserId = Random.Shared.Next(firstUser, users)
            });
        }
        return carts;
    }

    private static IEnumerable<Item> GenerateItems(int count, int carts, int products) 
    {
        var items = new List<Item>();
        for (int i = 1; i <= count; i++) {
            items.Add(new Item {
                Id = i,
                CartId = Random.Shared.Next(1, carts),
                ProductId = Random.Shared.Next(1, products),
                Quantity = Random.Shared.Next(1, 5)
            });
        }
        return items;
    }


    internal static async Task MigrateAndSeedDatabase(OrderProContext context, int carts = 0, int items = 0, int products = 0, int users = 0, int firstUser = 0) 
    {
        var pendingMigrations = await context.Database.GetPendingMigrationsAsync();
        if (pendingMigrations.Any()) 
        {
            var appliedMigrations = await context.Database.GetAppliedMigrationsAsync();
            await context.Database.MigrateAsync();
            
            if (!appliedMigrations.Any() && carts > 0) 
            {
                var cartsToAdd = GenerateCarts(carts, users, firstUser);
                await context.Carts.AddRangeAsync(cartsToAdd);

                var itemsToAdd = GenerateItems(items, carts, products);
                await context.Items.AddRangeAsync(itemsToAdd);
                
                await context.SaveChangesAsync();
            }  
        }
    }
}