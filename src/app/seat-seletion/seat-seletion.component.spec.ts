import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatSelectionComponent } from './seat-seletion.component';

describe('SeatSeletionComponent', () => {
  let component: SeatSelectionComponent;
  let fixture: ComponentFixture<SeatSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeatSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeatSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
