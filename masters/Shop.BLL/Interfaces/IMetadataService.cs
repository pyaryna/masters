using Shop.BLL.DTOs;
using System.Threading.Tasks;

namespace Shop.BLL.Interfaces
{
    public interface IMetadataService
    {
        Task<BookMetadataDto> GetBookMetadata();
    }
}
