import { IAuthor } from "./IAuthor";
import { IGenre } from "./IGenre";
import { IPublisher } from "./IPublisher";

export interface IBook {
    id: string,    
    title: string,
    description: string,
    price: number,
    ISBN: string,
    pageCount: number,
    language: string,
    publishedDate: Date,
    imageUrl:string,

    author: IAuthor,
    publisher: IPublisher,
    genres: IGenre[]
}