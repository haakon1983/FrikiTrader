using FrikiTrader.Aplication.DTOs;
using FrikiTrader.Aplication.Interfaces;
using FrikiTrader.Domain;
using FrikiTrader.Infraestructure;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FrikiTrader.Aplication.Services
{
    public class ProductService : IProductService
    {
        private readonly ApplicationDbContext _context;
        public ProductService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Product> CreateAsync(ProductCreateDto dto, int userId)
        {
            var product = new Product
            {
                Title = dto.Title,
                Description = dto.Description,
                Price = dto.Price,
                Condition = (ProductCondition)dto.Condition,
                ImageUrl = dto.ImageUrl,
                UserId = userId,
                CategoryId = dto.CategoryId,
                Status = ProductStatus.Disponible
            };
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<IEnumerable<Product>> GetAllAsync(int? categoryId, string? order, bool onlyFavorites,  int? currentUserId)
        {
            var query =  _context.Products
                .Where(p => p.Status == ProductStatus.Disponible) // Solo productos disponibles
                .AsQueryable();

            if (categoryId.HasValue && categoryId > 0)
            {
                query = query.Where(p => p.CategoryId == categoryId.Value);
            }

            if (onlyFavorites && currentUserId.HasValue)
            {
                query = query.Where(p => _context.UserFavorites.Any(f => f.UserId == currentUserId.Value && f.ProductId == p.Id));
            }

            query =order?.ToLower() switch
            {
                "asc" => query.OrderBy(p => p.Price),
                "desc" => query.OrderByDescending(p => p.Price),
                "newest" => query.OrderByDescending(p => p.Id),
                _ => query.OrderByDescending(p => p.Id) // Por defecto, los más nuevos primero
            };
            var products =  await query.ToListAsync();


            if (currentUserId.HasValue)
            {
                var favoriteIds = await _context.UserFavorites
                    .Where(f => f.UserId == currentUserId.Value)
                    .Select(f => f.ProductId)
                    .ToListAsync(); 

                foreach (var p in products)
                {
                    p.IsFavorite = favoriteIds.Contains(p.Id);
                }
            }
            return products;

        }

        public async Task<Product?> GetByIdAsync(int id)
        {
            return await _context.Products
                .Include(p => p.User)       //Trae datos del usuario
                .Include(p => p.Category)   //Trae datos de la categoria
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<bool> UpdateAsync(int id, ProductCreateDto dto, int userId)
        {
            var product = await _context.Products.FindAsync(id);
            //Validamos: Primero, que el producto exista; Segundo, que el userId del token coincida con el producto.
            if (product == null || product.UserId != userId) return false;

            product.Title = dto.Title;
            product.Description = dto.Description;
            product.Price = dto.Price;
            product.Condition = (ProductCondition)dto.Condition;
            product.ImageUrl = dto.ImageUrl ?? product.ImageUrl;
            product.CategoryId = dto.CategoryId;
            //_context.Products.Update(product);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteAsync(int id, int userId)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null || product.UserId != userId) return false;
            _context.Products.Remove(product);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task UpdateStatusAsync(int id, ProductStatus status)
        {
            var product = await _context.Products.FindAsync(id);
            if (product != null)
            {
                product.Status = status;
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new Exception("Producto no encontrado");
            }
        }
    }
}
