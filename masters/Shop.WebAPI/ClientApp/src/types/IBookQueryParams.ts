export interface IBookFilter{
    authorIds?: string[],
    publisherIds?: string[],
    genreIds?: string[],
    priceStart?: number,
    priceEnd?: number,
    [key: string]: any
}

export interface IBookQueryParams extends IBookFilter{
    searchValue?: string,
    orderByDesc?: boolean,
    pageSize?: number,
    pageNumber?: number
}