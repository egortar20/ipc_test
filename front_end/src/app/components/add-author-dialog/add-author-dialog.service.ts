import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthorModel } from 'src/app/models/author.model';
import { AddAuthorDialogComponent } from './add-author-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AddAuthorDialogService {

  constructor(
    public dialog: MatDialog,
  ) {
  }

  public openDialog(): Observable<any> {
    const dialog = this.dialog.open(AddAuthorDialogComponent);

    return dialog.afterClosed();
  }

}
