using OnlineShopAPI.Data;
using OnlineShopAPI.Entities;

namespace OnlineShopAPI.Logics
{
    public class ProductLogic
    {
        private readonly ShopContext _context;
        private readonly HttpContext _httpContext;
        public ProductLogic(ShopContext context, HttpContext httpContext)
        {
            _context = context;
            _httpContext = httpContext;
        }

        public List<ProductEntiy> GetProducts()
        {
            var productResult = _context.Products.ToList();
            if (productResult == null) return null;

            return productResult;
            //return productResult.Select(product => _mapper.Map<ProductDto>(product)).ToList();
        }
    }
}
