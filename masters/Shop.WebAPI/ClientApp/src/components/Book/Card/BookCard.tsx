import { FC, memo } from "react";
import { Button, Card, Col, Popover, Row } from "antd";

import { IBookPreview } from "../../../types/IBookPreview";

import "./BookCard.css"
import { ShoppingCartOutlined } from "@ant-design/icons";

const { Meta } = Card;

interface IBookCardProps {
  book: IBookPreview
}

const BookCard: FC<IBookCardProps> = memo(({ book }: IBookCardProps) => {
  return (
    <div className="book-card">
      <Card
        hoverable
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
          description={
            <Row justify="space-between" align='middle' className="book-card-desc">
              <Col span={14} className="book-card-price">
                {book.price} USD
              </Col>
              <Col span={8} className="book-card-desc-btn-col">
                <Button>
                  <ShoppingCartOutlined />
                  Buy
                </Button>
              </Col>
            </Row>
          }
        />
      </Card>
    </div>
  );
});

export default BookCard;
