using MongoDB.Driver;
using Shop.DAL.Entities;
using Shop.DAL.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Shop.DAL.Repository
{
    public class PublisherRepository : IPublisherRepository
    {
        private readonly ShopDBContext _shopDBContext;

        public PublisherRepository(ShopDBContext shopDBContext)
        {
            _shopDBContext = shopDBContext;
        }

        public async Task<IEnumerable<Publisher>> GetAllPublishers()
        {
            return (await _shopDBContext.Publishers.FindAsync(_ => true)).ToList();
        }
    }
}
