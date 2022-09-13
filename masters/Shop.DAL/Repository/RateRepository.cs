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

        public async Task AddReviewToBook(Review review, ObjectId bookId)
        {
            var update = Builders<Rate>.Update.Push("reviews", review);
            await _shopDBContext.Rates.UpdateOneAsync(r => r.BookId == bookId, update);
        }
    }
}
