namespace Shop.BLL.DTOs
{
    public class ReviewsQueryParamsDto
    {
        public string BookId { get; set; }

        public int PageSize { get; set; }

        public int PageNumber { get; set; }
    }
}
