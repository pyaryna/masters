import { IRate } from "../types/IRate";
import instanceApi from "../utils/instanceApi";

const getRateByBookId = async (id: string) => {
    return await instanceApi.get<IRate>(`rate/${id}`);
};

export { getRateByBookId };
