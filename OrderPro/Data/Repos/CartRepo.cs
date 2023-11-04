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

    public async Task<Cart> NewCart(int userId, IEnumerable<Item> items)
    {
        var cart = new Cart
        {
            UserId = userId,
            Items = items.ToList()
        };

        await _db.Carts.AddAsync(cart);
        await _db.SaveChangesAsync();

        return cart;
    }

    public async Task<Cart?> GetCart(int id)
    {   
        return await _db.Carts.Include(c => c.Items).FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<bool> AddToCart(Cart cart, IEnumerable<Item> items)
    {
        foreach (var item in items)
        {
            var i = cart.Items!.FirstOrDefault(i => i.Id == item.Id);

            if (i == null)
            {
                cart.Items!.Add(item);
            }
            else
            {
                i.Quantity += item.Quantity;
            }

            _db.Carts.Update(cart);
        }

        return await _db.SaveChangesAsync() > 0;
    }

    public async Task<bool> RemoveFromCart(Cart cart, IEnumerable<int> itemIds)
    {
        foreach (var id in itemIds)
        {
            var i = cart.Items!.FirstOrDefault(i => i.Id == id);

            if (i == null)
            {
                return false;
            }

            cart.Items!.Remove(i);
            
            _db.Carts.Update(cart);
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