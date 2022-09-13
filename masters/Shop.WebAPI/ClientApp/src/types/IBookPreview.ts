export interface IBookPreview {
    id: string,    
    title: string,
    price: number,
    imageUrl:string,    
    author: string,
    similarityRate?: number
}