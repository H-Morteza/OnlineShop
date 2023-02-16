using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShopAPI.Entities
{
    public class Product
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        /// <summary>
        /// We use long beacus we using from sqlite and sqlite does not recognize the decimal and it`s eseier
        /// total pric(price without discount)
        /// </summary>
        public long Price { get; set; }
        /// <summary>
        /// Payable price(price after discount)
        /// </summary>
        public long PayablePrice { get; set; }
        /// <summary>
        /// discount percent
        /// </summary>
        public int DiscountPercent { get; set; }
        /// <summary>
        /// product image
        /// </summary>
        public string ImageUrl { get; set; }
        /// <summary>
        /// product type
        /// </summary>
        public string Type { get; set; }
        /// <summary>
        /// product brand
        /// </summary>
        public string Brand { get; set; }
        /// <summary>
        /// number of goods in stock
        /// </summary>
        public int QuantityInStock { get; set; }
        /// <summary>
        /// product rate
        /// </summary>
        public double Rate { get; set; }
    }
}