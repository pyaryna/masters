using Microsoft.AspNetCore.Mvc;
using Shop.BLL.DTOs;
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
        public async Task<IActionResult> GetBooksPreview([FromQuery] BookFilterDto filter)
        {
            var result = await _bookService.GetBooksPreviews(filter);

            return Json(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBookById(string id)
        {
            var result = await _bookService.GetBookById(id);

            return Json(result);
        }
    }
}
