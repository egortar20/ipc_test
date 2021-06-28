export class Model<T> {
    constructor(params: Partial<T>) {
        Object.assign(this, params);
    }
}