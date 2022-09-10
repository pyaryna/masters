import { FC, memo, useCallback, useState } from "react";
import { Button, Collapse, Form, Input, Rate } from "antd";

import { IRate } from "../../../types/IRate";

import "./Review.css"

const { Panel } = Collapse;

interface IReviewFormProps {
    bookId: string
}

const ReviewForm: FC<IReviewFormProps> = memo(({ bookId }: IReviewFormProps) => {
    const [rate, setRate] = useState<IRate>();

    const onFinish = useCallback(() => {
        console.log();
    }, []);

    return (
        <Collapse
            ghost
            className="review-form"
        >
            <Panel
                showArrow={false}
                header=""
                extra={
                    <Button
                        type="text"
                        className="add-review-btn"
                    >
                        Add new review
                    </Button>
                }
                key="1"
            >
                <h3>
                    Add new review
                </h3>
                <Form
                    name="review"
                    onFinish={onFinish}
                >
                    <Form.Item

                    >
                        <Rate
                            allowHalf
                            style={{ color: "#FFAA66", fontSize: "1rem" }}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input.TextArea>
                        </Input.TextArea>
                    </Form.Item>
                    <Form.Item>
                        <Button 
                        htmlType="submit"
                        className="review-submit-btn"
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Panel>
        </Collapse>
    );
});

export default ReviewForm;
