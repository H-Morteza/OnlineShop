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
                productResult = productResult.Where(x => x.Name.ToLower().Contains(productReuquest.ProductName.ToLower()));
            if (productReuquest.ProductTypes is not null && productReuquest.ProductTypes.Count > 0)
                productResult = productResult.Where(x => productReuquest.ProductTypes.Contains(x.Type));
            if (productReuquest.ProductBrands is not null && productReuquest.ProductBrands.Count > 0)
                productResult = productResult.Where(x => productReuquest.ProductBrands.Contains(x.Brand));
            if (productReuquest.Filter.MaxPrice is not null && productReuquest.Filter.MaxPrice > 0)
                productResult = productResult.Where(x => x.Price <= productReuquest.Filter.MaxPrice);
            if (productReuquest.Filter.MinPrice is not null && productReuquest.Filter.MinPrice > 0)
                productResult = productResult.Where(x => x.Price >= productReuquest.Filter.MinPrice);
            if (productReuquest.Filter.WithDiscount is not null && (bool)productReuquest.Filter.WithDiscount)
                productResult = productResult.Where(x => x.DiscountPercent > 0);
            if (productReuquest.Filter.FilterType is not null && productReuquest.Filter.FilterType is DTOs.DataType.FilterType.Alphabetical)
                productResult = productResult.OrderBy(x => x.Name);
            if (productReuquest.Filter.FilterType is not null && productReuquest.Filter.FilterType is DTOs.DataType.FilterType.LowestPrice)
                productResult = productResult.OrderBy(x => x.Price);
            if (productReuquest.Filter.FilterType is not null && productReuquest.Filter.FilterType is DTOs.DataType.FilterType.HighestPrice)
                productResult = productResult.OrderByDescending(x => x.Price);

            int count = productReuquest.PageSize;
            int index = Math.Max(productReuquest.PageNumber - 1, 0);
            int productCount = await productResult.CountAsync();

            productResult = productResult.Skip(index * count).Take(count);
            MetaDataDto metaData = new()
            {
                CurrentPage = index + 1,
                PageSize = count,
                TotalCount = productCount,
                TotalPages = (int)Math.Ceiling(productCount / (double)count)
            };
            var productList = await productResult.ToListAsync();

            return (productList, metaData);

        }
    }
}


