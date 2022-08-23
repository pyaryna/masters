using Microsoft.AspNetCore.Mvc;
using Shop.BLL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
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

        [HttpGet("books")]
        public async Task<IActionResult> GetMetadata()
        {
            var result = await _bookService.GetAllBooks();

            return Json(result);
        }
    }
}
