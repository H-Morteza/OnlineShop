using OnlineShopAPI.Entities;

namespace OnlineShopAPI.Data
{
    public static class DbInitializer
    {
        public static void Initialize(ShopContext context){
            if(context.Products.Any()) return;
            var products = new List<Product>{
                new Product{
                    Name = "test name",
                    Description = "it`s a just a test for Description",
                    ImageUrl = "images/products/test1.png",
                    Brand = "test1",
                    Price = 20,
                    Type = "test",
                    QuantityInStock = 10
                },
                new Product{
                    Name = "test2 name",
                    Description = "it`s a just a test2 for Description",
                    ImageUrl = "images/products/test2.png",
                    Brand = "test2",
                    Price = 20,
                    Type = "test2",
                    QuantityInStock = 10
                }
            };
            foreach (var product in products)
            {
                context.Products.Add(product);
            }
            context.SaveChanges();
        }
    }
}