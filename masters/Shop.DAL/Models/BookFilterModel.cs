using MongoDB.Bson;
using System.Collections.Generic;

namespace Shop.DAL.Models
{
    public class BookFilterModel
    {
        public List<ObjectId> AuthorIds { get; set; }

        public List<ObjectId> PublisherIds { get; set; }

        public List<ObjectId> GenreIds { get; set; }

        public double? PriceStart { get; set; }

        public double? PriceEnd { get; set; }

        public string SearchValue { get; set; }

        public bool? OrderByDesc { get; set; }

        public int PageSize { get; set; }

        public int PageNumber { get; set; }
    }
}
