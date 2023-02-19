using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineShopAPI.Data;
using OnlineShopAPI.Entities;

namespace OnlineShopAPI.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly ShopContext _context;

        public ProductsController(ShopContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts(){
            var product = await _context.Products.ToListAsync();
            if (product == null) return NotFound();
            return product;
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProducts(long id){
            return await _context.Products.FirstOrDefaultAsync(x=>x.Id == id);
        }
    }
}