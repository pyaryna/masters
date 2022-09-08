import { memo, FC, useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { Col, Row, Image, Typography, Button } from "antd";

import { IBook } from "../../types/IBook";
import { getBookById } from "../../api/BookApi";
import DetailsTable from "../../components/Book/Details/DetailsTable";

import "./BookDetails.css";

const { Text } = Typography;

const BookDetails: FC = memo(() => {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<IBook>();
    const [shortDesc, setShortDesc] = useState(true);

    const fetchBook = useCallback(() => {
        getBookById(id)
            .then((response: { data: IBook }) => {
                setBook(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }, [setBook]);

    useEffect(() => {
        fetchBook();
    }, [fetchBook]);

    return (
        book ?
            <div className="book-details">
                <Row gutter={16}>
                    <Col span={8} className="details-img">
                        <Image
                            src={book.imageUrl}
                        />
                    </Col>
                    <Col span={16}>
                        <div className="book-desc-block">
                            <div className="book-author">
                                <Link to="/">
                                    {book.author.name}
                                </Link>
                            </div>
                            <div className="book-title">
                                {book.title}
                            </div>
                            <div className="book-desc">
                                <div>
                                    <Text
                                        ellipsis={shortDesc}
                                    >
                                        {book.description}
                                    </Text>
                                </div>
                                <div className="desc-more-btn">
                                    <Button
                                        type="text"
                                        onClick={() => setShortDesc(!shortDesc)}
                                    >
                                        {shortDesc ? "more..." : "less"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <DetailsTable book={book} />
                        <div className="book-price">
                            <div>
                                {book.price} USD
                            </div>
                            <Button className="details-buy-btn">
                                To card
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
            : <></>
    );
});

export default BookDetails;
