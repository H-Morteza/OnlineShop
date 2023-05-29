using Bogus;
using Microsoft.AspNetCore.Identity;
using OnlineShopAPI.Entities;

namespace OnlineShopAPI.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(ShopContext context, UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                User user = new()
                {
                    UserName = "morteza",
                    Email = "morteza@gmail.com"
                };
                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");
                User admin = new()
                {
                    UserName = "admin",
                    Email = "admin@gmail.com"
                };
                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin, new[] { "Member", "Admin" });
            }
            if (context.Products.Any()) return;
            var faker = new Faker();
            for (int i = 0; i < 20; i++)
            {
                string productName = faker.Commerce.ProductName();
                long productPric = faker.Random.Long(0, 1000);
                ProductEntiy product = new()
                {
                    Name = productName,
                    Description = faker.Commerce.ProductDescription(),
                    ImageUrl = faker.Image.LoremFlickrUrl(),
                    Brand = faker.Commerce.ProductAdjective(),
                    Price = productPric,
                    Type = faker.Commerce.ProductMaterial(),
                    QuantityInStock = faker.Random.Int(0, 500),
                    Rate = Math.Round(faker.Random.Double(1, 5), 1),
                    PayablePrice = 0,
                    ImageAlt = productName,
                };
                #region -------------------- create payble price random (actuly we create discount)------------------
                int random = faker.Random.Int(0, 1000);
                if (random % 2 == 0 && random % 5 == 0)
                {
                    double discountPercent = Math.Round(faker.Random.Double(0.1, 0.5), 2);
                    long finalPayblePrice = productPric - (long)(productPric * discountPercent);
                    product.PayablePrice = finalPayblePrice;
                    product.DiscountPercent = (int)(discountPercent * 100);
                }
                #endregion --------------------------------------------------------
                context.Add(product);
            }
            context.SaveChanges();
        }
    }
}