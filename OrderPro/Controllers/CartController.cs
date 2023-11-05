using Microsoft.AspNetCore.Mvc;
using OrderPro.Dtos;
using OrderPro.Interfaces;
using OrderPro.Models;

namespace OrderPro.Controllers;

[ApiController]
[Route("[controller]")]
public class CartController : ControllerBase
{
    private readonly ICartRepo _repo;

    public CartController(ICartRepo repo)
    {
        _repo = repo;
    }

    [HttpGet("{userId}")]
    public async Task<ActionResult<Cart>> GetCart(int userId)
    {
        var cart = await _repo.GetCartWithItems(userId);

        if (cart == null)
        {
            return NotFound();
        }

        return cart;
    }

    [HttpPost("{userId}")]
    public async Task<ActionResult<Cart>> NewCart(int userId, IEnumerable<NewItem> newItems)
    {
        var items = newItems.Select(i => new Item { ProductId = i.ProductId, Quantity = i.Quantity });

        var cart = await _repo.NewCart(userId, items.ToList());

        return cart;
    }
   
    [HttpPut("{userId}/checkout")]
    public async Task<IActionResult> Checkout(int userId)
    {
        var cart = await _repo.GetCart(userId);

        if (cart == null)
        {
            return NotFound();
        }

        if (await _repo.Checkout(cart))
        {
            return NoContent();
        }

        return BadRequest();
    }
}
