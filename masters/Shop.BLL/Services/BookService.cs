using AutoMapper;
using MongoDB.Bson;
using MongoDB.Driver;
using Shop.BLL.DTOs;
using Shop.BLL.Interfaces;
using Shop.DAL.Entities;
using Shop.DAL.Interfaces;
using Shop.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<BookPreviewPageDto> GetBooksPreviews(BookFilterDto filter)
        {
            var filterModel = _mapper.Map<BookFilterDto, BookFilterModel>(filter);
            var booksModel = await _unitOfWork.BookRepository.GetBooksPreviews(filterModel);
            var pageInfo = await _unitOfWork.BookRepository.GetBooksPageMetadata(filterModel);

            return new BookPreviewPageDto
            {
                Books = _mapper.Map<IEnumerable<Book>, IEnumerable<BookPreviewDto>>(booksModel),
                PageInfo = _mapper.Map<BookPageInfoModel, BookPageInfoDto>(pageInfo)
            };
        }

        public async Task<BookDto> GetBookById(string strId)
        {
            ObjectId id;
            var successParsed = ObjectId.TryParse(strId, out id);

            if (!successParsed)
            {
                throw new Exception("Cannot parse id");
            }
            
            var book = await _unitOfWork.BookRepository.GetBookById(id);

            return _mapper.Map<Book, BookDto>(book);
        }
    }
}
