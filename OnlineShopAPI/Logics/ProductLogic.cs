using Microsoft.EntityFrameworkCore;
using OnlineShopAPI.Data;
using OnlineShopAPI.DTOs.Request;
using OnlineShopAPI.Entities;

namespace OnlineShopAPI.Logics
{
    public class ProductLogic
    {
        private readonly ShopContext _context;
        public ProductLogic(ShopContext context)
        {
            _context = context;
        }

        public async Task<List<ProductEntiy>> GetProducts(ProductReuquestDto productReuquest)
        {
            var productResult = _context.Products.AsQueryable();
            if (productResult == null || !productResult.Any()) return null;

            if (!string.IsNullOrEmpty(productReuquest.ProductName))
                productResult = productResult.Where(x => x.Name.Contains(productReuquest.ProductName));
            if (!string.IsNullOrEmpty(productReuquest.ProductType))
                productResult = productResult.Where(x => x.Name.Contains(productReuquest.ProductType));
            if (!string.IsNullOrEmpty(productReuquest.ProductBrand))
                productResult = productResult.Where(x => x.Name.Contains(productReuquest.ProductBrand));
            if (productReuquest.Filter.MaxPrice is not null)
                productResult = productResult.Where(x => x.Price <= productReuquest.Filter.MaxPrice);
            if (productReuquest.Filter.MinPrice is not null)
                productResult = productResult.Where(x => x.Price >= productReuquest.Filter.MinPrice);
            if ((bool)productReuquest.Filter.WithDiscount)
                productResult = productResult.Where(x => x.DiscountPercent > 0);
            if (productReuquest.Filter.FiterType is DTOs.DataType.FiterType.LowestPrice)
                productResult = productResult.OrderBy(x => x.Price);
            if (productReuquest.Filter.FiterType is DTOs.DataType.FiterType.HighestPrice)
                productResult = productResult.OrderByDescending(x => x.Price);
            if (productReuquest.PageNumber is not null && productReuquest.PageCount is not null)
            {
                int count = (int)productReuquest.PageCount;
                int index = (int)productReuquest.PageNumber;
                productResult = productResult.Skip(index * count).Take(count);
            }

            return await productResult.ToListAsync();

        }
    }
}
