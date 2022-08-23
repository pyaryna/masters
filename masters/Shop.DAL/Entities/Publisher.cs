using MongoDB.Bson;

namespace Shop.DAL.Entities
{
    public class Publisher
    {
        public ObjectId Id { get; set; }

        public string Name { get; set; }
    }
}
