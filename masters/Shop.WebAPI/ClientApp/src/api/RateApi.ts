
import { IRate } from "../types/IRate";
import { IAddReview } from "../types/IAddReview";
import instanceApi from "../utils/instanceApi";

const getRateByBookId = async (id: string) => {
    return await instanceApi.get<IRate>(`rate/${id}`);
};

const addReview = async (review: IAddReview): Promise<void> => {
    return await instanceApi.post('/rate', review);
};

export { getRateByBookId, addReview };
