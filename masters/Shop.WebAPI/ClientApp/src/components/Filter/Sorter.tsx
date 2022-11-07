import { ChangeEvent, FC, memo, useCallback, useState } from "react";
import { Col, Input, Row, Select } from "antd";
import { useTranslation } from "react-i18next";

import "./Filter.css"

const { Option } = Select;

interface ISorterProps {
    onSorterChange: Function
}

const Sorter: FC<ISorterProps> = memo(({ onSorterChange }: ISorterProps) => {
    const { t } = useTranslation();
    const [sortValue, setSortValue] = useState<string>();

    const handleChange = useCallback((value: string) => {
        console.log(`selected ${value}`);
        setSortValue(value);
    }, [setSortValue]);

    const searchBook = useCallback((event: ChangeEvent<HTMLInputElement>) => {

    }, []);

    return (
        <Row align="middle" justify="end" className="book-sorter">
            <Col span={2}>
                {t("filtration.sort-by")}
            </Col>
            <Col span={5}>
                <Select
                    value={sortValue}
                    onChange={handleChange}
                >
                    <Option value="priceDown">{t("filtration.sort-option.price-up")}</Option>
                    <Option value="priceUp">{t("filtration.sort-option.price-down")}</Option>
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
