import { useState, createContext, ReactNode, useCallback, useEffect, FC, memo } from 'react';

import { IMetadata } from '../types/IMetadata';
import { getBookMetadata } from '../api/MetadataApi';

export const MetadataContext = createContext<IMetadata>({} as IMetadata);

export const MetadataProvider: FC<{ children: ReactNode }> = memo((props: { children: ReactNode }) => {
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
    <MetadataContext.Provider value={metadata}>
      {props.children}
    </MetadataContext.Provider>
  );
}
);