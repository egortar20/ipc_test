import { Model } from "./model";

export interface BookModel extends Model<BookModel> {

    id: number;
    title: string;
    description: string;
    author_id: number;

}