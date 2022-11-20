import { memo, FC, useState, useCallback, useEffect } from "react";
import { Col, Row, Spin } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";

import Filter from "../../components/Filter/Filter";
import Sorter from "../../components/Filter/Sorter";
import BookCardGrid from "../../components/Book/Card/BookCardGrid";

import { getBooksPreview } from "../../api/BookApi";
import { IBookPreview } from "../../types/IBookPreview";
import { IBookPageInfo } from "../../types/IBookPageInfo";
import { IBookPreviewPage } from "../../types/IBookPreviewPage";
import { IBookQueryParams, IBookQueryParamsKeys } from "../../types/IBookQueryParams";

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
  }, [setBooks]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const onFilterChange = useCallback((name: IBookQueryParamsKeys, checkedValues: CheckboxValueType[]) => {
    setQueryParams((prevQueryParams: IBookQueryParams) => {
      let newQueryParams = { ...prevQueryParams };
      if (name === "price" as IBookQueryParamsKeys) {
        newQueryParams.priceStart = checkedValues[0] as number;
        newQueryParams.priceEnd = checkedValues[1] as number;
      }
      else {
        newQueryParams[name] = checkedValues as string[];
      }
      return newQueryParams;
    });
  }, []);

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

  const onPaginatonChange = useCallback((page: number, pageSize: number) => {
    setQueryParams((prevQueryParams: IBookQueryParams) => {
      let newQueryParams = { ...prevQueryParams, pageSize: pageSize, pageNumber: page };
      return newQueryParams;
    });
  }, []);

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
            onFilterChange={onFilterChange}
            minPrice={pageInfo?.minBookPrice || 0}
            maxPrice={pageInfo?.maxBookPrice || 0}
          />
        </Col>
        <Col span={18}>
          {loading ?
            <Row justify="center">
              <Spin size="large"/>
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
