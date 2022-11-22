import { FC, memo, useCallback, useContext, useEffect, useState } from "react";
import { Button, Collapse, Row } from "antd";
import { useTranslation } from "react-i18next";

import PriceFilter from "./PriceFilter";
import FeatureFilter from "./FeatureFilter";

import { MetadataContext } from "../../contexts/MetadataContext";
import { IBookFilter, IBookQueryParams } from "../../types/IBookQueryParams";

import "./Filter.css"
import { CheckboxValueType } from "antd/lib/checkbox/Group";

const { Panel } = Collapse;

interface IFilterProps {
  queryParams: IBookQueryParams;
  onFilterSubmit: (values: IBookFilter) => void;
  maxCurrentPrice: number;
  minCurrentPrice: number;
}

const Filter: FC<IFilterProps> = memo(({ queryParams, onFilterSubmit, maxCurrentPrice, minCurrentPrice }: IFilterProps) => {
  const metadata = useContext(MetadataContext);
  const [filterValues, setFilterValues] = useState<IBookFilter>();
  const { t } = useTranslation();

  useEffect(() => {
    setFilterValues(queryParams);
  }, [queryParams])

  const onButtonClick = useCallback(() => {
    let newFilterValue = {
      authorIds: filterValues?.authorIds,
      publisherIds: filterValues?.publisherIds,
      genreIds: filterValues?.genreIds,
      priceStart: filterValues?.priceStart,
      priceEnd: filterValues?.priceEnd
    }
    onFilterSubmit(newFilterValue);
  }, [onFilterSubmit, filterValues]);

  const onFilterChange = useCallback((name: string, checkedValues: CheckboxValueType[]) => {
    setFilterValues((prevQueryParams: IBookQueryParams) => {
      let newQueryParams = { ...prevQueryParams };
      if (name === "price") {
        newQueryParams.priceStart = checkedValues[0] as number;
        newQueryParams.priceEnd = checkedValues[1] as number;
      }
      else {
        newQueryParams[name] = checkedValues as string[];
      }
      return newQueryParams;
    });
  }, [setFilterValues]);

  return (
    <div className="book-filter">
      <Collapse
        bordered={false}
        defaultActiveKey={['1']}
        expandIconPosition="end"
      >
        <Panel header={t("filtration.author")} key="1">
          <FeatureFilter
            name="authorIds"
            currentValue={filterValues?.authorIds || []}
            features={metadata?.authors || []}
            onFilterChange={onFilterChange}
          />
        </Panel>
        <Panel header={`${t("filtration.price")} (USD)`} key="2">
          <PriceFilter
            onFilterChange={onFilterChange}
            minPossiblePrice={metadata?.minBookPrice || 0}
            maxPossiblePrice={metadata?.maxBookPrice || 0}
            currentValue={[filterValues?.priceStart || minCurrentPrice, filterValues?.priceEnd || maxCurrentPrice]}
          />
        </Panel>
        <Panel header={t("publishing")} key="3">
          <FeatureFilter
            name="publisherIds"
            currentValue={filterValues?.publisherIds || []}
            features={metadata?.publishers || []}
            onFilterChange={onFilterChange}
          />
        </Panel>
        <Panel header={t("genres")} key="4">
          <FeatureFilter
            name="genreIds"
            currentValue={filterValues?.genreIds || []}
            features={metadata?.genres || []}
            onFilterChange={onFilterChange}
          />
        </Panel>
      </Collapse>
      <Row justify="end">
        <Button 
          className="apply-btn"
          onClick={onButtonClick}
        >
          {t("filtration.apply")}
        </Button>
      </Row>
    </div>
  );
});

export default Filter;
