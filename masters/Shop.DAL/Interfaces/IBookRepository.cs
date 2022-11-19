using MongoDB.Bson;
using Shop.DAL.Entities;
using Shop.DAL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Shop.DAL.Interfaces
{
    public interface IBookRepository
    {
        Task<IEnumerable<Book>> GetAllBooks();

        Task<IEnumerable<Book>> GetBooksPreviews(BookFilterModel filter);

        Task<BookPageInfoModel> GetBooksPageMetadata(BookFilterModel filter);

        Task<Book> GetBookById(ObjectId id);
    }
}
