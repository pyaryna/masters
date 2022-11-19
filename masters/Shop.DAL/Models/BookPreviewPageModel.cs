using Shop.DAL.Entities;
using System.Collections.Generic;

namespace Shop.DAL.Models
{
    public class BookPreviewPageModel
    {
        public IEnumerable<Book> Books { get; set; }

        public BookPageInfoModel PageInfo { get; set; }
    }
}
