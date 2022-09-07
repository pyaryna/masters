import { IAuthor } from "./IAuthor";
import { IGenre } from "./IGenre";
import { IPublisher } from "./IPublisher";

export interface IMetadata {
    authors: IAuthor[],
    publishers: IPublisher[],
    genres: IGenre[]
}