import { IAuthor } from "./IAuthor";
import { IGenre } from "./IGenre";
import { IPublisher } from "./IPublisher";

export interface IBookPreview {
    id: string,    
    title: string,
    price: number,
    imageUrl:string,
    similarityRate?: number,

    author: IAuthor,
    publisher: IPublisher,
    genres: IGenre[]
}