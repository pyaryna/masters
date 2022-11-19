import { FC, memo, useContext } from "react";
import { Collapse } from "antd";
import { useTranslation } from "react-i18next";

import PriceFilter from "./PriceFilter";
import FeatureFilter from "./FeatureFilter";

import { IBookQueryParams } from "../../types/IBookQueryParams";
import { MetadataContext } from "../../contexts/MetadataContext";
import { FilterChangeFunction } from "../../types/FilterChangeFunction";

import "./Filter.css"

const { Panel } = Collapse;

interface IFilterProps {
  queryParams: IBookQueryParams;
  onFilterChange: FilterChangeFunction;
  maxPrice: number;
  minPrice: number;
}

const Filter: FC<IFilterProps> = memo(({ queryParams, onFilterChange, maxPrice, minPrice }: IFilterProps) => {
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
          <FeatureFilter
            name="authorIds"
            currentValue={queryParams.authors || []}
            features={metadata?.authors || []}
            onFilterChange={onFilterChange}
          />
        </Panel>
        <Panel header={t("filtration.price")} key="2">
          <PriceFilter
            onFilterChange={onFilterChange}
            minPrice={minPrice}
            maxPrice={minPrice}
            currentValue={[queryParams.priceStart || minPrice, queryParams.priceEnd || maxPrice]}
          />
        </Panel>
        <Panel header={t("publishing")} key="3">
          <FeatureFilter
            name="publisherIds"
            currentValue={queryParams.publishers || []}
            features={metadata?.publishers || []}
            onFilterChange={onFilterChange}
          />
        </Panel>
        <Panel header={t("genres")} key="4">
          <FeatureFilter
            name="genreIds"
            currentValue={queryParams.genres || []}
            features={metadata?.genres || []}
            onFilterChange={onFilterChange}
          />
        </Panel>
      </Collapse>
    </div>
  );
});

export default Filter;
