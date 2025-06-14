import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideNavigationMenuComponent } from './SideNavigationMenu.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { PopoverModule } from 'primeng/popover';
import { CommonModule } from '@angular/common';

describe('SideNavigationMenuComponent', () => {
    let component: SideNavigationMenuComponent;
    let fixture: ComponentFixture<SideNavigationMenuComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                CommonModule,
                RouterTestingModule,
                TranslateModule.forRoot(),
                DrawerModule,
                ButtonModule,
                TooltipModule,
                PopoverModule,
                NoopAnimationsModule
            ],
            declarations: [SideNavigationMenuComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SideNavigationMenuComponent);
        component = fixture.componentInstance;

        // Mocks mínimos obrigatórios
        component.steep = [];
        component.sidebarLinks = [];
        component.extraLinks = [];
        component.sidebarLogo = { routerLink: '' };
        component.search = { value: '', placeholder: '' };
        component.banner = {
            show: false,
            nameUser: '',
            nameId: '',
            avatar: '',
            menu: [],
            alt: ''
        };

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
