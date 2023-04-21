using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineShopAPI.Data;
using OnlineShopAPI.DTOs.Request;
using OnlineShopAPI.DTOs.Response;
using OnlineShopAPI.Logics;

namespace OnlineShopAPI.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly ShopContext _context;
        private readonly IMapper _mapper;
        public ProductsController(ShopContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpPost]
        public async Task<ActionResult<List<ProductResponseDto>>> GetProducts(ProductReuquestDto productReuquest)
        {
            //ProductReuquestDto product = new();
            
            var productLogic = await new ProductLogic(_context).GetProducts(productReuquest);
            if(productLogic == null) return NotFound();
            return productLogic.Select(product => _mapper.Map<ProductResponseDto>(product)).ToList();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductResponseDto>> GetProduct(long id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);
            if (product == null) return NotFound();
            return _mapper.Map<ProductResponseDto>(product);
        }
    }
}