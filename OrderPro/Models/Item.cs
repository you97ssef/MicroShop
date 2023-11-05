using System.Text.Json.Serialization;

namespace OrderPro.Models;

public class Item
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public int Quantity { get; set; }

    [JsonIgnore]
    public int CartId { get; set; }
    [JsonIgnore]
    public Cart? Cart { get; set; }
}