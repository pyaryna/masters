import { IMetadata } from "../types/IMetadata";
import instanceApi from "../utils/instanceApi";

const getBooksMetadata = async () => {
    return await instanceApi.get<IMetadata>('metadata');
};

export { getBooksMetadata };
