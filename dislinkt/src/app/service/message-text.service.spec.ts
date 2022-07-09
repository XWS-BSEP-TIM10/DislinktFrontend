import { TestBed } from '@angular/core/testing';

import { MessageTextService } from './message-text.service';

describe('MessageTextService', () => {
  let service: MessageTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
