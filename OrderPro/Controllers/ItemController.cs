using Microsoft.AspNetCore.Mvc;
using OrderPro.Dtos;
using OrderPro.Interfaces;
using OrderPro.Models;

namespace OrderPro.Controllers;

[ApiController]
[Route("[controller]")]
public class ItemController : ControllerBase
{
    private readonly ICartRepo _repo;

    public ItemController(ICartRepo repo)
    {
        _repo = repo;
    }

    [HttpPost("{userId}")]
    public async Task<IActionResult> AddToCart(int userId, NewItem newItem)
    {
        var cart = await _repo.GetCartWithItems(userId);

        if (cart == null)
        {
            return NotFound();
        }

        var item = new Item { ProductId = newItem.ProductId, Quantity = newItem.Quantity };

        if (await _repo.AddToCart(cart, item))
        {
            return NoContent();
        }

        return BadRequest();
    }

    [HttpDelete("{userId}")]
    public async Task<IActionResult> RemoveFromCart(int userId, RemoveItem removeItem)
    {
        var cart = await _repo.GetCartWithItems(userId);

        if (cart == null)
        {
            return NotFound();
        }

        if (await _repo.RemoveFromCart(cart, removeItem.ProductId))
        {
            return NoContent();
        }

        return BadRequest();
    }
}
