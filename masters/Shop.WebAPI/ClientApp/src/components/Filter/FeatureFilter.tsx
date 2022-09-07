import { ChangeEvent, FC, memo, useCallback, useEffect, useState } from "react";
import { Checkbox, Input } from "antd";

import "./Filter.css"

interface IFeatureFilterProps {
    features: { id: string, name: string }[];
    onFilterChange: Function;
}

const FeatureFilter: FC<IFeatureFilterProps> = memo(({ features, onFilterChange }: IFeatureFilterProps) => {
    const [data, setData] = useState<{ id: string, name: string }[]>(features);

    useEffect(() => {
        setData(features);
    }, [features]);

    const onChange = useCallback((checkedValues: any[]) => {
        console.log('checked = ', checkedValues);
    }, []);

    const searchFeature = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "") {
            setData(features);
        }
        else {
            let filteredData = features.filter(d => d.name.includes(event.target.value));
            setData(filteredData);
        }
    }, [features]);

    return (
        <div className="feature-filter">
            <Input
                placeholder="Search..."
                onChange={searchFeature}
            />
            <Checkbox.Group onChange={onChange}>
                {
                    data?.map(d =>
                        <div key={d.id}>
                            <Checkbox
                                value={d.id}>
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
