import { FC, memo, useCallback } from "react";
import { Col, Input, Row, Select } from "antd";
import { useTranslation } from "react-i18next";

import { IBookQueryParams } from "../../types/IBookQueryParams";

import "./Filter.css"

const { Option } = Select;

interface ISorterProps {
    queryParams: IBookQueryParams,
    onSorterOrSearchChange: (name: string, newValue: string) => void
}

const Sorter: FC<ISorterProps> = memo(({ queryParams, onSorterOrSearchChange }: ISorterProps) => {
    const { t } = useTranslation();

    const handleChange = useCallback((value: string) => {
        onSorterOrSearchChange("sort", value)
    }, [onSorterOrSearchChange]);

    const searchBook = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        onSorterOrSearchChange("searchValue", (event.target as HTMLInputElement).value)
    }, [onSorterOrSearchChange]);

    return (
        <Row align="middle" justify="end" className="book-sorter">
            <Col span={2}>
                {t("filtration.sort-by")}
            </Col>
            <Col span={5}>
                <Select
                    popupClassName="book-sort-select"
                    value={ queryParams.orderByDesc === undefined ? undefined : (queryParams.orderByDesc ? "down" : "up") }
                    onChange={handleChange}
                >
                    <Option value="up">{t("filtration.sort-option.price-up")}</Option>
                    <Option value="down">{t("filtration.sort-option.price-down")}</Option>
                </Select>
            </Col>
            <Col span={6}>
                <Input
                    placeholder={`${t("search")}...`}
                    onPressEnter={searchBook}
                >
                </Input>
            </Col>
        </Row>
    );
});

export default Sorter;
