using AutoMapper;
using Shop.BLL.DTOs;
using Shop.BLL.Interfaces;
using Shop.DAL.Entities;
using Shop.DAL.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Shop.BLL.Services
{
    public class GenreService : IGenreService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GenreService(
            IUnitOfWork unitOfWork,
            IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IEnumerable<GenreDto>> GetAllGenres()
        {
            var genres = await _unitOfWork.GenreRepository.GetAllGenres();

            return _mapper.Map<IEnumerable<Genre>, IEnumerable<GenreDto>>(genres);
        }
    }
}
