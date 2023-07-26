import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackUploadComponent } from './feedback-upload.component';

describe('FeedbackUploadComponent', () => {
  let component: FeedbackUploadComponent;
  let fixture: ComponentFixture<FeedbackUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
