
import { IRate } from "../types/IRate";
import { IAddReview } from "../types/IAddReview";
import instanceApi from "../utils/instanceApi";

const getRecommendationsByBook = async (id: string) => {
    return await instanceApi.get<IRate>(`rate/${id}`);
};

const getRecommendationsForUser = async (review: IAddReview): Promise<void> => {
    return await instanceApi.post('/rate', review);
};

export { getRecommendationsByBook, getRecommendationsForUser };
