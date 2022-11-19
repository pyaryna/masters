using Shop.BLL.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Shop.BLL.Interfaces
{
    public interface IBookService
    {
        Task<IEnumerable<BookDto>> GetAllBooks();

        Task<BookPreviewPageDto> GetBooksPreviews(BookFilterDto filter);

        Task<BookDto> GetBookById(string id);
    }
}
