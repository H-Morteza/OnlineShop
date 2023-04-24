using Microsoft.EntityFrameworkCore;
using OnlineShopAPI.Data;
using OnlineShopAPI.DTOs.Common;
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

        public async Task<(List<ProductEntiy> product, MetaDataDto metaData)> GetProducts(ProductReuquestDto productReuquest)
        {
            var productResult = _context.Products.AsQueryable();
            if (productResult == null || !productResult.Any()) return (null, null);

            if (!string.IsNullOrEmpty(productReuquest.ProductName))
                productResult = productResult.Where(x => x.Name.Contains(productReuquest.ProductName));
            if (!string.IsNullOrEmpty(productReuquest.ProductType))
                productResult = productResult.Where(x => x.Name.Contains(productReuquest.ProductType));
            if (!string.IsNullOrEmpty(productReuquest.ProductBrand))
                productResult = productResult.Where(x => x.Name.Contains(productReuquest.ProductBrand));
            if (productReuquest.Filter.MaxPrice is not null && productReuquest.Filter.MaxPrice > 0)
                productResult = productResult.Where(x => x.Price <= productReuquest.Filter.MaxPrice);
            if (productReuquest.Filter.MinPrice is not null && productReuquest.Filter.MinPrice > 0)
                productResult = productResult.Where(x => x.Price >= productReuquest.Filter.MinPrice);
            if ((bool)productReuquest.Filter.WithDiscount)
                productResult = productResult.Where(x => x.DiscountPercent > 0);
            if (productReuquest.Filter.FiterType is DTOs.DataType.FiterType.LowestPrice)
                productResult = productResult.OrderBy(x => x.Price);
            if (productReuquest.Filter.FiterType is DTOs.DataType.FiterType.HighestPrice)
                productResult = productResult.OrderByDescending(x => x.Price);

            int count = productReuquest.PageSize > 0 ? productReuquest.PageSize : 8;
            int index = productReuquest.PageNumber > 0 ? productReuquest.PageNumber - 1 : 0;
            int productCount = productResult.Count();

            productResult = productResult.Skip(index * count).Take(count);
            MetaDataDto metaDate = new()
            {
                CurrentPage = index + 1,
                PageSize = count,
                TotalCount = productCount,
                TotalPages = (int)Math.Ceiling(productCount / (double)count)
            };
            var productList = await productResult.ToListAsync();

            return (productList, metaDate);

        }
    }
}
