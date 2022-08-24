using MongoDB.Bson;

namespace Shop.BLL.DTOs
{
    public class GenreDto
    {
        public ObjectId Id { get; set; }

        public string Name { get; set; }
    }
}
