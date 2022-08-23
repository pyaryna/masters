using MongoDB.Bson;

namespace Shop.DAL.Entities
{
    public class Author
    {
        public ObjectId Id { get; set; }

        public string Name { get; set; }
    }
}
