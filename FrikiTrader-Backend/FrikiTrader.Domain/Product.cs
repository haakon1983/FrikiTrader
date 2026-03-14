using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FrikiTrader.Domain
{
    public class Product: BaseEntity
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        // Campo para el valor INT del Enum
        public ProductCondition Condition { get; set; }
        public string? ImageUrl { get; set; }

        // --- Claves foráneas y propiedades de navegación ---
        //FK a User (Relación 1:N)
        public int UserId { get; set; }
        public User User { get; set; } = null!; // Propiedad de navegación
       
        //FK a Category (Relación 1:N)
        public int CategoryId { get; set; }
        public Category Category { get; set; } = null!; // Propiedad de navegación

        // Propiedad de Navegación (Relación 1:N con ChatConversation)
        // Un Producto puede ser el contexto de muchas conversaciones de chat
        public ICollection<ChatConversation> Conversations { get; set; } = new List<ChatConversation>();

        public ProductStatus Status { get; set; } = ProductStatus.Disponible; // Valor por defecto
        
        [NotMapped]
        public bool IsFavorite { get; set; }
    }
}
