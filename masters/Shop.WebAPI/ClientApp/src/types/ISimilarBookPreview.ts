import { IBookPreview } from "./IBookPreview";

export interface ISimilarBookPreview extends IBookPreview {
    similarityRate: number
}