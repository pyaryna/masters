using Microsoft.AspNetCore.Mvc;
using Shop.BLL.Interfaces;
using System.Threading.Tasks;

namespace Shop.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RateController : Controller
    {
        private readonly IRateService _rateService;

        public RateController(IRateService rateService)
        {
            _rateService = rateService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBookById(string id)
        {
            var result = await _rateService.GetRatesByBookId(id);

            return Json(result);
        }
    }
}
