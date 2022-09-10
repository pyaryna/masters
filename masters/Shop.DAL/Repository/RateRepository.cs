using MongoDB.Bson;
using MongoDB.Driver;
using Shop.DAL.Entities;
using Shop.DAL.Interfaces;
using System.Linq;
using System.Threading.Tasks;

namespace Shop.DAL.Repository
{
    public class RateRepository : IRateRepository
    {
        private readonly ShopDBContext _shopDBContext;

        public RateRepository(ShopDBContext shopDBContext)
        {
            _shopDBContext = shopDBContext;
        }

        public async Task<Rate> GetRatesByBookId(ObjectId bookId)
        {
            return (await _shopDBContext.Rates
                .FindAsync(r => r.BookId == bookId))
                .FirstOrDefault();
        }
    }
}
