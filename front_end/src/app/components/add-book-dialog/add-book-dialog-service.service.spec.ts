/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AddBookDialogService } from './add-book-dialog.service'

describe('Service: AddBookDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddBookDialogService]
    });
  });

  it('should ...', inject([AddBookDialogService], (service: AddBookDialogService) => {
    expect(service).toBeTruthy();
  }));
});
