using Shop.BLL.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Shop.BLL.Interfaces
{
    public interface IBookService
    {
        Task<IEnumerable<BookDto>> GetAllBooks();

        Task<IEnumerable<BookPreviewDto>> GetAllBooksPreviews();
    }
}
