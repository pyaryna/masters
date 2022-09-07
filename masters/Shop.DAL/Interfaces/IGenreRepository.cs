using Shop.DAL.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Shop.DAL.Interfaces
{
    public interface IGenreRepository
    {
        Task<IEnumerable<Genre>> GetAllGenres();
    }
}
