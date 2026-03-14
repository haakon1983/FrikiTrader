using FrikiTrader.Aplication.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FrikiTrader.Aplication.Interfaces
{
    public interface IAuthService
    {
        Task<bool> Registrar(UserRegisterDto dto);
        Task<string?> Login(UserLoginDto dto);
    }
}
