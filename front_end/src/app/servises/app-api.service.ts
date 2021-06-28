import { Injectable } from '@angular/core';
import { AuthorModel } from '../models/author.model';
import { BookModel } from '../models/book.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookCreateModel } from '../models/book-create.model';
import { AuthorCreateModel } from '../models/author-create.model';

@Injectable({
  providedIn: 'root'
})
export class AppAPIService {

  private backEndHost = 'http://localhost:5555';

  constructor(private httpClient: HttpClient) { }

  public getAuthors(): Observable<AuthorModel[]> {
    return this.httpClient.get<AuthorModel[]>(this.backEndHost + '/authors/get');
  }

  public deleteAuthor(authorId: number): Observable<any> {
    return this.httpClient.delete(this.backEndHost + '/author/del/' + authorId)
  }

  public getBooksByAuthor(authorId: number): Observable<BookModel[]> {
    return this.httpClient.get<BookModel[]>(this.backEndHost + '/book/get/by_author/' + authorId);
  }

  public deleteBook(bookId: number): Observable<any> {
    return this.httpClient.delete(this.backEndHost + '/book/del/' + bookId);
  }

  public addBook(title: string, description: string, author_id: number): Observable<any> {
    const body: BookCreateModel = {
      title: title,
      description: description,
      author_id: author_id
    };
    return this.httpClient.post(this.backEndHost + '/book/add', body);
  }

  public addAuthor(name: string, country: string): Observable<any> {
    const body: AuthorCreateModel = {
      name: name,
      country: country
    }
    return this.httpClient.post(this.backEndHost + '/author/add', body)
  }

}
