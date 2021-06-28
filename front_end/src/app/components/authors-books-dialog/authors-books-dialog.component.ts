import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthorModel } from 'src/app/models/author.model';
import { AppAPIService } from 'src/app/servises';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { BookModel } from 'src/app/models/book.model';
import { MatPaginator } from '@angular/material/paginator';
import { AddBookDialogComponent } from '../add-book-dialog/add-book-dialog.component';
import { AddBookDialogService } from '../add-book-dialog/add-book-dialog.service';
import { mergeMap } from 'rxjs/operators';


@Component({
  selector: 'app-authors-books-dialog',
  templateUrl: './authors-books-dialog.component.html',
  styleUrls: ['./authors-books-dialog.component.scss']
})
export class AuthorsBooksDialogComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'title', 'description', 'actions'];

  dataSource = new MatTableDataSource<BookModel>();

  @ViewChild(MatPaginator) paginator: MatPaginator | null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public author: AuthorModel,
    public appApi: AppAPIService,
    public ref: ChangeDetectorRef,
    public dialog: MatDialog,
    public addBookDialogService: AddBookDialogService,
  ) {
    this.paginator = null;
  }

  ngOnInit() {
    this.appApi.getBooksByAuthor(this.author.id)
      .subscribe((res: BookModel[]) => {
        this.dataSource = new MatTableDataSource<BookModel>(res);
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private deleteRow(bookId: number, paginator: MatPaginator | null, dataSource: MatTableDataSource<BookModel>): void {
    const itemIndex = this.dataSource.data.findIndex(obj => obj['id'] === bookId)
    dataSource.data.splice(itemIndex, 1);
    dataSource.paginator = paginator;
  }

  public showTable(): boolean {
    return this.dataSource.data.length > 0;
  }

  public deleteBook(book: BookModel): void {
    this.appApi.deleteBook(book.id)
      .subscribe(() => {
        this.deleteRow(book.id, this.paginator, this.dataSource);
      })

  }

  public addBookDialog(author: AuthorModel): void{
    this.addBookDialogService.openDialog(author)
      .pipe(
        mergeMap(() =>
        this.appApi.getBooksByAuthor(this.author.id))
      )
      .subscribe((res: BookModel[]) => {
        this.dataSource = new MatTableDataSource<BookModel>(res);
        this.dataSource.paginator = this.paginator;
      });
  }


}
