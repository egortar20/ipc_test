import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material-module';
import { AuthorsTableComponent } from './components/authors-table/authors-table.component';
import { AuthorsBooksDialogComponent } from './components/authors-books-dialog/authors-books-dialog.component';
import { AddBookDialogComponent } from './components/add-book-dialog/add-book-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddAuthorDialogComponent } from './components/add-author-dialog/add-author-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthorsTableComponent,
    AuthorsBooksDialogComponent,
    AddBookDialogComponent,
    AddAuthorDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
