using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineShopAPI.Data;
using OnlineShopAPI.DTOs.Response;

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
        [HttpGet]
        public async Task<ActionResult<List<ProductResponseDto>>> GetProducts()
        {
            var productResult = await _context.Products.ToListAsync();
            if (productResult == null) return NotFound();
            return productResult.Select(product => _mapper.Map<ProductResponseDto>(product)).ToList();
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