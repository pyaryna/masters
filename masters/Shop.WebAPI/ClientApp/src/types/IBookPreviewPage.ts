import { IBookPreview } from "./IBookPreview";
import { IBookPageInfo } from "./IBookPageInfo";

export interface IBookPreviewPage {
    books: IBookPreview[],
    pageInfo: IBookPageInfo
}