import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthorModel } from 'src/app/models/author.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AppAPIService } from 'src/app/servises';
import { MatDialog } from '@angular/material/dialog';
import { AuthorsBooksDialogComponent } from '../authors-books-dialog/authors-books-dialog.component';
import { AddAuthorDialogService } from '../add-author-dialog/add-author-dialog.service';
import { mergeMap } from 'rxjs/operators';


@Component({
  selector: 'app-authors-table',
  templateUrl: './authors-table.component.html',
  styleUrls: ['./authors-table.component.scss']
})
export class AuthorsTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'country', 'actions'];

  dataSource = new MatTableDataSource<AuthorModel>();

  @ViewChild(MatPaginator) paginator: MatPaginator | null;

  constructor(
    public appApi: AppAPIService, 
    public dialog: MatDialog,
    public addAuthorDialogService: AddAuthorDialogService,
  ) { 
    this.paginator = null;
  }

  private deleteRow(authorId: number, paginator: MatPaginator | null, dataSource: MatTableDataSource<AuthorModel>): void {
    const itemIndex = this.dataSource.data.findIndex(obj => obj['id'] === authorId)
    dataSource.data.splice(itemIndex, 1);
    dataSource.paginator = paginator;
  }

  ngOnInit() {
    this.appApi.getAuthors()
      .subscribe((res: AuthorModel[]) => {
        this.dataSource = new MatTableDataSource<AuthorModel>(res);
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public showTable(): boolean {
    return this.dataSource.data.length > 0;
  }

  public openAuthorsBooksDialog(author: AuthorModel){
    this.dialog.open(AuthorsBooksDialogComponent, {
      width: '500px',
      minHeight: '250px',
      data: author
    });
  }

  public openAddAuthorDialog() {
    this.addAuthorDialogService.openDialog()
      .pipe(
        mergeMap(() =>
          this.appApi.getAuthors())
      )
      .subscribe((res: AuthorModel[]) => {
        this.dataSource = new MatTableDataSource<AuthorModel>(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  public deleteAuthor(author: AuthorModel): void {
    this.appApi.deleteAuthor(author.id)
      .subscribe(() => {
        this.deleteRow(author.id, this.paginator, this.dataSource);
      });
  }

}
