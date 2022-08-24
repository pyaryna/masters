import { IBook } from "../types/IBook";
import instanceApi from "../utils/instanceApi";

const getAllBooks = async () => {
    return await instanceApi.get<IBook[]>('book/books');
};

export { getAllBooks };
