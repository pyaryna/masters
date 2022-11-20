using AutoMapper;
using MongoDB.Bson;
using Shop.BLL.DTOs;
using Shop.DAL.Entities;
using Shop.DAL.Models;
using System.Linq;

namespace Shop.BLL.MappingProfiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Book, BookDto>()
                .ForMember(bd => bd.Id, opt => opt.MapFrom(b => b.Id.ToString()));

            CreateMap<Book, BookPreviewDto>()
                .ForMember(bd => bd.Id, opt => opt.MapFrom(b => b.Id.ToString()))
                .ForMember(bd => bd.Author, opt => opt.MapFrom(b => b.Author.Name));

            CreateMap<Author, AuthorDto>()
                .ForMember(ad => ad.Id, opt => opt.MapFrom(a => a.Id.ToString()));
            CreateMap<Publisher, PublisherDto>()
                .ForMember(pd => pd.Id, opt => opt.MapFrom(p => p.Id.ToString()));
            CreateMap<Genre, GenreDto>()
                .ForMember(gd => gd.Id, opt => opt.MapFrom(g => g.Id.ToString()));

            CreateMap<BaseUser, BaseUserDto>()
                .ForMember(ad => ad.Id, opt => opt.MapFrom(a => a.Id.ToString()))
                .ReverseMap();
            CreateMap<User, UserDto>();
            CreateMap<Review, ReviewDto>();
            CreateMap<Rate, RateDto>()
                .ForMember(ad => ad.Id, opt => opt.MapFrom(a => a.Id.ToString()));

            CreateMap<AddReviewDto, Review>();

            CreateMap<BookFilterDto, BookFilterModel>()
                .ForMember(m => m.AuthorIds, 
                    opt => opt.MapFrom(dt => dt.AuthorIds.Select(a => ObjectId.Parse(a))))
                .ForMember(m => m.PublisherIds,
                    opt => opt.MapFrom(dt => dt.PublisherIds.Select(a => ObjectId.Parse(a))))
                .ForMember(m => m.GenreIds,
                    opt => opt.MapFrom(dt => dt.GenreIds.Select(a => ObjectId.Parse(a))));

            CreateMap<BookPageInfoModel, BookPageInfoDto>();

            CreateMap<ReviewsQueryParamsDto, ReviewsQueryParamsModel>()
                .ForMember(m => m.BookId, opt => opt.MapFrom(dt => ObjectId.Parse(dt.BookId)));
        }
    }
}
