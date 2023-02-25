using Microsoft.EntityFrameworkCore;
using OnlineShopAPI.Data;
using OnlineShopAPI.Entities;

namespace OnlineShopAPI.Logics
{
    public class BasketLogic
    {
        private readonly ShopContext _context;
        private readonly HttpContext _httpContext;
        public BasketLogic(ShopContext context, HttpContext httpContext)
        {
            _context = context;
            _httpContext = httpContext;
        }

        public void AddItem(List<BasketItemEntity> basketItems, ProductEntiy product, int quantity)
        {
            if (basketItems.All(item => item.ProductId != product.Id))
            {
                basketItems.Add(new()
                {
                    Product = product,
                    Quantity = quantity,
                    ProductId = product.Id
                });
            }
            else
            {
                var existingItem = basketItems.FirstOrDefault(item => item.ProductId == product.Id);
                if (existingItem != null) existingItem.Quantity += quantity;
            }
        }
        public void RemoveItem(List<BasketItemEntity> basketItems, long productId, int quantity)
        {
            var item = basketItems.FirstOrDefault(item => item.ProductId == productId);
            if (item == null) return;
            item.Quantity -= quantity;
            if (item.Quantity <= 0) basketItems.Remove(item);
        }

        public async Task<BasketEntity> RetrieveBasket()
        {
            return await _context.Baskets
                           .Include(i => i.Items)
                           .ThenInclude(p => p.Product)
                           .FirstOrDefaultAsync(x => x.BuyerId == _httpContext.Request.Cookies["buyerId"]);
        }
        public BasketEntity CreatBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.Now.AddDays(30)
            };
            _httpContext.Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            var basket = new BasketEntity
            {
                BuyerId = buyerId,
            };
            _context.Baskets.Add(basket);
            return basket;
        }
    }
}