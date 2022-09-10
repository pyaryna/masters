using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace Shop.DAL.Entities
{
    public class Rate
    {
        public ObjectId Id { get; set; }

        [BsonElement("bookId")]
        public ObjectId BookId { get; set; }

        [BsonElement("reviews")]
        public List<Review> Reviews { get; set; }
    }
}
