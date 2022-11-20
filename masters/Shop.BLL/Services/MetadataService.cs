using AutoMapper;
using Shop.BLL.DTOs;
using Shop.BLL.Interfaces;
using Shop.DAL.Entities;
using Shop.DAL.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Shop.BLL.Services
{
    public class MetadataService : IMetadataService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public MetadataService(
            IUnitOfWork unitOfWork,
            IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<BookMetadataDto> GetBookMetadata()
        {
            var authors = _mapper.Map<IEnumerable<Author>, IEnumerable<AuthorDto>>(
                await _unitOfWork.AuthorRepository.GetAllAuthors());

            var publishers = _mapper.Map<IEnumerable<Publisher>, IEnumerable<PublisherDto>>(
                await _unitOfWork.PublisherRepository.GetAllPublishers());

            var genres = _mapper.Map<IEnumerable<Genre>, IEnumerable<GenreDto>>(
                await _unitOfWork.GenreRepository.GetAllGenres());

            var info = await _unitOfWork.BookRepository.GetBooksMetadata();

            var result = new BookMetadataDto
            {
                Authors = authors,
                Publishers = publishers,
                Genres = genres,
                MaxBookPrice = info.MaxBookPrice,
                MinBookPrice = info.MinBookPrice
            };

            return result;
        }
    }
}
