using MongoDB.Driver;
using Shop.DAL.Entities;
using Shop.DAL.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Shop.DAL.Repository
{
    public class GenreRepository : IGenreRepository
    {
        private readonly ShopDBContext _shopDBContext;

        public GenreRepository(ShopDBContext shopDBContext)
        {
            _shopDBContext = shopDBContext;
        }

        public async Task<IEnumerable<Genre>> GetAllGenres()
        {
            return (await _shopDBContext.Genres.FindAsync(_ => true)).ToList();
        }
    }
}
