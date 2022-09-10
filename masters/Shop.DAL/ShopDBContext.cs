using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Shop.DAL.Configuration;
using Shop.DAL.Entities;

namespace Shop.DAL
{
    public class ShopDBContext
    {
        public IMongoDatabase _mongoDatabase;

        public ShopDBContext(IMongoClient mongoClient, IOptions<DbSettings> options)
        {
            _mongoDatabase = mongoClient.GetDatabase(options.Value.DatabaseName);
            Books = _mongoDatabase.GetCollection<Book>(CollectionNames.Books);
            Authors = _mongoDatabase.GetCollection<Author>(CollectionNames.Authors);
            Publishers = _mongoDatabase.GetCollection<Publisher>(CollectionNames.Publishers);
            Genres = _mongoDatabase.GetCollection<Genre>(CollectionNames.Genres);
            Rates = _mongoDatabase.GetCollection<Rate>(CollectionNames.Rates);
        }

        public virtual IMongoCollection<Book> Books { get; set; }
        public virtual IMongoCollection<Author> Authors { get; set; }
        public virtual IMongoCollection<Publisher> Publishers { get; set; }
        public virtual IMongoCollection<Genre> Genres { get; set; }
        public virtual IMongoCollection<Rate> Rates { get; set; }
    }
}
