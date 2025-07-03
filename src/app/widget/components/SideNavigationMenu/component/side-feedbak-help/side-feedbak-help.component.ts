import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output, Type, ViewChild, ViewContainerRef, type OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ISidebarExtraLinks, ISidebarLinks, ISideNavigationMenu } from '../../interfaces';

@Component({
  selector: 'app-side-feedbak-help',
  imports: [
    CommonModule,
    RouterModule,
    TooltipModule,
    ButtonModule,
    TranslateModule
  ],
  templateUrl: './side-feedbak-help.component.html',
  styleUrl: './side-feedbak-help.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideFeedbakHelpComponent implements OnInit {
  @Input() public steep: ISideNavigationMenu[] = [];
  @Input() public sidebarLinks: ISidebarLinks[] = [];
  @Input() public extraLinks: ISidebarExtraLinks[] = [];
  @ViewChild('dynamicComponent', { read: ViewContainerRef, static: false })
  public container!: ViewContainerRef;
  @Output() public onClose = new EventEmitter<boolean>();
  public isMobileMode = false;
  public visible: boolean = false;
  public toggle: any = [];
  public currentStep = 0;
  public selectedSection: any = null;
  public selectedMenu: any = null;
  public activeDrawer: boolean = false;

  public constructor(private router: Router) { }
  private translate: TranslateService = inject(TranslateService);
  ngOnInit(): void {
    this.goToToggle("plus-preferences")
  }


  public closeCallback(e: any): void {
    this.onClose.emit(true);
  }

  public handleClickOutside() {
    this.isMobileMode = !this.isMobileMode;
  }

  public goToToggle(toggle: string) {
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
    const help = this.toggle.section.find((item: any) => item.name === 'sidebar.MORE.help.title');

    this.toggle.section = [];
    this.toggle.section = [help];

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
    if (link.target === '_blank') {
      window.open(link.link, link.target);
    } else {
      this.router.navigate([link.link]);
    }
  }
}
