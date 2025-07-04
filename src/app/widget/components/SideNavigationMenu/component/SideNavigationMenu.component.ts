import { CommonModule } from '@angular/common';
import { Component, Input, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { Popover } from 'primeng/popover';
import { TooltipModule } from 'primeng/tooltip';
import {
  ISidebarBanner,
  ISidebarExtraLinks,
  ISidebarLinks,
  ISidebarSearch,
  ISideNavigationMenu,
  ISidevarLogo,
} from '../interfaces';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-side-navigation-menu',
  imports: [
    CommonModule,
    RouterModule,
    TooltipModule,
    DrawerModule,
    ButtonModule,
    Popover,
    TranslateModule,
  ],
  templateUrl: './SideNavigationMenu.component.html',
  styleUrl: './SideNavigationMenu.component.scss',
})
export class SideNavigationMenuComponent {
  @Input() public search!: ISidebarSearch;
  @Input() public banner!: ISidebarBanner;
  @Input() public steep: ISideNavigationMenu[] = [];
  @Input() public sidebarLinks: ISidebarLinks[] = [];
  @Input() public extraLinks: ISidebarExtraLinks[] = [];
  @Input() public sidebarLogo!: ISidevarLogo;
  @ViewChild('dynamicComponent', { read: ViewContainerRef, static: false })
  public container!: ViewContainerRef;
  @ViewChild('drawerRef') public drawerRef!: Drawer;
  @ViewChild('op') public op!: Popover;
  public isMobileMode = false;
  public visible: boolean = false;
  public toggle: any = [];
  public currentStep = 0;
  public selectedSection: any = null;
  public selectedMenu: any = null;
  public activeDrawer: boolean = false;

  public constructor(private router: Router) { }

  public toggleMobile() {
    this.isMobileMode = !this.isMobileMode;
    setTimeout(() => {
      this.visible = !this.visible;
    }, 300);
  }

  public reset() {
    this.toggle = [];
    this.currentStep = 0;
    this.selectedSection = null;
    this.selectedMenu = null;
    this.container.clear();
    this.activeDrawer = false;
  }

  public closeCallback(e: any): void {
    this.drawerRef.close(e);
    this.reset();
  }

  public handleClickOutside() {
    this.reset();
    this.isMobileMode = !this.isMobileMode;
  }

  public selectMember() {
    this.op.hide();
  }

  public goToToggle(toggle: string) {
    this.reset();
    if (toggle == 'empyty') {
      this.isMobileMode = false;
      this.visible = false;
      this.activeDrawer = false;
      return;
    }
    this.activeDrawer = true;
    setTimeout(() => {
      if (this.visible) {
        return;
      }
      this.visible = !this.visible;
    }, 300);

    setTimeout(() => {
      if (this.isMobileMode) {
        return;
      }
      this.isMobileMode = !this.isMobileMode;
    });

    this.toggle = this.steep.find(item => item.key === toggle);

    if (this.toggle.component !== null) {
      this.renderComponent(this.toggle.component);
      this.currentStep = -1;
      return;
    }

    const isText = this.toggle.text !== null;
    if (isText) {
      this.currentStep = -1;
      return;
    }

    const isLink = this.toggle.routerLink !== null;
    if (isLink) {
      this.currentStep = -1;
      return;
    }
  }

  /**
   * @description
   * Na Seção temos a posibilidade de exibir apenas um conteudo, são eles: menu, componente ou link
   */
  public goToSection(section: any) {
    this.selectedSection = section;

    const isMenu = section.menu !== null;
    if (isMenu) {
      /**
       * Deve fechar a seção e abrir o menu
       * o step 0 é a seção
       * o step 1 é o menu
       */
      this.currentStep = 1; // abrir o menu de itens
      return;
    }

    const isComponent = section.component !== null;
    if (isComponent) {
      this.currentStep = 2;
      this.renderComponent(section.component);
      return;
    }

    const isLink = section.routerLink !== null;
    if (isLink) {
      this.currentStep = 2;
      return;
    }

    const isText = section.text !== null;
    if (isText) {
      this.currentStep = 2;
      return;
    }
  }

  public goToMenu(menu: any) {
    this.selectedMenu = menu;
    this.currentStep = 2;
    if (menu.component !== null) {
      this.renderComponent(menu.component);
      return;
    }
  }

  public goBack() {
    this.container.clear();

    const estou_no_primeiro_node = this.selectedMenu === null;
    if (this.currentStep === 2 && estou_no_primeiro_node) {
      this.currentStep = 0;
      return;
    }

    if (this.currentStep === 2) {
      this.currentStep = 1;
      this.selectedMenu = null;
    } else if (this.currentStep === 1) {
      this.currentStep = 0;
      this.selectedSection = null;
    }
  }

  public renderComponent(component: Type<any>) {
    this.container.clear();
    this.container.createComponent(component);
  }

  public linkClick(link: any, event: Event) {
    if (link.closeMenu) {
      this.drawerRef.close(event);
    }

    if (link.target === '_blank') {
      window.open(link.link, link.target);
    } else {
      this.router.navigate([link.link]);
    }
  }
}
