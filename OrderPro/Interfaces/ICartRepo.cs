using OrderPro.Models;

namespace OrderPro.Interfaces;

public interface ICartRepo
{
    Task<Cart> NewCart(int userId, IEnumerable<Item> items);
    Task<Cart?> GetCart(int id);
    Task<bool> AddToCart(Cart cart, IEnumerable<Item> items);
    Task<bool> RemoveFromCart(Cart cart, IEnumerable<int> items);
    Task<bool> Checkout(Cart cart);
}
