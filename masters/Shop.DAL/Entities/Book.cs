using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace Shop.DAL.Entities
{
    [BsonIgnoreExtraElements]
    public class Book
    {
        public ObjectId Id { get; set; }
        
        [BsonElement("title")]
        public string Title { get; set; }

        [BsonElement("author")]
        public Author Author { get; set; }

        [BsonElement("publisher")]
        public Publisher Publisher { get; set; }

        [BsonElement("price")]
        public double Price { get; set; }

        [BsonElement("description")]
        public string Description { get; set; }

        [BsonElement("genres")]
        public List<Genre> Genres { get; set; }

        [BsonElement("language")]
        public string Language { get; set; }

        [BsonElement("pageCount")]
        public int PageCount { get; set; }

        public string ISBN { get; set; }

        [BsonElement("publishedDate")]
        public DateTime PublishedDate { get; set; }

        [BsonElement("imageUrl")]
        public string ImageUrl { get; set; }
    }
}
