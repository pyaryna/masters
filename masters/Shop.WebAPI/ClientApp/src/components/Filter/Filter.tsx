import { FC, memo, useContext } from "react";
import { Collapse } from "antd";
import { useTranslation } from "react-i18next";

import PriceFilter from "./PriceFilter";
import FeatureFilter from "./FeatureFilter";

import { MetadataContext } from "../../contexts/MetadataContext";

import "./Filter.css"

const { Panel } = Collapse;

interface IFilterProps {
  onFilterChange: Function
}

const Filter: FC<IFilterProps> = memo(({ onFilterChange }: IFilterProps) => {
  const metadata = useContext(MetadataContext);
  const { t } = useTranslation();

  return (
    <div className="book-filter">
      <Collapse
        bordered={false}
        defaultActiveKey={['1']}
        expandIconPosition="right"
      >
        <Panel header={t("filtration.author")} key="1">
          <FeatureFilter features={metadata?.authors || []} onFilterChange={onFilterChange} />
        </Panel>
        <Panel header={t("filtration.price")} key="2">
          <PriceFilter onFilterChange={onFilterChange} minPrice={0} maxPrice={100} />
        </Panel>
        <Panel header={t("publishing")} key="3">
          <FeatureFilter features={metadata?.publishers || []} onFilterChange={onFilterChange} />
        </Panel>
        <Panel header={t("genres")} key="4">
          <FeatureFilter features={metadata?.genres || []} onFilterChange={onFilterChange} />
        </Panel>
      </Collapse>
    </div>
  );
});

export default Filter;
