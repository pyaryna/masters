using MongoDB.Bson.Serialization.Attributes;
using System;

namespace Shop.DAL.Entities
{
    public class Review
    {
        [BsonElement("user")]
        public BaseUser User { get; set; }

        [BsonElement("rate")]
        public double Rate { get; set; }

        [BsonElement("comment")]
        public string Comment { get; set; }

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; }
    }
}
