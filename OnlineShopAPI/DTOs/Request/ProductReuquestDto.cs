using OnlineShopAPI.DTOs.Common;

namespace OnlineShopAPI.DTOs.Request
{
    public class ProductReuquestDto
    {
        private int MaxPageCount { get; set; } = 50;
        public int PageNumber { get; set; } = 0;
        public int _pgeCount { get; set; } = 10;
        public int PageSize
        {
            get => _pgeCount;
            set => _pgeCount = value > MaxPageCount ? MaxPageCount : value;
        }
        public string ProductName { get; set; }
        public string ProductType { get; set; }
        public string ProductBrand { get; set; }
        public FilterDto Filter { get; set; }

    }
}
