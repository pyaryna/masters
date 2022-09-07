using AutoMapper;
using Shop.BLL.DTOs;
using Shop.BLL.Interfaces;
using Shop.DAL.Entities;
using Shop.DAL.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Shop.BLL.Services
{
    public class AuthorService : IAuthorService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public AuthorService(
            IUnitOfWork unitOfWork,
            IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IEnumerable<AuthorDto>> GetAllAuthors()
        {
            var authors = await _unitOfWork.AuthorRepository.GetAllAuthors();

            return _mapper.Map<IEnumerable<Author>, IEnumerable<AuthorDto>>(authors);
        }
    }
}
