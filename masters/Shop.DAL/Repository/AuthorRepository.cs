using MongoDB.Driver;
using Shop.DAL.Entities;
using Shop.DAL.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Shop.DAL.Repository
{
    public class AuthorRepository : IAuthorRepository
    {
        private readonly ShopDBContext _shopDBContext;

        public AuthorRepository(ShopDBContext shopDBContext)
        {
            _shopDBContext = shopDBContext;
        }

        public async Task<IEnumerable<Author>> GetAllAuthors()
        {
            return await _shopDBContext.Authors.Find(_ => true).ToListAsync();
        }
    }
}
