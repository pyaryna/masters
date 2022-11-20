import { memo, FC, useState, useCallback, useEffect, useContext } from "react";
import { Col, Row } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";

import Filter from "../../components/Filter/Filter";
import Sorter from "../../components/Filter/Sorter";
import BookCardGrid from "../../components/Book/Card/BookCardGrid";

import { IBookPreview } from "../../types/IBookPreview";
import { UserContext } from "../../contexts/UserContext";
import { IBookQueryParams } from "../../types/IBookQueryParams";
import { getCollabRecomForUser } from "../../api/CollaborativeApi";

import "./Home.css";

const Collaborative: FC = memo(() => {
    const [books, setBooks] = useState<IBookPreview[]>();
    const [queryParams, setQueryParams] = useState<IBookQueryParams>({});
    const [user] = useContext(UserContext);

    const fetchBooks = useCallback(() => {
        if (user) {
            getCollabRecomForUser(user?.id, 24)
                .then((response: { data: IBookPreview[] }) => {
                    let temp = response.data.sort((a, b) => (b.similarityRate || 0) - (a.similarityRate || 0));
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

    // const onFilterChange = useCallback((name: IBookQueryParamsKeys, checkedValues: CheckboxValueType[]) => {
    //     setQueryParams((prevQueryParams: IBookQueryParams) => {
    //         let newQueryParams = { ...prevQueryParams };
    //         if (name === "price" as IBookQueryParamsKeys) {
    //             newQueryParams.priceStart = checkedValues[0] as number;
    //             newQueryParams.priceEnd = checkedValues[1] as number;
    //         }
    //         else {
    //             newQueryParams[name] = checkedValues as string[];
    //         }
    //         return newQueryParams;
    //     });
    // }, []);

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
        books ?
            <div className="home">
                < Sorter
                    queryParams={queryParams}
                    onSorterOrSearchChange={onSorterOrSearchChange}
                />
                <Row className="home-books">
                    <Col span={6}>
                        {/* <Filter
                            queryParams={queryParams}
                            onFilterChange={onFilterChange}
                            minPrice={Math.min(...books?.map(b => b.price)) || 0}
                            maxPrice={Math.max(...books?.map(b => b.price)) || 0}
                        /> */}
                    </Col>
                    <Col span={18}>
                        <BookCardGrid
                            books={books || []}
                            queryParams={queryParams}
                        />
                    </Col>
                </Row>
            </div >
            : <></>
    );
});

export default Collaborative;
