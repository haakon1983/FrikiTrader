using FrikiTrader.Aplication.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace FrikiTrader.Aplication.Services
{
    public class PasswordService: IPasswordService
    {
        //Transforma la contraseña plana en un Hash irreconocible.
        public string HashPassword(string password)
        {
            //Genra un hash seguro usando BCrypt
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        //Verifica si la contraseña plana coincide con el Hash almacenado
        public bool VerifyPassword(string password, string passwordHash)
        {
            //Compara la contraseña con el hash usando BCrypt
            return BCrypt.Net.BCrypt.Verify(password, passwordHash);
        }
    }
}
