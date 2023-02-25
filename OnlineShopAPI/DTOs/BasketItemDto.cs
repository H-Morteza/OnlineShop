namespace OnlineShopAPI.DTOs
{
    public class BasketItemDto
    {
        public long Id { get; set; }
        public int Quantity { get; set; }
        public long ProductId { get; set; }
        public ProductDto Product { get; set; }
        public long BasketId { get; set; }
    }
}