import { memo, FC, useState, useCallback, useEffect } from "react";
import { Col, Row } from "antd";

import Filter from "../../components/Filter/Filter";
import Sorter from "../../components/Filter/Sorter";
import BookCardGrid from "../../components/Book/Card/BookCardGrid";

import { IBookPreview } from "../../types/IBookPreview";
import { getAllBooksPreview } from "../../api/BookApi";

import "./Home.css";

const Home: FC = memo(() => {
  const [books, setBooks] = useState<IBookPreview[]>();

  const fetchBooks = useCallback(() => {
    getAllBooksPreview()
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

  const onFilterChange = useCallback(() => {

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
