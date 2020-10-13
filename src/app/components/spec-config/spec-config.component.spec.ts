import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecConfigComponent } from './spec-config.component';

describe('SpecConfigComponent', () => {
  let component: SpecConfigComponent;
  let fixture: ComponentFixture<SpecConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
