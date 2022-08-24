﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Shop.DAL.Entities
{
    public class Author
    {
        public ObjectId Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }
    }
}
