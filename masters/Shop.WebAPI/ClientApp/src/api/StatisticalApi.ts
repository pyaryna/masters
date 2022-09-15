import instanceApi from "../utils/instanceApi";
import { IBookPreview } from "../types/IBookPreview";

const getRecommendationsByBook = async (id: string, amount: number) => {
    return await instanceApi.get<IBookPreview[]>(`statistical/book/${id}/${amount}`);
};

const getRecommendationsForUser = async (id: string, amount: number) => {
    return await instanceApi.get<IBookPreview[]>(`statistical/user/${id}/${amount}`);
};

export { getRecommendationsByBook, getRecommendationsForUser };
