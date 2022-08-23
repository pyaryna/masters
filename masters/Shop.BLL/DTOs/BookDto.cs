using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.BLL.DTOs
{
    public class BookDto
    {
        public ObjectId Id { get; set; }

        public string Title { get; set; }

        //public Author Author { get; set; }

        //public Publisher Publisher { get; set; }

        public double Price { get; set; }

        public string Description { get; set; }

        public List<string> Generes { get; set; }

        public string Language { get; set; }

        public int PageCount { get; set; }

        public string ISBN { get; set; }

        public DateTime PublishedDate { get; set; }

        public string ImageUrl { get; set; }
    }
}
