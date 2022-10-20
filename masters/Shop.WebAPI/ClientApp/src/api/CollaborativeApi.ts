import instanceApi from "../utils/instanceApi";
import { IBookPreview } from "../types/IBookPreview";

const getRecommendationsByBook = async (id: string, amount: number) => {
    return await instanceApi.get<IBookPreview[]>(`collaborative/book/${id}/${amount}`);
};

const getRecommendationsForUser = async (id: string, amount: number) => {
    return await instanceApi.get<IBookPreview[]>(`collaborative/user/${id}/${amount}`);
};

export { getRecommendationsByBook, getRecommendationsForUser };
