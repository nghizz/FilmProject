import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmsmanagementComponent } from './films-management.component';

describe('FilmsManagementComponent', () => {
  let component: FilmsmanagementComponent;
  let fixture: ComponentFixture<FilmsmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilmsmanagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmsmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
