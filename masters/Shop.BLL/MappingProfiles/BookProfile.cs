using AutoMapper;
using Shop.BLL.DTOs;
using Shop.DAL.Entities;

namespace Shop.BLL.MappingProfiles
{
    public class BookProfile : Profile
    {
        public BookProfile()
        {
            CreateMap<Book, BookDto>()
                .ForMember(bd => bd.Id, opt => opt.MapFrom(b => b.Id.ToString()));

            CreateMap<Author, AuthorDto>()
                .ForMember(ad => ad.Id, opt => opt.MapFrom(a => a.Id.ToString()));
            CreateMap<Publisher, PublisherDto>()
                .ForMember(pd => pd.Id, opt => opt.MapFrom(p => p.Id.ToString()));
            CreateMap<Genre, GenreDto>()
                .ForMember(gd => gd.Id, opt => opt.MapFrom(g => g.Id.ToString()));
        }
    }
}
