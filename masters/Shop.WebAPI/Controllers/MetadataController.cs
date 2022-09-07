using Microsoft.AspNetCore.Mvc;
using Shop.BLL.Interfaces;
using System.Threading.Tasks;

namespace Shop.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MetadataController : Controller
    {
        private readonly IMetadataService _metadataService;

        public MetadataController(IMetadataService metadataService)
        {
            _metadataService = metadataService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBooks()
        {
            var result = await _metadataService.GetBookMetadata();

            return Json(result);
        }
    }
}
