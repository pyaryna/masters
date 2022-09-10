using System;

namespace Shop.BLL.DTOs
{
    public class ReviewDto
    {
        public BaseUserDto User { get; set; }

        public double Rate { get; set; }

        public string Comment { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
