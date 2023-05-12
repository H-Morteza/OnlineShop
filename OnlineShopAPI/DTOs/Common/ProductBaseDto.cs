namespace OnlineShopAPI.DTOs.Common
{
    public class ProductBaseDto
    {
        public FilterDto Filter { get; set; }
        public List<string> ProductTypes { get; set; }
        public List<string> ProductBrands { get; set; }
    }
}
