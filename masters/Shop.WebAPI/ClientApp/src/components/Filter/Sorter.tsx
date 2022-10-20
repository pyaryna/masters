import { ChangeEvent, FC, memo, useCallback } from "react";
import { Col, Input, Row, Select } from "antd";
import { useTranslation } from "react-i18next";

import "./Filter.css"

const { Option } = Select;

interface ISorterProps {
    onSorterChange: Function
}

const Sorter: FC<ISorterProps> = memo(({ onSorterChange }: ISorterProps) => {
    const { t } = useTranslation();

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const searchBook = useCallback((event: ChangeEvent<HTMLInputElement>) => {

    }, []);

    return (
        <Row align="middle" justify="end" className="book-sorter">
            <Col span={2}>
                {t("filtration.sort-by")}
            </Col>
            <Col span={4}>
                <Select onChange={handleChange}>
                    <Option value="priceDown">Price up</Option>
                    <Option value="priceUp">Price down</Option>
                    <Option value="alphabetUp">Alphabet up</Option>
                    <Option value="alphabetDown">Alphabet down</Option>
                </Select>
            </Col>
            <Col span={6}>
                <Input
                    placeholder={`${t("search")}...`}
                    onChange={searchBook}
                >
                </Input>
            </Col>
        </Row>
    );
});

export default Sorter;
