import { IBaseUser } from "./IBaseUser";

export interface IReview {
    user: IBaseUser,    
    rate: number,
    comment: string,
    createdAt: Date
}