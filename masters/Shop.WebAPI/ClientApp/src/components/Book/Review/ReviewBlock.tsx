import { FC, memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Review from "./Review";
import ReviewForm from "./ReviewForm";

import { IRate } from "../../../types/IRate";
import { getRateByBookId } from "../../../api/RateApi";

import "./Review.css"

interface IReviewBlockProps {
    bookId: string
}

const ReviewBlock: FC<IReviewBlockProps> = memo(({ bookId }: IReviewBlockProps) => {
    const [rate, setRate] = useState<IRate>();
    const { t } = useTranslation();

    const fetchRate = useCallback(() => {
        getRateByBookId(bookId)
            .then((response: { data: IRate }) => {
                setRate(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }, [setRate, bookId])

    useEffect(() => {
        fetchRate();
    }, [fetchRate])

    const onAddReview = useCallback(() => {
        fetchRate();
    }, [fetchRate])

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
                rate?.reviews.map(r =>
                    <Review
                        key={r.user.id}
                        review={r}
                    />
                )
            }
        </div>
    );
});

export default ReviewBlock;
