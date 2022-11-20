import { FC, memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Review from "./Review";
import ReviewForm from "./ReviewForm";

import { getReviewsByBookId } from "../../../api/RateApi";
import { IReviewsPage } from "../../../types/IReviewsPage";
import { IPaginationParams } from "../../../types/IPaginationParams";

import "./Review.css"
import { Pagination, Row } from "antd";

interface IReviewBlockProps {
    bookId: string
}

const initialPaginationParams = {
    pageNumber: 1,
    pageSize: 10
}

const ReviewBlock: FC<IReviewBlockProps> = memo(({ bookId }: IReviewBlockProps) => {
    const [reviewsPage, setReviewsPage] = useState<IReviewsPage>();
    const [paginationParams, setPaginationParams] = useState<IPaginationParams>(initialPaginationParams);
    const { t } = useTranslation();

    const fetchRate = useCallback(() => {
        getReviewsByBookId(bookId, paginationParams)
            .then((response: { data: IReviewsPage }) => {
                setReviewsPage(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }, [setReviewsPage, bookId, paginationParams])

    useEffect(() => {
        fetchRate();
    }, [fetchRate])

    const onAddReview = useCallback(() => {
        fetchRate();
    }, [fetchRate]);

    const handleChange = useCallback((page: number, pageSize: number) => {
        setPaginationParams((prevQueryParams: IPaginationParams) => {
            let newQueryParams = { ...prevQueryParams, pageSize: pageSize, pageNumber: page };
            return newQueryParams;
          });
      }, []);

    return (
        <div className="book-review-block">
            <h2>
                {t("book.reviews")}
            </h2>
            <ReviewForm
                bookId={bookId}
                onAddReview={onAddReview}
            />
            {
                reviewsPage?.reviews.map(r =>
                    <Review
                        key={r.user.id}
                        review={r}
                    />
                )
            }
            <Row justify="center" className="book-pagination">
                <Pagination
                    pageSizeOptions={[10, 20, 40]}
                    total={reviewsPage?.totalReviewsNumber}
                    current={paginationParams.pageNumber}
                    pageSize={paginationParams.pageSize}
                    onChange={handleChange}
                />
            </Row>
        </div>
    );
});

export default ReviewBlock;
