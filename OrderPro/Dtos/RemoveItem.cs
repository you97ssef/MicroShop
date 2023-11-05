using System.ComponentModel.DataAnnotations;

namespace OrderPro.Dtos;

public class RemoveItem
{
    [Required]
    public int ProductId { get; set; }
}
