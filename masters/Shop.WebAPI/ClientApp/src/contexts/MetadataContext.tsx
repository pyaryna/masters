import { useState, createContext, ReactNode, useCallback, useEffect } from 'react';

import { IMetadata } from '../types/IMetadata';
import { getBookMetadata } from '../api/MetadataApi';

type MetadataAction = React.Dispatch<React.SetStateAction<IMetadata>>;

export const MetadataContext = createContext<[IMetadata, MetadataAction]>({} as [IMetadata, MetadataAction]);

export const MetadataProvider = (props : {children : ReactNode}) => {
    const [metadata, setMetadata] = useState<IMetadata>({} as IMetadata);

    const fetchMetadata = useCallback(() => {
        getBookMetadata()
          .then((response: { data: IMetadata }) => {
            setMetadata(response.data);
            console.log(response.data);
          })
          .catch((e: Error) => {
            console.log(e);
          });
      }, []);
    
      useEffect(() => {
        fetchMetadata();
      }, [fetchMetadata]);

    return (
        <MetadataContext.Provider value={[metadata, setMetadata]}>
            {props.children}
        </MetadataContext.Provider>
    );
}
