import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmsManagementComponent } from './films-management.component';

describe('FilmsManagementComponent', () => {
  let component: FilmsManagementComponent;
  let fixture: ComponentFixture<FilmsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilmsManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
