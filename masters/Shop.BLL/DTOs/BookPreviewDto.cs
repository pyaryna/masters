using System.Collections.Generic;

namespace Shop.BLL.DTOs
{
    public class BookPreviewDto
    {
        public string Id { get; set; }

        public string Title { get; set; }

        public AuthorDto Author { get; set; }

        public double Price { get; set; }

        public string ImageUrl { get; set; }

        public PublisherDto Publisher { get; set; }

        public List<GenreDto> Genres { get; set; }
    }
}
