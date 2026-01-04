using FrikiTrader.Aplication.DTOs;
using FrikiTrader.Aplication.Interfaces;
using FrikiTrader.Domain;
using FrikiTrader.Infraestructure;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FrikiTrader.Aplication.Services
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly IPasswordService _passworService;

        public AuthService(ApplicationDbContext context, IPasswordService passwordService)
        {
            _context = context;
            _passworService = passwordService;
        }

        public async Task<bool> Registrar(UserRegisterDto dto)
        {
            //1. Verificar si el usuario ya existe
            if (_context.Users.Any(u => u.Email == dto.Email || u.Username == dto.UserName ))
                return false; // Usuario ya existe

            //2. Mapeo a la entidad basada en la imagen del DTO
            var nuevoUsuario = new User
            {
                Username = dto.UserName,
                Email = dto.Email,
                PasswordHash = _passworService.HashPassword(dto.Password),
                CreatedAt = DateTime.UtcNow
            };

            //3. Persistencia del nuevo usuario
            _context.Users.Add(nuevoUsuario);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
