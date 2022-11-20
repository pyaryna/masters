using AutoMapper;
using MongoDB.Bson;
using MongoDB.Driver;
using Shop.BLL.DTOs;
using Shop.BLL.Interfaces;
using Shop.DAL.Entities;
using Shop.DAL.Interfaces;
using Shop.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
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
            var id = ParseBookId(bookId);

            var rate = await _unitOfWork.RateRepository.GetRatesByBookId(id);
            rate.Reviews = rate.Reviews.OrderByDescending(r => r.CreatedAt).ToList();

            return _mapper.Map<Rate, RateDto>(rate);
        }

        public async Task<ReviewsPageDto> GetReviewsByBookId(ReviewsQueryParamsDto queryParams)
        {
            var id = ParseBookId(queryParams.BookId);
            var model = _mapper.Map<ReviewsQueryParamsDto, ReviewsQueryParamsModel>(queryParams);

            var rate = await _unitOfWork.RateRepository.GetRatesByBookId(id);
            var sortedReviews = rate.Reviews.OrderByDescending(r => r.CreatedAt)
                .Skip((queryParams.PageNumber - 1) * queryParams.PageSize)
                .Take(queryParams.PageSize)
                .ToList();

            return new ReviewsPageDto
            {
                Reviews = _mapper.Map<List<Review>, List<ReviewDto>>(sortedReviews),
                TotalReviewsNumber = rate.Reviews.Count()
            };
        }

        public async Task AddReviewToBook(AddReviewDto review)
        {
            var id = ParseBookId(review.BookId);
            var rate = await _unitOfWork.RateRepository.GetRatesByBookId(id);

            var existingReview = rate.Reviews
                .Where(r => r.User.Id.ToString() == review.User.Id).FirstOrDefault();

            if (existingReview != null)
            {
                throw new Exception("There is already a review from this user!");
            }

            var newReview = _mapper.Map<AddReviewDto, Review>(review);

            await _unitOfWork.RateRepository.AddReviewToBook(newReview, id);
        }

        private ObjectId ParseBookId(string bookId)
        {
            ObjectId id;
            var successParsed = ObjectId.TryParse(bookId, out id);

            if (!successParsed)
            {
                throw new Exception("Cannot parse book id");
            }

            return id;
        }
    }
}
