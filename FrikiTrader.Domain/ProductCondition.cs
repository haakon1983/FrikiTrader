using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FrikiTrader.Domain
{
    public enum ProductCondition
    {
        [Description("Nuevo, sin usar")]
        New = 1,

        [Description("Como nuevo")]
        LikeNew = 2,

        [Description("Usado, en buen estado")]
        Used = 3,

        [Description("Para piezas o no funcional")]
        ForParts = 4
    }
}
