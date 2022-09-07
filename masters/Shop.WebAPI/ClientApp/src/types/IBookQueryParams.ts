import { BooksSortingOption } from './BooksSortingOption';

export interface IBookQueryParams{
    authors?: string[],
    publishers?: string[],
    genres?: string[],
    priceStartFilter?: number,
    priceEndFilter?: number,
    searchValue?: string,
    sortBy: BooksSortingOption,
    orderByDesc?: boolean,
    pageSize?: number,
    pageNumber?: number
}