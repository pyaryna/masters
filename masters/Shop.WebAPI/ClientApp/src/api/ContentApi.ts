import instanceApi from "../utils/instanceApi";
import { IBookPreview } from "../types/IBookPreview";

const getContentRecomByBook = async (id: string, amount: number, user?: string) => {
    const queryStr = user ? `content/book/${id}/${amount}/${user}` : `content/book/${id}/${amount}`;
    return await instanceApi.get<IBookPreview[]>(queryStr);
};

const getContentRecomForUser = async (id: string, amount: number) => {
    return await instanceApi.get<IBookPreview[]>(`content/user/${id}/${amount}`);
};

export { getContentRecomByBook, getContentRecomForUser };
