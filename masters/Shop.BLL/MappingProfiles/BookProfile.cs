using AutoMapper;
using Shop.BLL.DTOs;
using Shop.DAL.Entities;

namespace Shop.BLL.MappingProfiles
{
    public class BookProfile : Profile
    {
        public BookProfile()
        {
            CreateMap<Book, BookDto>();

            CreateMap<Author, AuthorDto>();
            CreateMap<Publisher, PublisherDto>();
            CreateMap<Genre, GenreDto>();
        }
    }
}
