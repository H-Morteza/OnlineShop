using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using OnlineShopAPI.Entities;

namespace OnlineShopAPI.Data
{
    public class ShopContext : IdentityDbContext<User>
    {
        public ShopContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<ProductEntiy> Products { get; set; }
        public DbSet<BasketEntity> Baskets { get; set; }
        public DbSet<BasketItemEntity> BasketItems { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<IdentityRole>()
                .HasData(
                    new IdentityRole { Name = "Member", NormalizedName = "MEMBER" },
                    new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" }
                );
        }
    }
}