import { IPaginationParams } from "./IPaginationParams"

export interface IBookFilter{
    authorIds?: string[],
    publisherIds?: string[],
    genreIds?: string[],
    priceStart?: number,
    priceEnd?: number,
    [key: string]: any
}

export interface IBookQueryParams extends IBookFilter, IPaginationParams{
    searchValue?: string,
    orderByDesc?: boolean
}