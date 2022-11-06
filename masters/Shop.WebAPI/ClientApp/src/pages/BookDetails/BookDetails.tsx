import { memo, FC, useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { Col, Row, Image, Button, Divider } from "antd";

import { IBook } from "../../types/IBook";
import { getBookById } from "../../api/BookApi";
import ReviewBlock from "../../components/Book/Review/ReviewBlock";
import SimilarBlock from "../../components/Book/Similar/SimilarBlock";
import DetailsTable from "../../components/Book/Details/DetailsTable";

import "./BookDetails.css";

const BookDetails: FC = memo(() => {
    const { t } = useTranslation();
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
    }, [setBook, id]);

    useEffect(() => {
        fetchBook();
    }, [fetchBook]);

    return (
        book ?
            <div className="book-details">
                <div>
                    <Row>
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
                                    <div
                                        className={shortDesc ? "short-desc" : ""}
                                    >
                                        {book.description}
                                    </div>
                                    <div className="desc-more-btn">
                                        <Button
                                            type="text"
                                            onClick={() => setShortDesc(!shortDesc)}
                                        >
                                            {shortDesc ? `${t("book.more")}...` : t("book.less")}
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
                                    {t("book.card")}
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <div>
                        <Divider />
                        <ReviewBlock bookId={id} />
                    </div>
                </div>
                <div>
                    <Divider />
                    <SimilarBlock bookId={id} />
                </div>
            </div>
            : <></>
    );
});

export default BookDetails;
