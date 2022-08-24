import { IAuthor } from "./IAuthor";
import { IGanre } from "./IGanre";
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
    ganres: IGanre[]
}