import { Model } from "./model";

export interface AuthorCreateModel extends Model<AuthorCreateModel> {

    name: string;
    country: string;
}