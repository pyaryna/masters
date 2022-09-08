import { useState, createContext, ReactNode, useEffect, FC, memo } from 'react';

import { IBookQueryParams } from '../types/IBookQueryParams';
import { BooksSortingOption } from '../types/BooksSortingOption';

type FilterAction = React.Dispatch<React.SetStateAction<IBookQueryParams>>;

export const FilterContext = createContext<[IBookQueryParams, FilterAction]>({} as [IBookQueryParams, FilterAction]);

const initialQueryParams = {
    sortBy: BooksSortingOption.None,
    //pageNumber: pagination.pageNumber,
    //pageSize: pagination.pageSize,
}

export const FilterProvider: FC<{ children: ReactNode }> = memo((props: { children: ReactNode }) => {
    const [filter, setFilter] = useState<IBookQueryParams>(initialQueryParams);

    useEffect(() => {
        setFilter(initialQueryParams)
    }, []);

    return (
        <FilterContext.Provider value={[filter, setFilter]}>
            {props.children}
        </FilterContext.Provider>
    );
}
);