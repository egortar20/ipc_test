import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AppAPIService } from 'src/app/servises';
import { AddBookDialogComponent } from '../add-book-dialog/add-book-dialog.component';

@Component({
  selector: 'app-add-author-dialog',
  templateUrl: './add-author-dialog.component.html',
  styleUrls: ['./add-author-dialog.component.scss']
})
export class AddAuthorDialogComponent implements OnInit {

  addAuthorForm = new FormGroup({
    name: new FormControl('', Validators.required),
    country: new FormControl(''),
  });

  get authorName(): FormControl {
    return this.addAuthorForm.get('name') as FormControl;
  }

  get authorCountry(): FormControl {
    return this.addAuthorForm.get('country') as FormControl;
  }

  constructor(
    public appApi: AppAPIService,
    public dialogRef: MatDialogRef<AddBookDialogComponent>,
  ) { }

  ngOnInit() {
  }

  public addAuthor(): void{
    this.appApi.addAuthor(this.authorName.value, this.authorCountry.value)
      .subscribe(() => {
        this.dialogRef.close();
      });
  }

}
