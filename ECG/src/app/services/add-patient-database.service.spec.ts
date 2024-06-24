import { TestBed } from '@angular/core/testing';

import { AddPatientDatabaseService } from './add-patient-database.service';

describe('AddUserDatabaseService', () => {
  let service: AddPatientDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPatientDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
