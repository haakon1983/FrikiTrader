using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FrikiTrader.Domain
{
    public class ChatConversation: BaseEntity
    {
        public string FirebaseChannelId { get; set; } // El Id que conecta con Cloud Firestore

        // --- Claves foráneas y propiedades de navegación ---
        //FK a Product (Relación 1:N)
        public int ProductId { get; set; }
        public Product Product { get; set; } // Propiedad de navegación

        //FK al usuario que inicia la conversación (Relación 1:N)
        public int InitiatorUserId { get; set; }
        public User InitiatorUser { get; set; } // Propiedad de navegación

        //FK al usuario que recibe la conversación (Relación 1:N)
        public int ReceiverUserId { get; set; }
        public User ReceiverUser { get; set; } // Propiedad de navegación
    }
}
