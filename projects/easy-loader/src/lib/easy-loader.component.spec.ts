import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EasyLoaderComponent } from './easy-loader.component';

describe('EasyLoaderComponent', () => {
  let component: EasyLoaderComponent;
  let fixture: ComponentFixture<EasyLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EasyLoaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EasyLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
