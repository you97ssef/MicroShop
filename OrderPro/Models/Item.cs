namespace OrderPro.Models;

public class Item
{
    public int Id { get; set; }
    public int CartId { get; set; }
    public int ProductId { get; set; }
    public int Quantity { get; set; }

    public Cart? Cart { get; set; }
}