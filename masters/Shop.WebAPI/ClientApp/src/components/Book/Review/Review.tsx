import { FC, memo } from "react";
import moment from "moment";
import { Col, Rate, Row } from "antd";

import { IReview } from "../../../types/IReview";

interface IReviewProps {
    review: IReview
}

const Review: FC<IReviewProps> = memo(({ review }: IReviewProps) => {
    return (
        <div className="book-review">
            <Row>
                <Col span={8}>
                    <div className="book-review-user">
                        {review.user.name}
                    </div>
                    <div className="book-review-date">
                        {moment(review.createdAt).format('DD/MM/YYYY')}
                    </div>
                    <div>
                        <Rate 
                        allowHalf 
                        disabled
                        value={review.rate}
                        style={{ color: "#FFAA66", fontSize: "1rem" }}
                        />
                    </div>
                </Col>
                <Col span={16}>
                    <div>
                        {review.comment}
                    </div>
                </Col>
            </Row>
        </div>
    );
});

export default Review;
