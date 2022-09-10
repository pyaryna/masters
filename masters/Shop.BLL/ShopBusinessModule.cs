using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Shop.BLL.Interfaces;
using Shop.BLL.MappingProfiles;
using Shop.BLL.Services;

namespace Shop.BLL
{
    public static class ShopBusinessModule
    {
        public static void AddBusinessModule(this IServiceCollection services, IConfiguration configuration)
        {
            // mapper
            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfile());
            });

            IMapper mapper = mappingConfig.CreateMapper();
            services.AddSingleton(mapper);

            services.AddTransient<IBookService, BookService>();
            services.AddTransient<IAuthorService, AuthorService>();
            services.AddTransient<IPublisherService, PublisherService>();
            services.AddTransient<IGenreService, GenreService>();
            services.AddTransient<IMetadataService, MetadataService>();
            services.AddTransient<IRateService, RateService>();
            services.AddTransient<IUserService, UserService>();
        }
    }
}
