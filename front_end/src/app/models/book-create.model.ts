import { Model } from "./model";

export interface BookCreateModel extends Model<BookCreateModel> {

    title: string;
    description: string;
    author_id: number;

}