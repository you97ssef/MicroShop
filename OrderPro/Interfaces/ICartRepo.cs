using OrderPro.Models;

namespace OrderPro.Interfaces;

public interface ICartRepo
{
    Task<Cart> NewCart(int userId, List<Item> items);
    Task<Cart?> GetCart(int userId);
    Task<Cart?> GetCartWithItems(int userId);
    Task<bool> AddToCart(Cart cart, Item item);
    Task<bool> RemoveFromCart(Cart cart, int ProductId);
    Task<bool> Checkout(Cart cart);
}
