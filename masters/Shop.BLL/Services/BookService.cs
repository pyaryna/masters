using AutoMapper;
using Shop.BLL.DTOs;
using Shop.BLL.Interfaces;
using Shop.DAL.Entities;
using Shop.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.BLL.Services
{
    public class BookService: IBookService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public BookService(
            IUnitOfWork unitOfWork,
            IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IEnumerable<BookDto>> GetAllBooks()
        {
            var books = await _unitOfWork.BookRepository.GetAllBooks();

            return _mapper.Map<IEnumerable<Book>, IEnumerable<BookDto>>(books);
        }

        public async Task<IEnumerable<BookPreviewDto>> GetAllBooksPreviews()
        {
            var books = await _unitOfWork.BookRepository.GetAllBooksPreviews();

            return _mapper.Map<IEnumerable<Book>, IEnumerable<BookPreviewDto>>(books);
        }
    }
}
