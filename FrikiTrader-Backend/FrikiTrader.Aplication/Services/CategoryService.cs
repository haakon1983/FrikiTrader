using FrikiTrader.Aplication.Interfaces;
using FrikiTrader.Infraestructure;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FrikiTrader.Aplication.Services
{
    public class CategoryService: ICategoryService
    {
        private readonly ApplicationDbContext _context;

        public CategoryService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<DTOs.CategoryDto>> GetAllCategoriesAsync()
        {
            return await _context.Categories
                .Select(c => new DTOs.CategoryDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    Description = c.Description
                })
                .ToListAsync();
        }
    }
}
