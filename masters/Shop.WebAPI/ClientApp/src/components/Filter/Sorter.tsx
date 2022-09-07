import { ChangeEvent, FC, memo, useCallback } from "react";
import { Col, Input, Row, Select } from "antd";

import "./Filter.css"

const { Option } = Select;

interface ISorterProps {
    onSorterChange: Function
}

const Sorter: FC<ISorterProps> = memo(({ onSorterChange }: ISorterProps) => {
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const searchBook = useCallback((event: ChangeEvent<HTMLInputElement>) => {

    }, []);

    return (
        <Row justify="end" className="book-sorter">
            <Col span={6}>
                Sort by
                <Select onChange={handleChange}>
                    <Option value="priceDown">Price up</Option>
                    <Option value="priceUp">Price down</Option>
                    <Option value="alphabetUp">Alphabet up</Option>
                    <Option value="alphabetDown">Alphabet down</Option>
                </Select>
            </Col>
            <Col span={6}>
                <Input
                    placeholder="Search..."
                    onChange={searchBook}
                >
                </Input>
            </Col>
        </Row>
    );
});

export default Sorter;
