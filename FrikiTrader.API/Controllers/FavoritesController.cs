using FrikiTrader.Domain;
using FrikiTrader.Infraestructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace FrikiTrader.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // Solo usuarios autenticados pueden acceder a esta ruta
    public class FavoritesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FavoritesController(ApplicationDbContext context)
        {
            _context = context;
        }

        //1.Post: api/favorites/idProducto
        [HttpPost("{productId}")]
        public async Task<IActionResult> AddToFavorites(int productId)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized(new { message = "Usuario no autenticado." });
            }
            int userId = int.Parse(userIdClaim.Value);

            if (await _context.UserFavorites.AnyAsync(f => f.UserId == userId && f.ProductId == productId))
            {
                return BadRequest(new { message = "Producto ya está en favoritos." });
            }
            var favorite = new UserFavorite
            {   UserId = userId,
                ProductId = productId
            };
            _context.UserFavorites.Add(favorite);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Producto agregado a favoritos." });
        }

        //2.Delete: api/favorites/idProducto
        [HttpDelete("{productId}")]
        public async Task<IActionResult> RemoveFavorite (int productId)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized(new { message = "Usuario no autenticado." });
            }
            int userId = int.Parse(userIdClaim.Value);

            var productExists = await _context.Products.AnyAsync(p => p.Id == productId);
            if (!productExists)
            {
                return NotFound(new { message = "Producto no encontrado." });
            }

            var favorite = await _context.UserFavorites.FirstOrDefaultAsync(f => f.UserId == userId && f.ProductId == productId);
            if (favorite == null)
            {
                return NotFound(new { message = "Producto no encontrado en favoritos." });
            }
            _context.UserFavorites.Remove(favorite);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Producto eliminado de favoritos." });
        }

        //3.Get: api/favorites (para ver la lista de favoritos de cada usuario)
        [HttpGet]
        public async Task<IActionResult> GetFavorites()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized(new { message = "Usuario no autenticado." });
            }
            int userId = int.Parse(userIdClaim.Value);

            var products = await _context.UserFavorites
                .Where(f => f.UserId == userId)
                .Include(f => f.Product)   // Incluye los detalles del producto
                .Select(f => f.Product)   // Selecciona solo el producto
                .ToListAsync();
            foreach (var p in products)
            {
                p.IsFavorite = true; // Marca cada producto como favorito
            }

            return Ok(products);
        }

    }
}
