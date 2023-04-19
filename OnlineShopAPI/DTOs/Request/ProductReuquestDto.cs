using OnlineShopAPI.DTOs.Common;

namespace OnlineShopAPI.DTOs.Request
{
    public class ProductReuquestDto
    {
        public int? Index { get; set; }
        public int? Count { get; set; }
        public string ProductName { get; set; }
        public string ProductType { get; set; }
        public string ProductBrand { get; set; }
        public FilterDto Filter { get; set; }

    }
}
