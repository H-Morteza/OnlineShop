using OnlineShopAPI.Entities;

namespace OnlineShopAPI.Logics
{
    public class BasketLogic
    {
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
            if (item.Quantity == 0) basketItems.Remove(item);
        }
    }
}