using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Driver;
using Shop.DAL.Configuration;
using Shop.DAL.Interfaces;
using Shop.DAL.Repository;

namespace Shop.DAL
{
    public static class ShopDataModule
    {
        public static void AddDataModule(this IServiceCollection services, IConfiguration configuration)
        {
            BsonSerializer.RegisterSerializer(new GuidSerializer(BsonType.String));

            var settings = new DbSettings();
            configuration.GetSection("DatabaseSettings").Bind(settings);
            var mongoClient = new MongoClient(settings.ConnectionString);

            services.AddSingleton<IMongoClient>(mongoClient);

            services.AddTransient<IUnitOfWork, UnitOfWork>();

            services.AddScoped<ShopDBContext>()
                .AddScoped<IBookRepository, BookRepository>();
        }
    }
}
