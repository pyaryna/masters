import { IBook } from "../types/IBook";
import { IBookPreview } from "../types/IBookPreview";
import instanceApi from "../utils/instanceApi";

const getAllBooksPreview = async () => {
    return await instanceApi.get<IBookPreview[]>('book/previews');
};

const getBookById = async (id: number) => {
    return await instanceApi.get<IBook>('book/{id}');
};

export { getAllBooksPreview, getBookById };
