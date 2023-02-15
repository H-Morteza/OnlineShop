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
        /// we use long beacus we using from sqlite and sqlite dont recgnise decimal and it`s eseier
        /// </summary>
        public long Price { get; set; }
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
    }
}