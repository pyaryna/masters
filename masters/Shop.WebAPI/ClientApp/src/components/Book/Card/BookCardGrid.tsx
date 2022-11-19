import { Col, Pagination, Row } from "antd";
import { FC, memo, useCallback, useEffect, useState } from "react";

import { IBookPreview } from "../../../types/IBookPreview";
import { IBookQueryParams } from "../../../types/IBookQueryParams";
import BookCard from "./BookCard";

interface IBookCardGridProps {
  books: IBookPreview[];
  chunkSize?: number;
  queryParams: IBookQueryParams;
  totalBooksNumber: number;
  onPaginatonChange: (page: number, pageSize: number) => void;
}

const BookCardGrid: FC<IBookCardGridProps> = memo(({ books, queryParams, totalBooksNumber, onPaginatonChange, chunkSize = 4 }: IBookCardGridProps) => {
  const [bookChunks, setBookChunks] = useState<IBookPreview[][]>();

  useEffect(() => {
    const booksArray = [];
    for (let i = 0; i < books.length; i += chunkSize) {
      const chunk = books.slice(i, i + chunkSize);
      booksArray.push(chunk);
    }
    setBookChunks(booksArray);
    console.log(booksArray);
  }, [books, chunkSize]);

  const handleChange = useCallback((page: number, pageSize: number) => {
    onPaginatonChange(page, pageSize);
  }, []);

  return (
    <div>
      {bookChunks?.map((chunk, index) =>
        <Row
          key={index}
          gutter={16}
          className="book-card-grid-row"
        >
          {
            chunk.map(item =>
              <Col
                key={item.id}
                span={24 / chunkSize}
              >
                <BookCard book={item} />
              </Col>
            )
          }
        </Row>
      )}
      <Row justify="center">
        <Pagination
          pageSizeOptions={[24, 48, 92]}
          total={totalBooksNumber}
          current={queryParams.pageNumber}
          pageSize={queryParams.pageSize}
          onChange={handleChange}
        />
      </Row>
    </div>
  );
});

export default BookCardGrid;
