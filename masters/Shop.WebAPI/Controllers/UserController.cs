using Microsoft.AspNetCore.Mvc;
using Shop.BLL.Interfaces;
using System.Threading.Tasks;

namespace Shop.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetBookById()
        {
            var result = await _userService.GetBaseUsers();

            return Json(result);
        }
    }
}
