using Shop.DAL.Interfaces;
using Shop.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.DAL
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ShopDBContext _shopDBContext;

        private IBookRepository _bookRepository;

        public UnitOfWork(ShopDBContext dbContext)
        {
            _shopDBContext = dbContext;
        }

        public virtual IBookRepository BookRepository => _bookRepository ??= new BookRepository(_shopDBContext);
    }
}
