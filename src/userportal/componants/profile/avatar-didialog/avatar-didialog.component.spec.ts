import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarDidialogComponent } from './avatar-didialog.component';

describe('AvatarDidialogComponent', () => {
  let component: AvatarDidialogComponent;
  let fixture: ComponentFixture<AvatarDidialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarDidialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarDidialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
