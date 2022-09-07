using Shop.DAL.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Shop.DAL.Interfaces
{
    public interface IAuthorRepository
    {
        Task<IEnumerable<Author>> GetAllAuthors();
    }
}
