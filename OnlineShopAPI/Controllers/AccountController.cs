using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OnlineShopAPI.DTOs.Request;
using OnlineShopAPI.Entities;

namespace OnlineShopAPI.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<User> _userManager;
        public AccountController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(LoginReuquestDto loginReuquest)
        {
            var user = await _userManager.FindByNameAsync(loginReuquest.UserName);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginReuquest.Password))
                return Unauthorized();
            return user;
        }
        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterReuquestDto registerReuquest)
        {
            User user = new()
            {
                Email = registerReuquest.Email,
                UserName = registerReuquest.UserName

            };
            var result = await _userManager.CreateAsync(user, registerReuquest.Password);
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }
                return ValidationProblem();
            }
            await _userManager.AddToRoleAsync(user, "Member");
            return StatusCode(201);
        }
    }
}
