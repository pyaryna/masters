import { memo, FC } from "react";
import { Col, Row } from "antd";

import BookCard from "../Card/BookCard";

import { IBookPreview } from "../../../types/IBookPreview";

import "./Similar.css";

interface ISimilarProps {
    books: IBookPreview[];
}

const Similar: FC<ISimilarProps> = memo(({ books }: ISimilarProps) => {
    return (
        <div className="similar-block">
            <Row
                justify="space-around"
                className="book-card-grid-row"
            >
                {
                    books.map(item =>
                        <Col
                            key={item.id}
                            span={4}
                        >
                            <BookCard book={item} />
                        </Col>
                    )
                }
            </Row>
        </div>
    );
});

export default Similar;
