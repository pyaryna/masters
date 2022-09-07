﻿using Shop.BLL.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Shop.BLL.Interfaces
{
    public interface IGenreService
    {
        Task<IEnumerable<GenreDto>> GetAllGenres();
    }
}
