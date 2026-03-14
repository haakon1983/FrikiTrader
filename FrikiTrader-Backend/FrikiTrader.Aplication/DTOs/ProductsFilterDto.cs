using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FrikiTrader.Aplication.DTOs
{
    internal class ProductsFilterDto
    {
        public int? CategoryId { get; set; }
        public string? OrderBy { get; set; }
        public bool OnlyFavorites { get; set; } = false;
    }
}
