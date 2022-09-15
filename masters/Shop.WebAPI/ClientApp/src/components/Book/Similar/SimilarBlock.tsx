import { memo, FC, useState, useCallback, useEffect, useContext } from "react";

import Similar from "./Similar";
import { IBookPreview } from "../../../types/IBookPreview";
import { FilterContext } from "../../../contexts/FilterContext";
import { getRecommendationsByBook } from "../../../api/StatisticalApi";

import "./Similar.css";

interface ISimilarBlockProps {
    bookId: string;
}

const SimilarBlock: FC<ISimilarBlockProps> = memo(({ bookId }: ISimilarBlockProps) => {
    const [statBooks, setStatBooks] = useState<IBookPreview[]>();
    const [queryParams] = useContext(FilterContext);

    const fetchBooks = useCallback(() => {
        getRecommendationsByBook(bookId, 5)
            .then((response: { data: IBookPreview[] }) => {
                let temp = response.data.sort((a,b) => (b.similarityRate || 0) - (a.similarityRate || 0));
                setStatBooks(temp);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }, [setStatBooks, queryParams]);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    return (
        <div className="similar-block">
            {
                statBooks ?
                    <>
                        <h2>
                            Statistical recommendations
                        </h2>
                        <Similar books={statBooks} />
                    </>
                    : <></>
            }

            {
                statBooks ?
                    <>
                        <h2>
                            Other recommendations
                        </h2>
                        <Similar books={statBooks} />
                    </>
                    : <></>
            }
        </div>
    );
});

export default SimilarBlock;
