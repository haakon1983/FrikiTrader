using FrikiTrader.Aplication.DTOs;
using FrikiTrader.Aplication.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FrikiTrader.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterDto dto)
        {
            var resultado = await _authService.Registrar(dto);
            if (!resultado)
                return BadRequest("El usuario ya existe o no se pudo registrar.");
            return Ok("Usuario registrado exitosamente.");
        }

    }
}
