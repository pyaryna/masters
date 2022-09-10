using AutoMapper;
using MongoDB.Bson;
using Shop.BLL.DTOs;
using Shop.BLL.Interfaces;
using Shop.DAL.Entities;
using Shop.DAL.Interfaces;
using System;
using System.Threading.Tasks;

namespace Shop.BLL.Services
{
    public class RateService : IRateService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public RateService(
            IUnitOfWork unitOfWork,
            IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<RateDto> GetRatesByBookId(string bookId)
        {
            ObjectId id;
            var successParsed = ObjectId.TryParse(bookId, out id);

            if (!successParsed)
            {
                throw new Exception("Cannot parse book id");
            }

            var rate = await _unitOfWork.RateRepository.GetRatesByBookId(id);

            return _mapper.Map<Rate, RateDto>(rate);
        }
    }
}
