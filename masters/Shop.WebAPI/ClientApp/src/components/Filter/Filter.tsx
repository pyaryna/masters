import { FC, memo, useContext } from "react";
import { Collapse } from "antd";

import PriceFilter from "./PriceFilter";
import FeatureFilter from "./FeatureFilter";

import { MetadataContext } from "../../contexts/MetadataContext";

import "./Filter.css"

const { Panel } = Collapse;

interface IFilterProps {
  onFilterChange: Function
}

const Filter: FC<IFilterProps> = memo(({ onFilterChange }: IFilterProps) => {
  const [metadata, setMetadata] = useContext(MetadataContext);

  return (
    <div className="book-filter">
      <Collapse
        bordered={false}
        defaultActiveKey={['1']}
        expandIconPosition="right"
      >
        <Panel header="Author" key="1">
          <FeatureFilter features={metadata?.authors || []} onFilterChange={onFilterChange} />
        </Panel>
        <Panel header="Price" key="2">
          <PriceFilter onFilterChange={onFilterChange} minPrice={0} maxPrice={100} />
        </Panel>
        <Panel header="Publishing" key="3">
          <FeatureFilter features={metadata?.publishers || []} onFilterChange={onFilterChange} />
        </Panel>
        <Panel header="Genres" key="4">
          <FeatureFilter features={metadata?.genres || []} onFilterChange={onFilterChange} />
        </Panel>
      </Collapse>
    </div>
  );
});

export default Filter;
