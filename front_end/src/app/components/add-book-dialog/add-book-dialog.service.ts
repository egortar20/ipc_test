import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthorModel } from 'src/app/models/author.model';
import { AddBookDialogComponent } from './add-book-dialog.component';


@Injectable({
  providedIn: 'root'
})
export class AddBookDialogService {


  constructor(
    public dialog: MatDialog,
  ) {
  }

  public openDialog(author: AuthorModel): Observable<any> {
    const dialog = this.dialog.open(AddBookDialogComponent, {
      width: '500px',
      minHeight: '250px',
      data: author
    });

    return dialog.afterClosed();
  }
 
}
