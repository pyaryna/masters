using MongoDB.Bson;
using Shop.DAL.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Shop.DAL.Interfaces
{
    public interface IBookRepository
    {
        Task<IEnumerable<Book>> GetAllBooks();

        Task<IEnumerable<Book>> GetAllBooksPreviews();

        Task<Book> GetBookById(ObjectId id);
    }
}
