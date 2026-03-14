using FrikiTrader.Aplication.DTOs;
using FrikiTrader.Aplication.Interfaces;
using FrikiTrader.Domain;
using FrikiTrader.Infraestructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace FrikiTrader.Aplication.Services
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly IPasswordService _passworService;
        private readonly IConfiguration _config; //Lee la key de appsettings

        public AuthService(ApplicationDbContext context, IPasswordService passwordService, IConfiguration config)
        {
            _context = context;
            _passworService = passwordService;
            _config = config;
        }

        public async Task<bool> Registrar(UserRegisterDto dto)
        {
            //1. Verificar si el usuario ya existe
            if (_context.Users.Any(u => u.Email == dto.Email || u.Username == dto.Username))
                return false; // Usuario ya existe

            //2. Mapeo a la entidad basada en la imagen del DTO
            var nuevoUsuario = new User
            {
                Username = dto.Username,
                Email = dto.Email,
                PasswordHash = _passworService.HashPassword(dto.Password),
                ProfilePictureUrl = dto.ProfilePictureUrl,
                CreatedAt = DateTime.UtcNow
            };

            //3. Persistencia del nuevo usuario
            _context.Users.Add(nuevoUsuario);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<string?> Login(UserLoginDto dto)
        {
            //1. Buscar el usuario por email
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null)
                return null; // Usuario no encontrado
            //2. Verificar la contraseña
            if (!_passworService.VerifyPassword(dto.Password, user.PasswordHash))
                return null; // Contraseña incorrecta
            //3. Generarel token si todo es correcto
            return GenerarTokenJWT(user);
        }

        private string GenerarTokenJWT(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim("ProfilePictureUrl", user.ProfilePictureUrl ?? "")
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(2), //el token expira en 2 horas
                signingCredentials: creds);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
