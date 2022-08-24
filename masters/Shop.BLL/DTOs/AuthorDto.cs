using MongoDB.Bson;

namespace Shop.BLL.DTOs
{
    public class AuthorDto
    {
        public ObjectId Id { get; set; }

        public string Name { get; set; }
    }
}
