import { IBaseUser } from "../types/IBaseUser";
import instanceApi from "../utils/instanceApi";

const getBaseUsers = async () => {
    return await instanceApi.get<IBaseUser[]>('user');
};

export { getBaseUsers };
