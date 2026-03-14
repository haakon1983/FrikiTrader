using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FrikiTrader.Domain
{
    public class Category: BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        // Propiedad de Navegación (Relación 1:N con Product)
        // Una Categoría puede tener muchos Productos
        public ICollection<Product> Products { get; set; }
    }
}
