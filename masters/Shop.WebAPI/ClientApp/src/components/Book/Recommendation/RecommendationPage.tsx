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
    const [books, setBooks] = useState<IBookPreview[]>([]);
    const [queryParams, setQueryParams] = useState<IBookQueryParams>({});
    const [user] = useContext(UserContext);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchBooks = useCallback(() => {
        if (user) {
            getRecommendations(user?.id, 24)
                .then((response: { data: IBookPreview[] }) => {
                    let temp = response.data.sort((a, b) => (b.similarityRate || 0) - (a.similarityRate || 0));
                    setBooks(temp);
                    setLoading(false);
                    console.log(response.data);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        }
    }, [user, setBooks]);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

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
    }, []);

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
                        minCurrentPrice={Math.min(...books?.map(b => b.price)) || 0}
                        maxCurrentPrice={Math.max(...books?.map(b => b.price)) || 0}
                    />
                </Col>
                <Col span={18}>
                    {loading ?
                        <Row justify="center">
                            <Spin size="large" />
                        </Row>
                        :
                        <BookCardGrid
                            books={books || []}
                            queryParams={queryParams}
                        />
                    }
                </Col>
            </Row>
        </div >

    );
});

export default RecommendationPage;
