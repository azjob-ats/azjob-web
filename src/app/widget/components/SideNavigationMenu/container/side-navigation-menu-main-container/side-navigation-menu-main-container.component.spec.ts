import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideNavigationMenuMainContainerComponent } from './side-navigation-menu-main-container.component';

describe('SideNavigationMenuMainContainerComponent', () => {
    let fixture: ComponentFixture<SideNavigationMenuMainContainerComponent>;
    let component: SideNavigationMenuMainContainerComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SideNavigationMenuMainContainerComponent], // standalone component
        }).compileComponents();

        fixture = TestBed.createComponent(SideNavigationMenuMainContainerComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
