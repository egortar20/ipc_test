/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AddAuthorDialogService } from './add-author-dialog.service';

describe('Service: AddAuthorDialog', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddAuthorDialogService]
    });
  });

  it('should ...', inject([AddAuthorDialogService], (service: AddAuthorDialogService) => {
    expect(service).toBeTruthy();
  }));
});
