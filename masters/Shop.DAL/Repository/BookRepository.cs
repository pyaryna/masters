using MongoDB.Bson;
using MongoDB.Driver;
using Shop.DAL.Entities;
using Shop.DAL.Interfaces;
using Shop.DAL.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shop.DAL.Repository
{
    public class BookRepository : IBookRepository
    {
        private readonly ShopDBContext _shopDBContext;

        public BookRepository(ShopDBContext shopDBContext)
        {
            _shopDBContext = shopDBContext;
        }

        public async Task<IEnumerable<Book>> GetAllBooks()
        {
            return (await _shopDBContext.Books.FindAsync(_ => true)).ToList();
        }

        public async Task<IEnumerable<Book>> GetBooksPreviews(BookFilterModel filter)
        {
            var query = BuildQueryByFilter(filter);

            var queryResult = _shopDBContext.Books.Find(query);

            if(filter.OrderByDesc != null)
            {
                if (filter.OrderByDesc == true)
                {
                    queryResult.SortByDescending(b => b.Price);
                }
                else
                {
                    queryResult.SortBy(b => b.Price);
                }
            }

            return await queryResult
                .Skip((filter.PageNumber - 1) * filter.PageSize)
                .Limit(filter.PageSize)
                .Project<Book>(Builders<Book>.Projection
                    .Include(b => b.Id)
                    .Include(b => b.Title)
                    .Include(b => b.Author)
                    .Include(b => b.Price)
                    .Include(b => b.ImageUrl))
                .ToListAsync();
        }

        public async Task<BookPageInfoModel> GetBooksPageMetadata(BookFilterModel filter)
        {
            var query = BuildQueryByFilter(filter);

            var queryResult = _shopDBContext.Books.Find(query);

            return new BookPageInfoModel
            {
                TotalBookNumber = (int)await queryResult.CountDocumentsAsync(),
                MaxBookPrice = (await queryResult.SortByDescending(b => b.Price).FirstOrDefaultAsync()).Price,
                MinBookPrice = (await queryResult.SortBy(b => b.Price).FirstOrDefaultAsync()).Price
            };
        }

        public async Task<Book> GetBookById(ObjectId id)
        {
            return (await _shopDBContext.Books
                .FindAsync(b => b.Id == id))
                .FirstOrDefault();
        }

        private FilterDefinition<Book> BuildQueryByFilter(BookFilterModel filter)
        {
            var query = new List<FilterDefinition<Book>>();

            if (filter.AuthorIds != null && filter.AuthorIds.Count > 0)
            {
                query.Add(Builders<Book>.Filter.In(b => b.Author.Id, filter.AuthorIds));
            }

            if (filter.PublisherIds != null && filter.PublisherIds.Count > 0)
            {
                query.Add(Builders<Book>.Filter.In(b => b.Publisher.Id, filter.PublisherIds));
            }

            if (filter.GenreIds != null && filter.GenreIds.Count > 0)
            {
                query.Add(Builders<Book>.Filter.ElemMatch(x => x.Genres,
                       Builders<Genre>.Filter.In(y => y.Id, filter.GenreIds)
                    ));
            }

            if (filter.PriceStart != null)
            {
                query.Add(Builders<Book>.Filter.Gte(b => b.Price, filter.PriceStart));
            }

            if (filter.PriceEnd != null)
            {
                query.Add(Builders<Book>.Filter.Lte(b => b.Price, filter.PriceEnd));
            }

            if (filter.SearchValue != null)
            {
                query.Add(Builders<Book>.Filter.Regex(b => b.Title, filter.SearchValue));
            }

            var finalQuery = query.Count == 0
                ? Builders<Book>.Filter.Empty
                : Builders<Book>.Filter.And(query);

            return finalQuery;
        }
    }
}
