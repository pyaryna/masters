using MongoDB.Bson;
using Shop.DAL.Entities;
using System.Threading.Tasks;

namespace Shop.DAL.Interfaces
{
    public interface IRateRepository
    {
        Task<Rate> GetRatesByBookId(ObjectId id);

        Task AddReviewToBook(Review review, ObjectId bookId);
    }
}
