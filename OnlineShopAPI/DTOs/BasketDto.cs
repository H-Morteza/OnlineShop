namespace OnlineShopAPI.DTOs
{
    public class BasketDto
    {
        public long Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItemDto> Items { get; set; }
        public string PaymentIntentId { get; set; }
        public string ClientSecret { get; set; }
    }
}