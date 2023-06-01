using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OnlineShopAPI.DTOs.Request;
using OnlineShopAPI.DTOs.Response;
using OnlineShopAPI.Entities;
using OnlineShopAPI.Services;

namespace OnlineShopAPI.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;

        public AccountController(UserManager<User> userManager, TokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserResponseDto>> Login(LoginReuquestDto loginReuquest)
        {
            var user = await _userManager.FindByNameAsync(loginReuquest.UserName);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginReuquest.Password))
                return Unauthorized();
            return new UserResponseDto()
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
            };
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

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserResponseDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            //if (user == null || !await _userManager.CheckPasswordAsync(user, loginReuquest.Password))
            //    return Unauthorized();
            return new UserResponseDto()
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
            };
        }
    }
}
