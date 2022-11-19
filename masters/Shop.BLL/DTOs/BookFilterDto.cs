using System.Collections.Generic;

namespace Shop.BLL.DTOs
{
    public class BookFilterDto
    {
        public List<string> AuthorIds { get; set; }

        public List<string> PublisherIds { get; set; }

        public List<string> GenreIds { get; set; }

        public double? PriceStart { get; set; }

        public double? PriceEnd { get; set; }

        public string SearchValue { get; set; }

        public bool? OrderByDesc { get; set; }

        public int PageSize { get; set; }

        public int PageNumber { get; set; }
    }
}
