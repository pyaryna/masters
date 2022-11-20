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

        Task<BooksMetadataModel> GetBooksPageMetadata(BookFilterModel filter);

        Task<BooksMetadataModel> GetBooksMetadata();

        Task<Book> GetBookById(ObjectId id);
    }
}
