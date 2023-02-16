using OnlineShopAPI.Entities;
using Bogus;

namespace OnlineShopAPI.Data
{
    public static class DbInitializer
    {
        public static void Initialize(ShopContext context){
            if(context.Products.Any()) return;
            var faker = new Faker();
            for (int i = 0; i < 20; i++)
            {
                Product product = new Product
                {
                    Name = faker.Commerce.ProductName(),
                    Description = faker.Commerce.ProductDescription(),
                    ImageUrl = faker.Image.PlaceImgUrl(),
                    Brand = faker.Commerce.ProductAdjective(),
                    Price = faker.Random.Long(0, 1000),
                    Type = faker.Commerce.ProductMaterial(),
                    QuantityInStock = faker.Random.Int(0, 500),
                    Rate = faker.Random.Double(0, 5),
                    PayablePrice = 0,                  
                };
                #region -------------------- create payble price random------------------
                int random = faker.Random.Int(0, 1000);
                if(random % 2 == 0 && random % 5 == 0){
                    double discountPercent = faker.Random.Double(0, 0.5);
                    long finalPayblePrice = product.Price - (long)(product.Price * discountPercent);
                    product.PayablePrice = finalPayblePrice;
                    product.DiscountPercent = (int)(discountPercent * 10);
                }
                #endregion --------------------------------------------------------
                context.Add(product);
            }
            context.SaveChanges();
        }
    }
}