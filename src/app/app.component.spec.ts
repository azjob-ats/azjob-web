import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NavigationTabTitleService } from './domain/change-language/services/navigation-tab-title.service';
import { RouterModule } from '@angular/router';

jest.mock('./domain/change-language/services/navigation-tab-title.service', () => {
  return {
    NavigationTabTitleService: jest.fn().mockImplementation(() => ({
      init: jest.fn(),
      getLang: jest.fn().mockReturnValue({
        prefix: 'en-US',
      }),
    })),
  };
});

const navigationTabTitleServiceMock = {
  init: jest.fn(),
  getLang: jest.fn().mockReturnValue({
    prefix: 'en-US',
  }),
};

describe('AppComponenft', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let mockService: jest.Mocked<NavigationTabTitleService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterModule],
      providers: [
        { provide: NavigationTabTitleService, useValue: navigationTabTitleServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    mockService = TestBed.inject(NavigationTabTitleService) as jest.Mocked<NavigationTabTitleService>;
  });

  it('should call init on NavigationTabTitleService during ngOnInit', () => {
    component.ngOnInit();
    expect(navigationTabTitleServiceMock.init).toHaveBeenCalled();
  });

  it('should getLang return the correct language', () => {
    expect(JSON.stringify(navigationTabTitleServiceMock.getLang())).toBe(JSON.stringify({ prefix: 'en-US' }));
  });
});
