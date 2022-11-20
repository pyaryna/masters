using System.Collections.Generic;

namespace Shop.BLL.DTOs
{
    public class BookMetadataDto
    {
        public IEnumerable<AuthorDto> Authors { get; set; }

        public IEnumerable<PublisherDto> Publishers { get; set; }

        public IEnumerable<GenreDto> Genres { get; set; }

        public double MaxBookPrice { get; set; }

        public double MinBookPrice { get; set; }
    }
}
