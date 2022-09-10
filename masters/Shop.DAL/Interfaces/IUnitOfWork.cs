namespace Shop.DAL.Interfaces
{
    public interface IUnitOfWork
    {
        IBookRepository BookRepository { get; }
        IAuthorRepository AuthorRepository { get; }
        IPublisherRepository PublisherRepository { get; }
        IGenreRepository GenreRepository { get; }
        IRateRepository RateRepository { get; }
        IUserRepository UserRepository { get; }
    }
}
