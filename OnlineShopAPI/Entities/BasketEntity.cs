using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShopAPI.Entities
{
    public class BasketEntity
    {
        public long Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItemEntity> Items { get; set; } = new();
        public string PaymentIntentId { get; set; }
        public string ClientSecret { get; set; }
    }
}