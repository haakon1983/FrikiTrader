using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FrikiTrader.Domain
{
    public class User: BaseEntity
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        // Propiedad de Navegación (Relación 1:N con Product)
        // Un Usuario puede tener muchas Órdenes
        public ICollection<Product> ProductListed { get; set; }

        // Propiedades de Navegación para el chat (Dos lados de la realición 1:N)
        // Un usuario puede enviar muchos mensajes
        public ICollection<ChatConversation> ConversationInitiated { get; set; }
        public ICollection<ChatConversation> ConversationReceived{ get; set; }
    }
}
