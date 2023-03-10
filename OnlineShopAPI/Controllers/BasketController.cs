using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using OnlineShopAPI.Data;
using OnlineShopAPI.DTOs;
using OnlineShopAPI.Entities;
using OnlineShopAPI.Logics;

namespace OnlineShopAPI.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly ShopContext _context;
        private readonly IMapper _mapper;
        public BasketController(ShopContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            BasketEntity basket = await GetOrSetBasket();
            if (basket == null) return NotFound();
            var basketDto = _mapper.Map<BasketDto>(basket);
            return basketDto;
        }

        private async Task<BasketEntity> GetOrSetBasket()
        {
            var basketItem = new BasketLogic(_context, HttpContext);
            var basket = await basketItem.RetrieveBasket();
            return basket;
        }

        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(long productId, int quantity)
        {
            var basketItem = new BasketLogic(_context, HttpContext);

            var basket = await basketItem.RetrieveBasket();
            if (basket == null) basket = basketItem.CreatBasket();
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return NotFound();

            basketItem.AddItem(basket.Items, product, quantity);
            var result = await _context.SaveChangesAsync();
            if (result > 0) return CreatedAtRoute("GetBasket", _mapper.Map<BasketDto>(basket));
            return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveItemFromBasket(long productId, int quantity)
        {
            var basketItem = new BasketLogic(_context, HttpContext);
            var basket = await basketItem.RetrieveBasket();
            if (basket == null) return NotFound();
            basketItem.RemoveItem(basket.Items, productId, quantity);
            var result = await _context.SaveChangesAsync();
            if (result > 0) return Ok();
            return BadRequest(new ProblemDetails { Title = "Problem saving remove item from basket" });
        }
    }
}