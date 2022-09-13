import { memo, FC, useState, useCallback, useEffect, useContext } from "react";

import Similar from "./Similar";
import { getBooksPreview } from "../../../api/BookApi";
import { IBookPreview } from "../../../types/IBookPreview";
import { FilterContext } from "../../../contexts/FilterContext";

import "./Similar.css";

interface ISimilarBlockProps {
    bookId: string;
}

const SimilarBlock: FC<ISimilarBlockProps> = memo(({ bookId }: ISimilarBlockProps) => {
    const [books, setBooks] = useState<IBookPreview[]>();
    const [queryParams] = useContext(FilterContext);

    const fetchBooks = useCallback(() => {
        getBooksPreview(queryParams)
            .then((response: { data: IBookPreview[] }) => {
                setBooks(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }, [setBooks, queryParams]);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    return (
        <div className="similar-block">
            <h2>
                Statistical recommendations
            </h2>
            <Similar books={books?.slice(0, 5) || []} />
            <h2>
                Other recommendations
            </h2>
            <Similar books={books?.slice(0, 5) || []} />
        </div>
    );
});

export default SimilarBlock;
