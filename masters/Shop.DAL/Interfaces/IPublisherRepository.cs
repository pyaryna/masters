using Shop.DAL.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Shop.DAL.Interfaces
{
    public interface IPublisherRepository
    {
        Task<IEnumerable<Publisher>> GetAllPublishers();
    }
}
