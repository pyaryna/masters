using Shop.DAL.Interfaces;
using Shop.DAL.Repository;

namespace Shop.DAL
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ShopDBContext _shopDBContext;

        private IBookRepository _bookRepository;
        private IAuthorRepository _authorRepository;
        private IPublisherRepository _publisherRepository;
        private IGenreRepository _genreRepository;
        private IRateRepository _rateRepository;

        public UnitOfWork(ShopDBContext dbContext)
        {
            _shopDBContext = dbContext;
        }

        public virtual IBookRepository BookRepository => _bookRepository ??= new BookRepository(_shopDBContext);
        public virtual IAuthorRepository AuthorRepository => _authorRepository ??= new AuthorRepository(_shopDBContext);
        public virtual IPublisherRepository PublisherRepository => _publisherRepository ??= new PublisherRepository(_shopDBContext);
        public virtual IGenreRepository GenreRepository => _genreRepository ??= new GenreRepository(_shopDBContext);
        public virtual IRateRepository RateRepository => _rateRepository ??= new RateRepository(_shopDBContext);
    }
}
