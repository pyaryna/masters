import { memo, FC, useState, useCallback, useEffect } from "react";
import { Col, Row, Spin } from "antd";

import Filter from "../../components/Filter/Filter";
import Sorter from "../../components/Filter/Sorter";
import BookCardGrid from "../../components/Book/Card/BookCardGrid";

import { getBooksPreview } from "../../api/BookApi";
import { IBookPreview } from "../../types/IBookPreview";
import { IBookPageInfo } from "../../types/IBookPageInfo";
import { IBookPreviewPage } from "../../types/IBookPreviewPage";
import { IBookFilter, IBookQueryParams } from "../../types/IBookQueryParams";

import "./Home.css";

const initialQueryParams = {
  pageNumber: 1,
  pageSize: 24
}

const Home: FC = memo(() => {
  const [books, setBooks] = useState<IBookPreview[]>();
  const [pageInfo, setPageInfo] = useState<IBookPageInfo>();
  const [queryParams, setQueryParams] = useState<IBookQueryParams>(initialQueryParams);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBooks = useCallback(() => {
    console.log(queryParams);
    getBooksPreview(queryParams)
      .then((response: { data: IBookPreviewPage }) => {
        setBooks(response.data.books);
        setPageInfo(response.data.pageInfo);
        setLoading(false);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }, [setBooks, queryParams]);

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
  }, [setQueryParams]);

  const onPaginatonChange = useCallback((page: number, pageSize: number) => {
    setQueryParams((prevQueryParams: IBookQueryParams) => {
      let newQueryParams = { ...prevQueryParams, pageSize: pageSize, pageNumber: page };
      return newQueryParams;
    });
  }, [setQueryParams]);

  return (
    <div className="home">
      <Sorter
        queryParams={queryParams}
        onSorterOrSearchChange={onSorterOrSearchChange}
      />
      <Row className="home-books">
        <Col span={6}>
          <Filter
            queryParams={queryParams}
            onFilterSubmit={onFilterSubmit}
            minCurrentPrice={pageInfo?.minBookPrice || 0}
            maxCurrentPrice={pageInfo?.maxBookPrice || 0}
          />
        </Col>
        <Col span={18}>
          {loading ?
            <Row justify="center">
              <Spin size="large" />
            </Row>
            : <BookCardGrid
              books={books || []}
              queryParams={queryParams}
              totalBooksNumber={pageInfo?.totalBookNumber || 0}
              onPaginatonChange={onPaginatonChange}
            />
          }
        </Col>
      </Row>
    </div>
  );
});

export default Home;
