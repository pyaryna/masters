import { memo, FC, useState, useCallback, useEffect } from "react";
import { Col, Row } from "antd";

import Filter from "../../components/Filter/Filter";
import Sorter from "../../components/Filter/Sorter";
import BookCardGrid from "../../components/Book/Card/BookCardGrid";

import { getBooksPreview } from "../../api/BookApi";
import { IBookPreview } from "../../types/IBookPreview";
import { IBookQueryParams } from "../../types/IBookQueryParams";
import { BooksSortingOption } from "../../types/BooksSortingOption";

import "./Home.css";

const initialQueryParams = {
  sortBy: BooksSortingOption.None,
  //pageNumber: pagination.pageNumber,
  //pageSize: pagination.pageSize,
}

const Home: FC = memo(() => {
  const [books, setBooks] = useState<IBookPreview[]>();
  const [queryParams, setQueryParams] = useState<IBookQueryParams>(initialQueryParams);

  const fetchBooks = useCallback(() => {
    getBooksPreview(queryParams)
      .then((response: { data: IBookPreview[] }) => {
        setBooks(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }, [setBooks]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const onFilterChange = useCallback((newQueryParams: IBookQueryParams) => {
    setQueryParams(newQueryParams);
  }, [])

  return (
    <div className="home">
      <Sorter onSorterChange={onFilterChange}/>
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
