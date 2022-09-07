using Microsoft.AspNetCore.Mvc;
using Shop.BLL.Interfaces;
using System.Threading.Tasks;

namespace Shop.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookController : Controller
    {
        private readonly IBookService _bookService;

        public BookController(IBookService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBooks()
        {
            var result = await _bookService.GetAllBooks();

            return Json(result);
        }

        [HttpGet("previews")]
        public async Task<IActionResult> GetAllBooksPreview()
        {
            var result = await _bookService.GetAllBooksPreviews();

            return Json(result);
        }
    }
}
