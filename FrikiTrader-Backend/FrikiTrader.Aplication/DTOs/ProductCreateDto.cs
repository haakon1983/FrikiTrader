using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FrikiTrader.Aplication.DTOs
{
    public class ProductCreateDto
    {
        [Required(ErrorMessage = "El título es obligatorio")]
        [StringLength(100)]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "La descripción es obligatoria")]
        public string Description { get; set; } = string.Empty;

        [Required]
        [Range(0.01, 99999999.99)]
        public decimal Price { get; set; }

        [Required]
        public int CategoryId { get; set; }

        [Required]
        [Range(1, 4, ErrorMessage = "La condición debe estar entre 1 (Nuevo) y 4 (Para piezas)")]
        public int Condition { get; set; } 

        public string? ImageUrl { get; set; }


    }
}
