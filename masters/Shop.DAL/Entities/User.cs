using MongoDB.Bson.Serialization.Attributes;

namespace Shop.DAL.Entities
{
    public class User: BaseUser
    {
        [BsonElement("email")]
        public string Email { get; set; }

        [BsonElement("phone")]
        public string Phone { get; set; }

        [BsonElement("isActive")]
        public bool IsActive { get; set; }
    }
}
