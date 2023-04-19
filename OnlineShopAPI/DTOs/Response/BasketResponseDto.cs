namespace OnlineShopAPI.DTOs.Response
{
    public class BasketResponseDto
    {
        public long Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItemResponseDto> Items { get; set; }
        public string PaymentIntentId { get; set; }
        public string ClientSecret { get; set; }
    }
}