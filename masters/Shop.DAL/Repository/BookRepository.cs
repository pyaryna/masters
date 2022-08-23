using MongoDB.Driver;
using Shop.DAL.Entities;
using Shop.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
            return await _shopDBContext.Books.Find(_ => true).ToListAsync();
        }
    }
}
