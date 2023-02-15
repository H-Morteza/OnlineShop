using Microsoft.EntityFrameworkCore;
using OnlineShopAPI.Entities;

namespace OnlineShopAPI.Data
{
    public class ShopContext : DbContext
    {
        public ShopContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Product> Products { get; set; }
    }
}