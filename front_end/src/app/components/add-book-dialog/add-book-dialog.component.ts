import { Component, OnInit, Inject, Input } from '@angular/core';
import { AuthorModel } from 'src/app/models/author.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppAPIService } from 'src/app/servises';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AddBookDialogService } from './add-book-dialog.service';

@Component({
  selector: 'app-add-book-dialog',
  templateUrl: './add-book-dialog.component.html',
  styleUrls: ['./add-book-dialog.component.scss']
})
export class AddBookDialogComponent implements OnInit {


  addBookForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public author: AuthorModel,
    public appApi: AppAPIService,
    public dialogRef: MatDialogRef<AddBookDialogComponent>
  ) { }

  ngOnInit() {
  }

  get bookTitle(): FormControl {
    return this.addBookForm.get('title') as FormControl;
  }

  get bookDescription(): FormControl {
    return this.addBookForm.get('description') as FormControl;
  }

  public addBook(): void {
    this.appApi.addBook(this.bookTitle.value, this.bookDescription.value, this.author.id)
      .subscribe(() => {
        this.dialogRef.close();
      })
  }

}
