using Shop.BLL.DTOs;
using System.Threading.Tasks;

namespace Shop.BLL.Interfaces
{
    public interface IRateService
    {
        Task<RateDto> GetRatesByBookId(string bookId);

        Task<ReviewsPageDto> GetReviewsByBookId(ReviewsQueryParamsDto queryParams);

        Task AddReviewToBook(AddReviewDto review);
    }
}
