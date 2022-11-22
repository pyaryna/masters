import { memo, FC, useState, useCallback, useEffect, useContext } from "react";
import { Col, Row, Spin } from "antd";
import { AxiosResponse } from "axios";

import Filter from "../../Filter/Filter";
import Sorter from "../../Filter/Sorter";
import BookCardGrid from "../Card/BookCardGrid";

import { IBookPreview } from "../../../types/IBookPreview";
import { UserContext } from "../../../contexts/UserContext";
import { IBookFilter, IBookQueryParams } from "../../../types/IBookQueryParams";

interface IRecommendationPageProps {
    getRecommendations: (userId: string, amount: number) => Promise<AxiosResponse<IBookPreview[], any>>;
}

const RecommendationPage: FC<IRecommendationPageProps> = memo(({ getRecommendations }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [books, setBooks] = useState<IBookPreview[]>();
    const [filteredBooks, setFilteredBooks] = useState<IBookPreview[]>();
    const [queryParams, setQueryParams] = useState<IBookQueryParams>({});
    const [user] = useContext(UserContext);

    const fetchBooks = useCallback(() => {
        setLoading(true);
        if (user) {
            getRecommendations(user?.id, 24)
                .then((response: { data: IBookPreview[] }) => {
                    let temp = response.data.sort((a, b) => (b.similarityRate || 0) - (a.similarityRate || 0));
                    setBooks(temp);
                    setFilteredBooks(temp);
                    setLoading(false);
                    console.log(response.data);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        }
    }, [user, setBooks, setLoading, getRecommendations, setFilteredBooks]);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    useEffect(() => {
        if (books) {
            setLoading(true);
            let tempBooks = [...books];
            if (queryParams.authorIds !== undefined && queryParams.authorIds.length > 0) {
                tempBooks = tempBooks.filter(b => queryParams.authorIds?.includes(b.author.id));
            }
            if (queryParams.genreIds !== undefined && queryParams.genreIds.length > 0) {
                tempBooks = tempBooks.filter(b => b.genres.some(g => queryParams.genreIds?.includes(g.id)));
            }
            if (queryParams.publisherIds !== undefined && queryParams.publisherIds.length > 0) {
                tempBooks = tempBooks.filter(b => queryParams.publisherIds?.includes(b.publisher.id));
            }
            tempBooks = queryParams.priceStart
                ? tempBooks.filter(b => b.price >= (queryParams.priceStart || b.price)) : tempBooks;

            tempBooks = queryParams.priceEnd
                ? tempBooks.filter(b => b.price <= (queryParams.priceEnd || b.price)) : tempBooks;

            if (queryParams.searchValue !== undefined) {
                tempBooks = queryParams.searchValue === "" ? tempBooks
                    : tempBooks.filter(d => d.title.toLowerCase().includes(queryParams.searchValue || ""));
            }
            if (queryParams.orderByDesc !== undefined) {
                if (queryParams.orderByDesc) {
                    tempBooks.sort((a, b) => b.price - a.price);
                }
                else {
                    tempBooks.sort((a, b) => a.price - b.price);
                }
            }
            setFilteredBooks(tempBooks);
            setLoading(false);
        }
    }, [queryParams, setLoading, setFilteredBooks, books]);

    const onFilterSubmit = useCallback((filterValues: IBookFilter) => {
        setQueryParams((prevQueryParams: IBookQueryParams) => {
            let newQueryParams = {
                ...prevQueryParams,
                authorIds: filterValues?.authorIds,
                publisherIds: filterValues?.publisherIds,
                genreIds: filterValues?.genreIds,
                priceStart: filterValues?.priceStart,
                priceEnd: filterValues?.priceEnd
            };
            return newQueryParams;
        });
    }, [setQueryParams]);

    const onSorterOrSearchChange = useCallback((name: string, newValue: string) => {
        setQueryParams((prevQueryParams: IBookQueryParams) => {
            let newQueryParams = { ...prevQueryParams };
            if (name === "sort") {
                newQueryParams.orderByDesc = newValue === "down";
            }
            else {
                newQueryParams[name] = newValue;
            }
            return newQueryParams;
        });
    }, [setQueryParams]);

    return (
        <div className="home">
            < Sorter
                queryParams={queryParams}
                onSorterOrSearchChange={onSorterOrSearchChange}
            />
            <Row className="home-books">
                <Col span={6}>
                    <Filter
                        queryParams={queryParams}
                        onFilterSubmit={onFilterSubmit}
                        minCurrentPrice={filteredBooks ? Math.min(...filteredBooks.map(b => b.price)) : 0}
                        maxCurrentPrice={filteredBooks ? Math.max(...filteredBooks.map(b => b.price)) : 0}
                    />
                </Col>
                <Col span={18}>
                    {loading ?
                        <Row justify="center">
                            <Spin size="large" />
                        </Row>
                        :
                        <BookCardGrid
                            books={filteredBooks || []}
                            queryParams={queryParams}
                        />
                    }
                </Col>
            </Row>
        </div >

    );
});

export default RecommendationPage;
