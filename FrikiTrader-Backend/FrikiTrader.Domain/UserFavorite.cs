using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FrikiTrader.Domain
{
    public class UserFavorite
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }

        //Propiedad de navegación (útil para consultas)
        public virtual Product Product { get; set; }
    }
}
