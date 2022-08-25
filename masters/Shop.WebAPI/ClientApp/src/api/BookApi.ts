import { IBook } from "../types/IBook";
import { IBookPreview } from "../types/IBookPreview";
import instanceApi from "../utils/instanceApi";

const getAllBooksPreview = async () => {
    return await instanceApi.get<IBookPreview[]>('book/books');
};

export { getAllBooksPreview };
