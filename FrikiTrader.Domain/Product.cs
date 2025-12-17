using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FrikiTrader.Domain
{
    public class Product: BaseEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        // Campo para el valor INT del Enum
        public int Condition { get; set; }
        public string ImageUrl { get; set; }

        // --- Claves foráneas y propiedades de navegación ---
        //FK a User (Relación 1:N)
        public int UserId { get; set; }
        public User User { get; set; } // Propiedad de navegación
       
        //FK a Category (Relación 1:N)
        public int CategoryId { get; set; }
        public Category Category { get; set; } // Propiedad de navegación

        // Propiedad de Navegación (Relación 1:N con ChatConversation)
        // Un Producto puede ser el contexto de muchas conversaciones de chat
        public ICollection<ChatConversation> Conversations { get; set; }
    }
}
