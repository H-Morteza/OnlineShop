using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineShopAPI.Data;
using OnlineShopAPI.DTOs;
using OnlineShopAPI.Entities;
using OnlineShopAPI.Logics;

namespace OnlineShopAPI.Controllers
{
    public class BasketCotroller : BaseApiController
    {
        private readonly ShopContext _context;
        private readonly IMapper _mapper;
        public BasketCotroller(ShopContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket();
            if (basket == null) return NotFound();

            var basketDto = _mapper.Map<BasketDto>(basket);
            return basketDto;
        }

        private async Task<BasketEntity> RetrieveBasket()
        {
            return await _context.Baskets
                           .Include(i => i.Items)
                           .ThenInclude(p => p.Product)
                           .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }

        [HttpPost]
        public async Task<ActionResult> AddItemToBaske(long productId, int quantity)
        {
            var basket = await RetrieveBasket();
            if (basket == null) basket = CreatBasket();
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return NotFound();
            var basketItem = new BasketLogic();
            basketItem.AddItem(basket.Items, product, quantity);
            var result = await _context.SaveChangesAsync();
            if (result > 0) return StatusCode(201);
            return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
        }

        private BasketEntity CreatBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.Now.AddDays(30)
            };
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            var basket = new BasketEntity
            {
                BuyerId = buyerId,
            };
            _context.Baskets.Add(basket);
            return basket;
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveItemFromBaske(long productId, int quantity)
        {
            var basket = await RetrieveBasket();

            if (basket == null) return NotFound();
            var basketItem = new BasketLogic();
            basketItem.RemoveItem(basket.Items, productId, quantity);
            var result = await _context.SaveChangesAsync();
            if (result > 0) return StatusCode(201);
            return BadRequest(new ProblemDetails { Title = "Problem saving remove item to basket" });
        }
    }
}