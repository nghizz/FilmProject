import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmsAddComponent } from './films-add.component';

describe('FilmsAddComponent', () => {
  let component: FilmsAddComponent;
  let fixture: ComponentFixture<FilmsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilmsAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
