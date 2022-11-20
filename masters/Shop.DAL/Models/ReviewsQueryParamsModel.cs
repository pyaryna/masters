using MongoDB.Bson;

namespace Shop.DAL.Models
{
    public class ReviewsQueryParamsModel
    {
        public ObjectId BookId { get; set; }

        public int PageSize { get; set; }

        public int PageNumber { get; set; }
    }
}
