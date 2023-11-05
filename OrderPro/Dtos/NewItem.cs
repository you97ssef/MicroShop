using System.ComponentModel.DataAnnotations;

namespace OrderPro.Dtos;

public class NewItem
{
    [Required]
    public int ProductId { get; set; }
    
    [Required]
    public int Quantity { get; set; }
}
