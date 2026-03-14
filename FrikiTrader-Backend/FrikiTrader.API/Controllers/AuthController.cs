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
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Register([FromBody]UserRegisterDto dto)
        {
            try
            {
                var resultado = await _authService.Registrar(dto);
                if (!resultado)
                {
                    return BadRequest(new { message = "El usuario ya existe o no se pudo registrar." });
                }  
                return Ok(new { message = "Usuario registrado exitosamente." });
            }
            catch (Exception ex)
            {
                // Log the exception (not shown here for brevity)
                return StatusCode(500, new { message = "Ocurrió un error al procesar el registro.", details = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto dto)
        {
            try
            {
                var token = await _authService.Login(dto);
                if (token == null)
                {
                    return Unauthorized(new { message = "Email o contraseña incorrectos." });
                }
                return Ok(new { token });
            }
            catch (Exception ex)
            {
                // Log the exception (not shown here for brevity)
                return StatusCode(500, new { message = "Ocurrió un error al procesar el inicio de sesión.", details = ex.Message });
            }
        }

    }
}
