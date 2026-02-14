using FrikiTrader.Aplication.DTOs;
using FrikiTrader.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FrikiTrader.Aplication.Interfaces
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> GetAllAsync();
        Task<Product> GetByIdAsync(int id);
        Task<Product> CreateAsync(ProductCreateDto dto, int userId);
        Task<bool> UpdateAsync(int id, ProductCreateDto dto, int userId);
        Task<bool> DeleteAsync(int id, int userId);
        Task UpdateStatusAsync(int id, ProductStatus status);
    }
}
