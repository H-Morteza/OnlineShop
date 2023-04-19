using OnlineShopAPI.DTOs.DataType;

namespace OnlineShopAPI.DTOs.Common
{
    public class FilterDto
    {
        public decimal MaxPrice { get; set; }
        public decimal MinPrice { get; set; }
        public FiterType FiterType { get; set; }
    }
}
