import { FC, memo, useCallback, useContext, useState } from "react";
import { Button, Collapse, Form, Input, notification, Rate } from "antd";
import { useTranslation } from "react-i18next";

import { IError } from "../../../types/IError";
import { addReview } from "../../../api/RateApi";
import { IAddReview } from "../../../types/IAddReview";
import { UserContext } from "../../../contexts/UserContext";

import "./Review.css"

const { Panel } = Collapse;

interface IReviewFormProps {
    bookId: string,
    onAddReview: Function
}

const ReviewForm: FC<IReviewFormProps> = memo(({ bookId, onAddReview }: IReviewFormProps) => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [user] = useContext(UserContext);
    const [open, setOpen] = useState<number[]>([-1]);

    const onFinish = useCallback(() => {
        form.validateFields().then((values: IAddReview) => {
            if (user) {
                const itemToSend: IAddReview = {
                    ...values,
                    user: user,
                    bookId: bookId,
                    createdAt: new Date()
                };
                console.log(itemToSend);
                addReview(itemToSend)
                    .then(() => {
                        onAddReview();
                        form.resetFields();
                        setOpen([]);
                    })
                    .catch((e: IError) => {
                        console.log(e);
                        notification.open({
                            message: 'Error adding new review',
                            description: e.data
                        });
                    });
            }
        });
    }, [form, user, bookId]);

    console.log(user);

    return (
        <Collapse
            ghost
            className="review-form"
            activeKey={open}
            onChange={() => setOpen(prev => [1])}
        >
            <Panel
                showArrow={false}
                header=""
                extra={
                    <Button
                        type="text"
                        className="add-review-btn"
                    >
                        {t("book.add-review")}
                    </Button>
                }
                key="1"
            >
                <h3>
                    {t("book.add-review")}
                </h3>
                <Form
                    form={form}
                    name="review"
                    onFinish={onFinish}
                >
                    <Form.Item
                        hidden={true}
                        initialValue={bookId}
                    ></Form.Item>
                    <Form.Item
                        hidden={true}
                        initialValue={user}
                    ></Form.Item>
                    <Form.Item
                        name="rate"
                        initialValue={0}
                    >
                        <Rate
                            allowHalf
                            style={{ color: "#FFAA66", fontSize: "1rem" }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="comment"
                        rules={[
                            { required: true, message: "Please write your comment!" },
                        ]}
                    >
                        <Input.TextArea className="review-text-area" />
                    </Form.Item>
                    <Form.Item
                    >
                        <Button
                            htmlType="submit"
                            className="review-submit-btn"
                        >
                            {t("book.submit")}
                        </Button>
                    </Form.Item>
                </Form>
            </Panel>
        </Collapse>
    );
});

export default ReviewForm;
