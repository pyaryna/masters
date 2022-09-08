import { IBook } from "../types/IBook";
import { IBookPreview } from "../types/IBookPreview";
import { IBookQueryParams } from "../types/IBookQueryParams";
import instanceApi from "../utils/instanceApi";

const getBooksPreview = async (params: IBookQueryParams) => {
    return await instanceApi.get<IBookPreview[]>('book/previews'
    // , 
    // {
    //     params: {
    //       authors: params.authors,
    //       publishers: params.publishers,
    //       genres: params.genres,
    //       priceStartFilter: params.priceStartFilter,
    //       priceEndFilter: params.priceEndFilter,
    //       searchValue: params.searchValue,
    //       sortBy: params.sortBy,
    //       orderByDesc: params.orderByDesc,
    //       pageNumber: params.pageNumber,
    //       pageSize: params.pageSize,
    //     }
    // }
    );
};

const getBookById = async (id: string) => {
    return await instanceApi.get<IBook>(`book/${id}`);
};

export { getBooksPreview, getBookById };
