using Shop.BLL.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.BLL.Interfaces
{
    public interface IBookService
    {
        Task<IEnumerable<BookDto>> GetAllBooks();
    }
}
