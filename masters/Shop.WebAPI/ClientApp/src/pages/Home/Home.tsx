import { memo, FC, useState, useCallback, useEffect, useContext } from "react";
import { Col, Row } from "antd";

import Filter from "../../components/Filter/Filter";
import Sorter from "../../components/Filter/Sorter";
import BookCardGrid from "../../components/Book/Card/BookCardGrid";

import { getBooksPreview } from "../../api/BookApi";
import { IBookPreview } from "../../types/IBookPreview";
import { FilterContext } from "../../contexts/FilterContext";
import { IBookQueryParams } from "../../types/IBookQueryParams";

import "./Home.css";

const Home: FC = memo(() => {
  const [books, setBooks] = useState<IBookPreview[]>();
  const [queryParams, setQueryParams] = useContext(FilterContext);

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

export default Home;
