﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Shop.DAL.Entities
{
    public class Genre
    {
        public ObjectId Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }
    }
}
