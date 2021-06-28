import { Model } from "./model";

export interface AuthorModel extends Model<AuthorModel> {
    
    id: number;
    name: string;
    country: string;
}