using MongoDB.Bson;

namespace Shop.BLL.DTOs
{
    public class PublisherDto
    {
        public ObjectId Id { get; set; }

        public string Name { get; set; }
    }
}
