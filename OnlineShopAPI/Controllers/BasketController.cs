using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using OnlineShopAPI.Data;
using OnlineShopAPI.DTOs.Response;
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
        public async Task<ActionResult<BasketResponseDto>> GetBasket()
        {
            var (basketEntity, _) = await GetOrSetBasket();
            if (basketEntity == null) return NotFound();
            var basketDto = _mapper.Map<BasketResponseDto>(basketEntity);
            return basketDto;
        }

        private async Task<(BasketEntity basketEntity, BasketLogic basketLogic)> GetOrSetBasket()
        {
            var basketItem = new BasketLogic(_context, HttpContext);
            var basket = await basketItem.RetrieveBasket(GetBuyerId());
            return (basket, basketItem);
        }

        [HttpPost]
        public async Task<ActionResult<BasketResponseDto>> AddItemToBasket(long productId, int quantity)
        {
            var (basketEntity, basketLogic) = await GetOrSetBasket();
            if (basketEntity == null) basketEntity = basketLogic.CreatBasket(User.Identity?.Name);
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return BadRequest(new ProblemDetails { Title = "Product not found" });

            basketLogic.AddItem(basketEntity.Items, product, quantity);
            var result = await _context.SaveChangesAsync();
            if (result > 0) return CreatedAtRoute("GetBasket", _mapper.Map<BasketResponseDto>(basketEntity));
            return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveItemFromBasket(long productId, int quantity)
        {
            var (basketEntity, basketLogic) = await GetOrSetBasket();
            if (basketEntity == null) return NotFound();
            basketLogic.RemoveItem(basketEntity.Items, productId, quantity);
            var result = await _context.SaveChangesAsync();
            if (result > 0) return Ok();
            return BadRequest(new ProblemDetails { Title = "Problem saving remove item from basket" });
        }
        private string GetBuyerId()
        {
            return User.Identity?.Name ?? Request.Cookies["buyerId"];
        }
    }
}