using MongoDB.Bson;
using MongoDB.Driver;
using Shop.DAL.Entities;
using Shop.DAL.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Shop.DAL.Repository
{
    public class BookRepository : IBookRepository
    {
        private readonly ShopDBContext _shopDBContext;

        public BookRepository(ShopDBContext shopDBContext)
        {
            _shopDBContext = shopDBContext;
        }

        public async Task<IEnumerable<Book>> GetAllBooks()
        {
            return (await _shopDBContext.Books.FindAsync(_ => true)).ToList();
        }

        public async Task<IEnumerable<Book>> GetAllBooksPreviews()
        {
            return await _shopDBContext.Books.Find(_ => true)
                .Project<Book>(Builders<Book>.Projection.Include(b => b.Id)
                    .Include(b => b.Title)
                    .Include(b => b.Author)
                    .Include(b => b.Price)
                    .Include(b => b.ImageUrl)).ToListAsync();
        }

        public async Task<Book> GetBookById(ObjectId id)
        {
            return (await _shopDBContext.Books
                .FindAsync(b => b.Id == id))
                .FirstOrDefault();
        }
    }
}
