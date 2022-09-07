using AutoMapper;
using Shop.BLL.DTOs;
using Shop.BLL.Interfaces;
using Shop.DAL.Entities;
using Shop.DAL.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Shop.BLL.Services
{
    class PublisherService : IPublisherService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public PublisherService(
            IUnitOfWork unitOfWork,
            IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IEnumerable<PublisherDto>> GetAllPublishers()
        {
            var publishers = await _unitOfWork.PublisherRepository.GetAllPublishers();

            return _mapper.Map<IEnumerable<Publisher>, IEnumerable<PublisherDto>>(publishers);
        }
    }
}
