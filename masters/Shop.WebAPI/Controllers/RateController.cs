using Microsoft.AspNetCore.Mvc;
using Shop.BLL.DTOs;
using Shop.BLL.Interfaces;
using System;
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
        public async Task<IActionResult> GetRateBookById(string id)
        {
            var result = await _rateService.GetRatesByBookId(id);

            return Json(result);
        }

        [HttpGet("reviews")]
        public async Task<IActionResult> GetREviewsBookById([FromQuery] ReviewsQueryParamsDto queryParams)
        {
            var result = await _rateService.GetReviewsByBookId(queryParams);

            return Json(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddReviewDto review)
        {
            try
            {
                await _rateService.AddReviewToBook(review);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
           
            return Ok();
        }
    }
}
