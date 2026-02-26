using FrikiTrader.Aplication.DTOs;
using FrikiTrader.Aplication.Interfaces;
using FrikiTrader.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel;
using System.Security.Claims;

namespace FrikiTrader.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ProductCreateDto dto)
        {
            //Extraer el id del usuario desde los Claims del token
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized(new { message = "Usuario no autenticado." });
            }
            int userId = int.Parse(userIdClaim.Value);

            var product = await _productService.CreateAsync(dto, userId);
            return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<Product>>> GetAll(
            [FromQuery] int? categoryId,
            [FromQuery] string? order,
            [FromQuery] bool onlyFavorites = false,
            [FromQuery] string? searchTerm = null,
            [FromQuery] int page = 1,
            [FromQuery] int PageSize = 12
            )
        {
            int? currentUserId = null;
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim != null)
            {
                currentUserId = int.Parse(userIdClaim.Value);
            }

            var products = await _productService.GetAllAsync(categoryId, order, onlyFavorites, currentUserId, searchTerm, page, PageSize);

            return Ok(products);

        }

        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetById(int id)
        {
            var product = await _productService.GetByIdAsync(id);
            if (product == null)
            {
                return NotFound(new { message = "Producto no encontrado." });
            }
            return Ok(product);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ProductCreateDto dto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var product = await _productService.GetByIdAsync(id);
            if (product == null)
            {
                return NotFound(new { message = "Producto no encontrado." });
            }
            if (product.UserId != userId)
            {
                return Forbid();
            }
            var success = await _productService.UpdateAsync(id, dto, userId);
            return success ? NoContent() : BadRequest();

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var product = await _productService.GetByIdAsync(id);
            if (product == null)
            {
                return NotFound(new { message = "Producto no encontrado." });
            }
            if (product.UserId != userId)
            {
                return Forbid();
            }
            var success = await _productService.DeleteAsync(id, userId);
            return success ? NoContent() : BadRequest();
        }


        [HttpGet("conditions")]
        [AllowAnonymous]
        public IActionResult GetConditions()
        {
            // Esto convierte el Enum en una lista de objetos { id, nombre } para Angular
            var conditions = Enum.GetValues(typeof(ProductCondition))
                .Cast<ProductCondition>()
                .Select(e => new
                {
                    id = (int)e,
                    nombre = GetEnumDescription(e)
                });

            return Ok(conditions);
        }

        private static string GetEnumDescription(Enum value)
        {
            var field = value.GetType().GetField(value.ToString());
            var attribute = field?.GetCustomAttributes(typeof(DescriptionAttribute), false)
                                  .FirstOrDefault() as DescriptionAttribute;

            return attribute != null ? attribute.Description : value.ToString();
        }

        [HttpPatch("{id}/buy")]
        public async Task<IActionResult> BuyProduct(int id)
        {
            var product = await _productService.GetByIdAsync(id);
            if (product == null)
            {
                return NotFound(new { message = "Producto no encontrado." });
            }
            if (product.Status == ProductStatus.Vendido)
            {
                return BadRequest(new { message = "Este producto ya ha sido vendido." });
            }

            product.Status = ProductStatus.Vendido;
            await _productService.UpdateStatusAsync(id, product.Status);
            return Ok(new { message = "Producto comprado exitosamente." });

        }

        [HttpGet("me")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Product>>> GetMyProducts()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null) return Unauthorized(new { message = "Usuario no autenticado." });

            var userId = int.Parse(userIdClaim.Value);
            var products = await _productService.GetByUserIdAsync(userId);
            return Ok(products);

        }
    }
}
