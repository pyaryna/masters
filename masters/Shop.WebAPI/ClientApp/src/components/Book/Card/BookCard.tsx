import { FC, memo } from "react";
import { Button, Card, Popover } from "antd";

import { IBookPreview } from "../../../types/IBookPreview";

import "./BookCard.css"

const { Meta } = Card;

interface IBookCardProps {
  book: IBookPreview
}

const BookCard: FC<IBookCardProps> = memo(({ book }: IBookCardProps) => {
  return (
    <div className="book-card">
      <Card
        cover={
          <img
            alt={book.title}
            src={book.imageUrl}
          />
        }
      >
        {book.author}
        <Meta
          title={
            <Popover placement="bottom" content={book.title}>
              {book.title}
            </Popover>
          }
          description={`${book.price} USD`}
        />
      </Card>
      <div className="book-card-hover">
        <div className="book-card-hover-content">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </div>
      </div>
    </div>
  );
});

export default BookCard;
