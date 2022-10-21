import { memo, FC, useState, useCallback, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";

import Similar from "./Similar";
import { IBookPreview } from "../../../types/IBookPreview";
import { FilterContext } from "../../../contexts/FilterContext";
import { getContentRecomByBook } from "../../../api/ContentApi";
import { getCollabRecomByBook } from "../../../api/CollaborativeApi";

import "./Similar.css";

interface ISimilarBlockProps {
    bookId: string;
}

const SimilarBlock: FC<ISimilarBlockProps> = memo(({ bookId }: ISimilarBlockProps) => {
    const [collabBooks, setCollabBooks] = useState<IBookPreview[]>();
    const [contentBooks, setContentBooks] = useState<IBookPreview[]>();
    const [queryParams] = useContext(FilterContext);
    const { t } = useTranslation();

    const fetchCollabBooks = useCallback(() => {
        getCollabRecomByBook(bookId, 5)
            .then((response: { data: IBookPreview[] }) => {
                let temp = response.data.sort((a, b) => (b.similarityRate || 0) - (a.similarityRate || 0));
                setCollabBooks(temp);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }, [setCollabBooks, queryParams]);

    const fetchContentBooks = useCallback(() => {
        getContentRecomByBook(bookId, 5)
            .then((response: { data: IBookPreview[] }) => {
                let temp = response.data.sort((a, b) => (b.similarityRate || 0) - (a.similarityRate || 0));
                setContentBooks(temp);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }, [setContentBooks, queryParams]);

    useEffect(() => {
        fetchCollabBooks();
        fetchContentBooks();
    }, [fetchCollabBooks, fetchContentBooks]);

    return (
        <div className="similar-block">
            {
                collabBooks ?
                    <>
                        <h2>
                            {t("book.collab-recom")}
                        </h2>
                        <Similar books={collabBooks} />
                    </>
                    : <></>
            }

            {
                contentBooks ?
                    <>
                        <h2>
                            {t("book.content-recom")}
                        </h2>
                        <Similar books={contentBooks} />
                    </>
                    : <></>
            }
        </div>
    );
});

export default SimilarBlock;
