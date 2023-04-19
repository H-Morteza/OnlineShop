namespace OnlineShopAPI.DTOs.Response
{
    public class BasketItemResponseDto
    {
        public long Id { get; set; }
        public int Quantity { get; set; }
        public long ProductId { get; set; }
        public ProductResponseDto Product { get; set; }
        public long BasketId { get; set; }
    }
}