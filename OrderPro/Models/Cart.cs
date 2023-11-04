namespace OrderPro.Models;
public class Cart
{
    public int Id { get; set; }
    public int UserId { get; set; }

    public List<Item>? Items { get; set; }
}