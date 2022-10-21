import { memo, FC, useState, useCallback, useEffect, useContext } from "react";
import { Col, Row } from "antd";

import Filter from "../../components/Filter/Filter";
import Sorter from "../../components/Filter/Sorter";
import BookCardGrid from "../../components/Book/Card/BookCardGrid";

import { IBookPreview } from "../../types/IBookPreview";
import { UserContext } from "../../contexts/UserContext";
import { FilterContext } from "../../contexts/FilterContext";
import { getContentRecomForUser } from "../../api/ContentApi";
import { IBookQueryParams } from "../../types/IBookQueryParams";

import "./Home.css";

const Content: FC = memo(() => {
    const [books, setBooks] = useState<IBookPreview[]>();
    const [queryParams, setQueryParams] = useContext(FilterContext);
    const [user] = useContext(UserContext);

    const fetchBooks = useCallback(() => {
        if (user) {
            getContentRecomForUser(user?.id, 24)
                .then((response: { data: IBookPreview[] }) => {
                    let temp = response.data.sort((a,b) => (b.similarityRate || 0) - (a.similarityRate || 0));
                    setBooks(temp);
                    console.log(response.data);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        }
    }, [user, setBooks, queryParams]);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    const onFilterChange = useCallback((newQueryParams: IBookQueryParams) => {
        setQueryParams(newQueryParams);
    }, [setQueryParams])

    return (
        <div className="home">
            <Sorter onSorterChange={onFilterChange} />
            <Row className="home-books">
                <Col span={6}>
                    <Filter onFilterChange={onFilterChange} />
                </Col>
                <Col span={18}>
                    <BookCardGrid books={books || []} />
                </Col>
            </Row>
        </div>
    );
});

export default Content;
