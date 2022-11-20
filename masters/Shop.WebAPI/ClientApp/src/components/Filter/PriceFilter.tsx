import { FC, memo, useCallback } from "react";
import { Col, InputNumber, Row, Slider } from "antd";

import { FilterChangeFunction } from "../../types/FilterChangeFunction";

import "./Filter.css"

interface IPriceFilterProps {
    onFilterChange: FilterChangeFunction,
    minPrice: number,
    maxPrice: number,
    currentValue: [number, number]
}

const PriceFilter: FC<IPriceFilterProps> = memo(({ onFilterChange, minPrice, maxPrice, currentValue }: IPriceFilterProps) => {
    const onChange = useCallback((newValue: [number, number]) => {
        onFilterChange("price", newValue);
    }, [onFilterChange]);

    return (
        <div className="price-slider">
            <Row align="middle" justify="space-around">
                <Col span={10}>
                    <InputNumber
                        min={minPrice}
                        max={maxPrice}
                        value={currentValue[0]}
                        controls={false}
                        onChange={(value: number) => onChange([value, currentValue[1]])}
                    />
                </Col>
                <Col>
                -
                </Col>
                <Col span={10}>
                    <InputNumber
                        min={minPrice}
                        max={maxPrice}
                        value={currentValue[1]}
                        controls={false}
                        onChange={(value: number) => onChange([currentValue[0], value])}
                    />
                </Col>
            </Row>
            <Slider
                    range
                    onChange={onChange}
                    min={minPrice}
                    max={maxPrice + 1}
                    value={[currentValue[0], currentValue[1]]}
                    trackStyle={[{backgroundColor:"#FFAA66"}]}
                    handleStyle={[{borderColor:"#FFAA66"}, {borderColor:"#FFAA66"}]}
                />
        </div>
    );
});

export default PriceFilter;
