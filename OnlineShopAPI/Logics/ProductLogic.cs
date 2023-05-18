using Microsoft.EntityFrameworkCore;
using OnlineShopAPI.Data;
using OnlineShopAPI.DTOs.Common;
using OnlineShopAPI.DTOs.Request;
using OnlineShopAPI.Entities;
using System.Linq.Expressions;

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

            if (!string.IsNullOrEmpty(productReuquest.ProductName))
                productResult = productResult.Where(x => x.Name.ToLower().Contains(productReuquest.ProductName.ToLower()));
            if (productReuquest.ProductTypes?.Count > 0)
                productResult = productResult.Where(x => productReuquest.ProductTypes.Contains(x.Type));
            if (productReuquest.ProductBrands?.Count > 0)
                productResult = productResult.Where(x => productReuquest.ProductBrands.Contains(x.Brand));
            if (productReuquest.Filter.MaxPrice is not null && productReuquest.Filter.MaxPrice > 0)
                productResult = productResult.Where(x => x.Price <= productReuquest.Filter.MaxPrice);
            if (productReuquest.Filter.MinPrice is not null && productReuquest.Filter.MinPrice > 0)
                productResult = productResult.Where(x => x.Price >= productReuquest.Filter.MinPrice);
            if (productReuquest.Filter.WithDiscount is not null && (bool)productReuquest.Filter.WithDiscount)
                productResult = productResult.Where(x => x.DiscountPercent > 0);

            Expression<Func<ProductEntiy, object>> orderByExpression = x => x.Name;
            switch (productReuquest.Filter.FilterType)
            {
                case DTOs.DataType.FilterType.Alphabetical:
                    orderByExpression = x => x.Name;
                    productResult = productResult.OrderBy(orderByExpression);
                    break;
                case DTOs.DataType.FilterType.LowestPrice:
                    orderByExpression = x => x.Price;
                    productResult = productResult.OrderBy(orderByExpression);
                    break;
                case DTOs.DataType.FilterType.HighestPrice:
                    orderByExpression = x => x.Price;
                    productResult = productResult.OrderByDescending(orderByExpression);
                    break;
            }
            //if (productReuquest.Filter.FilterType != DTOs.DataType.FilterType.HighestPrice)
            //    productResult = productResult.OrderBy(orderByExpression);

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