import { IMetadata } from "../types/IMetadata";
import instanceApi from "../utils/instanceApi";

const getBookMetadata = async () => {
    return await instanceApi.get<IMetadata>('metadata');
};

export { getBookMetadata };
