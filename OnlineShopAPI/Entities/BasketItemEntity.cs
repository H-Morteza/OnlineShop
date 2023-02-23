namespace OnlineShopAPI.Entities
{
    public class BasketItemEntity
    {
        public long Id { get; set; }
        public int Quantity { get; set; }
        public long ProductId { get; set; }
        public ProductEntiy Product { get; set; }
        public long BasketId { get; set; }
        public BasketEntity Basket { get; set; }
    }
}