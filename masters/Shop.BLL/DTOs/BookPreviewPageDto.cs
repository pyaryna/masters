using System.Collections.Generic;

namespace Shop.BLL.DTOs
{
    public class BookPreviewPageDto
    {
        public IEnumerable<BookPreviewDto> Books { get; set; }

        public BookPageInfoDto PageInfo { get; set; }
    }
}
