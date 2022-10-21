import instanceApi from "../utils/instanceApi";
import { IBookPreview } from "../types/IBookPreview";

const getCollabRecomByBook = async (id: string, amount: number) => {
    return await instanceApi.get<IBookPreview[]>(`collaborative/book/${id}/${amount}`);
};

const getCollabRecomForUser = async (id: string, amount: number) => {
    return await instanceApi.get<IBookPreview[]>(`collaborative/user/${id}/${amount}`);
};

export { getCollabRecomByBook, getCollabRecomForUser };
