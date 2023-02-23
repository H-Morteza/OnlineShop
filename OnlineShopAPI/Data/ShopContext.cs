using Microsoft.EntityFrameworkCore;
using OnlineShopAPI.Entities;

namespace OnlineShopAPI.Data
{
    public class ShopContext : DbContext
    {
        public ShopContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<ProductEntiy> Products { get; set; }
        public DbSet<BasketEntity> Baskets { get; set; }
        public DbSet<BasketItemEntity> BasketItems { get; set; }
    }
}