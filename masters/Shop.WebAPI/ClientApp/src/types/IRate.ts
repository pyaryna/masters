import { IReview } from "./IReview";

export interface IRate {
    id: string,    
    bookId: string,
    reviews : IReview[]
}