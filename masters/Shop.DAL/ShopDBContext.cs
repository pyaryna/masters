using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Shop.DAL.Configuration;
using Shop.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.DAL
{
    public class ShopDBContext
    {
        public IMongoDatabase _mongoDatabase;

        public ShopDBContext(IMongoClient mongoClient, IOptions<DbSettings> options)
        {
            _mongoDatabase = mongoClient.GetDatabase(options.Value.DatabaseName);
            Books = _mongoDatabase.GetCollection<Book>(CollectionNames.Books);
        }

        public virtual IMongoCollection<Book> Books { get; set; }
    }
}
