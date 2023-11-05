using Microsoft.EntityFrameworkCore;
using OrderPro.Interfaces;
using OrderPro.Models;

namespace OrderPro.Data.Repos;

public class CartRepo : ICartRepo
{
    private readonly OrderProContext _db;

    public CartRepo(OrderProContext db)
    {
        _db = db;
    }

    public async Task<Cart> NewCart(int userId, List<Item> items)
    {
        var cart = new Cart
        {
            UserId = userId,
        };

        await _db.Carts.AddAsync(cart);
        await _db.SaveChangesAsync();

        foreach (var item in items)
        {
            item.CartId = cart.Id;
        }

        await _db.Items.AddRangeAsync(items);
        await _db.SaveChangesAsync();

        return cart;
    }

    public async Task<Cart?> GetCart(int userId)
    {   
        return await _db.Carts
            .OrderByDescending(c => c.Id)
            .FirstOrDefaultAsync(c => c.UserId == userId && !c.CheckedOut);
    }
    
    public async Task<Cart?> GetCartWithItems(int userId) 
    {
        return await _db.Carts
            .OrderByDescending(c => c.Id)
            .Include(c => c.Items)
            .FirstOrDefaultAsync(c => c.UserId == userId && !c.CheckedOut);
    }

    public async Task<bool> AddToCart(Cart cart, Item item)
    {
        var i = cart.Items!.FirstOrDefault(i => i.ProductId == item.ProductId);

        if (i is null)
        {
            item.CartId = cart.Id;
            await _db.Items.AddAsync(item);
        }
        else
        {
            i.Quantity += item.Quantity;
        }

        return await _db.SaveChangesAsync() > 0;
    }

    public async Task<bool> RemoveFromCart(Cart cart, int productId)
    {
        var i = cart.Items!.FirstOrDefault(i => i.ProductId == productId);

        if (i is not null)
        {
            _db.Items.Remove(i);
            cart.Items!.Remove(i);
        }

        if (cart.Items!.Count == 0)
        {
            _db.Carts.Remove(cart);
        }

        return await _db.SaveChangesAsync() > 0;
    }
    
    public async Task<bool> Checkout(Cart cart)
    {
        cart.CheckedOut = true;
        _db.Carts.Update(cart);
        return await _db.SaveChangesAsync() > 0;
    }
}