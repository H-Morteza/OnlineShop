﻿using OnlineShopAPI.DTOs.Common;

namespace OnlineShopAPI.DTOs.Request
{
    public class ProductReuquestDto : ProductBaseDto
    {
        private int MaxPageCount { get; set; } = 50;
        public int PageNumber { get; set; } = 1;
        private int _pgeCount { get; set; } = 6;
        public int PageSize
        {
            get => _pgeCount;
            set => _pgeCount = value > MaxPageCount ? MaxPageCount : value;
        }
        public string ProductName { get; set; }

    }
}
