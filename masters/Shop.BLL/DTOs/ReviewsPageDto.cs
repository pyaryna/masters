using System.Collections.Generic;

namespace Shop.BLL.DTOs
{
    public class ReviewsPageDto
    {
        public List<ReviewDto> Reviews { get; set; }

        public int TotalReviewsNumber { get; set; }
    }
}
