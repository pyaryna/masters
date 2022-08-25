import { Col, Row } from "antd";
import { FC, memo, useEffect, useState } from "react";

import { IBookPreview } from "../../../types/IBookPreview";
import BookCard from "./BookCard";

interface IBookCardGridProps {
  books: IBookPreview[];
  chunkSize?: number;
}

const BookCardGrid: FC<IBookCardGridProps> = memo(({ books, chunkSize = 4 }: IBookCardGridProps) => {
  const [bookChunks, setBookChunks] = useState<IBookPreview[][]>();

  useEffect(() => {
    const booksArray = [];
    for (let i = 0; i < books.length; i += chunkSize) {
      const chunk = books.slice(i, i + chunkSize);
      booksArray.push(chunk);
    }
    setBookChunks(booksArray);
    console.log(booksArray);
  }, [books, chunkSize])

  return (
    <div>
      {bookChunks?.map(chunk =>
        <Row gutter={16} className="book-card-grid-row">
          {
            chunk.map(item =>
              <Col span={24 / chunkSize}>
                <BookCard book={item} />
              </Col>
            )
          }
        </Row>
      )}
    </div>
  );
});

export default BookCardGrid;
