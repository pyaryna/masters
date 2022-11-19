import { ChangeEvent, FC, memo, useCallback, useEffect, useState } from "react";
import { Checkbox, Input } from "antd";
import { useTranslation } from "react-i18next";

import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { FilterChangeFunction } from "../../types/FilterChangeFunction";

import "./Filter.css";

interface IFeatureFilterProps {
    name: string,
    currentValue: string[],
    features: { id: string, name: string }[];
    onFilterChange: FilterChangeFunction;
}

const FeatureFilter: FC<IFeatureFilterProps> = memo(({ name, currentValue, features, onFilterChange }: IFeatureFilterProps) => {
    const [data, setData] = useState<{ id: string, name: string }[]>(features);
    const { t } = useTranslation();

    useEffect(() => {
        setData(features);
    }, [features]);

    const onChange = useCallback((checkedValues: CheckboxValueType[]) => {
        onFilterChange(name, checkedValues)
    }, [name]);

    const searchFeature = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "") {
            setData(features);
        }
        else {
            let filteredData = features.filter(d => d.name.toLowerCase().includes(event.target.value));
            setData(filteredData);
        }
    }, [features]);

    return (
        <div className="feature-filter">
            <Input
                placeholder={`${t("search")}...`}
                onChange={searchFeature}
            />
            <Checkbox.Group onChange={onChange}>
                {
                    data?.map(d =>
                        <div key={d.id}>
                            <Checkbox
                                value={d.id}
                                checked={currentValue.includes(d.id)}
                            >
                                {d.name}
                            </Checkbox>
                        </div>
                    )
                }
            </Checkbox.Group>
        </div>
    );
});

export default FeatureFilter;
