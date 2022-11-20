import { IReview } from "./IReview";

export interface IReviewsPage{
    reviews: IReview[],
    totalReviewsNumber: number
}