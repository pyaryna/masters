import { FC, memo, useCallback, useEffect, useState } from "react";
import { Col, InputNumber, Row, Slider } from "antd";

import "./Filter.css"

interface IPriceFilterProps {
    onFilterChange: Function,
    minPrice: number,
    maxPrice: number
}

const PriceFilter: FC<IPriceFilterProps> = memo(({ onFilterChange, minPrice, maxPrice }: IPriceFilterProps) => {
    const [price, setPrice] = useState<[number, number]>([minPrice, maxPrice]);

    const onChange = useCallback((newValue: [number, number]) => {
        setPrice(newValue);
    }, []);

    useEffect(()=>{
        setPrice([minPrice, maxPrice]);
    }, [minPrice, maxPrice])

    return (
        <div className="price-slider">
            <Row align="middle" justify="space-around">
                <Col span={8}>
                    <InputNumber
                        min={minPrice}
                        max={maxPrice}
                        value={price[0]}
                        controls={false}
                        onChange={(value: number) => setPrice([value, price[1]])}
                    />
                </Col>
                <Col>
                -
                </Col>
                <Col span={8}>
                    <InputNumber
                        min={minPrice}
                        max={maxPrice}
                        value={price[1]}
                        controls={false}
                        onChange={(value: number) => setPrice([price[0], value])}
                    />
                </Col>
            </Row>
            <Slider
                    range
                    onChange={onChange}
                    value={[price[0], price[1]]}
                    trackStyle={[{backgroundColor:"#FFAA66"}]}
                    handleStyle={[{borderColor:"#FFAA66"}, {borderColor:"#FFAA66"}]}
                />
        </div>
    );
});

export default PriceFilter;
