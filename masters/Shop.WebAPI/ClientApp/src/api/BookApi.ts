import { IBook } from "../types/IBook";
import { IBookPreviewPage } from "../types/IBookPreviewPage";
import { IBookQueryParams } from "../types/IBookQueryParams";
import instanceApi from "../utils/instanceApi";

import qs from "qs";

const getBooksPreview = async (params: IBookQueryParams) => {
    return await instanceApi.get<IBookPreviewPage>('book/previews',
        {
            params: {
                authorIds: params.authorIds,
                publisherIds: params.publisherIds,
                genreIds: params.genreIds,
                priceStart: params.priceStart,
                priceEnd: params.priceEnd,
                searchValue: params.searchValue,
                orderByDesc: params.orderByDesc,
                pageNumber: params.pageNumber,
                pageSize: params.pageSize
            },
            paramsSerializer: (params) => {
                return qs.stringify(params)
            }
        }
    );
};

const getBookById = async (id: string) => {
    return await instanceApi.get<IBook>(`book/${id}`);
};

export { getBooksPreview, getBookById };
