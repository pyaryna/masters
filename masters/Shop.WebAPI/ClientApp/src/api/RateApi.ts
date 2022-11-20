
import { IRate } from "../types/IRate";
import { IAddReview } from "../types/IAddReview";
import { IReviewsPage } from "../types/IReviewsPage";
import { IPaginationParams } from "../types/IPaginationParams";
import instanceApi from "../utils/instanceApi";

import qs from "qs";

const getRateByBookId = async (id: string) => {
    return await instanceApi.get<IRate>(`rate/${id}`);
};

const getReviewsByBookId = async (id: string, paginationParams: IPaginationParams) => {
    return await instanceApi.get<IReviewsPage>('rate/reviews/',
        {
            params: {
                bookId: id,
                pageNumber: paginationParams.pageNumber,
                pageSize: paginationParams.pageSize
            },
            paramsSerializer: (params) => {
                return qs.stringify(params)
            }
        });
};

const addReview = async (review: IAddReview): Promise<void> => {
    return await instanceApi.post('/rate', review);
};

export { getRateByBookId, getReviewsByBookId, addReview };
