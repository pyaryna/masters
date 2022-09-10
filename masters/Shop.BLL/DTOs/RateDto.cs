using System.Collections.Generic;

namespace Shop.BLL.DTOs
{
    public class RateDto
    {
        public string Id { get; set; }

        public string BookId { get; set; }

        public List<ReviewDto> Reviews { get; set; }
    }
}
