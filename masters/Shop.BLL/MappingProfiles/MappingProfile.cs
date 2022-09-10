using AutoMapper;
using Shop.BLL.DTOs;
using Shop.DAL.Entities;

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
                .ForMember(ad => ad.Id, opt => opt.MapFrom(a => a.Id.ToString()));
            CreateMap<User, UserDto>();
            CreateMap<Review, ReviewDto>();
            CreateMap<Rate, RateDto>()
                .ForMember(ad => ad.Id, opt => opt.MapFrom(a => a.Id.ToString()));
        }
    }
}
