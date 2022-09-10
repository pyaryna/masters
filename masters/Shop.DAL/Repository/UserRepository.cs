using MongoDB.Driver;
using Shop.DAL.Entities;
using Shop.DAL.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Shop.DAL.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly ShopDBContext _shopDBContext;

        public UserRepository(ShopDBContext shopDBContext)
        {
            _shopDBContext = shopDBContext;
        }

        public async Task<IEnumerable<BaseUser>> GetBaseUsers()
        {
            return await _shopDBContext.Users.Find(_ => true)
                .Limit(10)
                .ToListAsync();
        }
    }
}
