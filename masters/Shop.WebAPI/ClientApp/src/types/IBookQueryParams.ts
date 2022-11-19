export interface IBookQueryParams{
    authorIds?: string[],
    publisherIds?: string[],
    genreIds?: string[],
    priceStart?: number,
    priceEnd?: number,
    searchValue?: string,
    orderByDesc?: boolean,
    pageSize?: number,
    pageNumber?: number,
    [key: string]: any
}

export type IBookQueryParamsKeys = keyof IBookQueryParams;