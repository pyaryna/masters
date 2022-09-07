import { FC, memo } from "react";
import { Collapse } from "antd";

import PriceFilter from "./PriceFilter";
import FeatureFilter from "./FeatureFilter";

import "./Filter.css"

const { Panel } = Collapse;

interface IFilterProps {
  onFilterChange: Function
}

const features = [{
  id: 1,
  name: "string 1"
},
{
  id: 2,
  name: "string 2"
},
{
  id: 3,
  name: "string 3"
}]

const Filter: FC<IFilterProps> = memo(({ onFilterChange }: IFilterProps) => {
  return (
    <div className="book-filter">
      <Collapse
        bordered={false}
        defaultActiveKey={['1']}
        expandIconPosition="right"
      >
        <Panel header="Author" key="1">
          <FeatureFilter features={features} onFilterChange={onFilterChange} />
        </Panel>    
        <Panel header="Price" key="2">
          <PriceFilter onFilterChange={onFilterChange} minPrice={0} maxPrice={100} />
        </Panel>
        <Panel header="Publishing" key="3">
          <FeatureFilter features={features} onFilterChange={onFilterChange} />
        </Panel>
        <Panel header="Genres" key="4">
          <FeatureFilter features={features} onFilterChange={onFilterChange} />
        </Panel>
      </Collapse>
    </div>
  );
});

export default Filter;
