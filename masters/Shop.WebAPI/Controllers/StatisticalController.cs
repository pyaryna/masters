using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Shop.BLL.DTOs;
using Shop.DAL.Configuration;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace Shop.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StatisticalController : Controller
    {
        private readonly HttpClient _client;

        public StatisticalController(IOptions<RecommendationUrls> urls)
        {
            _client = new HttpClient();
            _client.BaseAddress = new Uri(urls.Value.Statistical);
        }

        [HttpGet("user/{userId}/{number}")]
        public async Task<IActionResult> GetForUser([FromRoute] string userId, [FromRoute] int number)
        {
            List<SimilarBookPreviewDto> result;

            try
            {
                string responseBody = await _client.GetStringAsync($"user/{userId}/{number}");
                result = JsonConvert.DeserializeObject<List<SimilarBookPreviewDto>>(responseBody);
            }
            catch (HttpRequestException e)
            {
                return BadRequest(e.Message);
            }

            return Ok(result);
        }

        [HttpGet("book/{bookId}/{number}")]
        public async Task<IActionResult> GetByBook([FromRoute] string bookId, [FromRoute] int number)
        {
            List<SimilarBookPreviewDto> result;

            try
            {
                string responseBody = await _client.GetStringAsync($"book/{bookId}/{number}");
                result = JsonConvert.DeserializeObject<List<SimilarBookPreviewDto>>(responseBody);
            }
            catch (HttpRequestException e)
            {
                return BadRequest(e.Message);
            }

            return Ok(result);
        }
    }
}
