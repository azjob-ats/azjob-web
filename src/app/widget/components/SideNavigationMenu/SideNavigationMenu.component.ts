import { CommonModule } from '@angular/common';
import { Component, ComponentRef, Type, ViewChild, ViewContainerRef, type OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { FormControl } from '@angular/forms';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { Popover } from 'primeng/popover';
import { LightDarkToggleComponent } from '../light-dark-toggle/light-dark-toggle.component';
import { LanguageToggleComponent } from '../language-toggle/language-toggle.component';
import { InputSearchComponent } from '../input-search/input-search.component';

@Component({
  selector: 'app-side-navigation-menu',
  imports: [
    CommonModule,
    RouterModule,
    TooltipModule,
    DrawerModule,
    ButtonModule,
    Popover
  ],
  templateUrl: './SideNavigationMenu.component.html',
  styleUrl: './SideNavigationMenu.component.scss',
})
export class SideNavigationMenuComponent implements OnInit {
  formControl = new FormControl('');
  texty = '@mcchelsom98268'
  isMobileMode = false;
  visible: boolean = false;
  menu: any = [];
  currentStep = 0;
  selectedSection: any = null;
  selectedMenu: any = null;

  public componentRef: ComponentRef<any> | null = null;
  @ViewChild('dynamicComponent', { read: ViewContainerRef, static: false })
  public container!: ViewContainerRef;
  @ViewChild('drawerRef') drawerRef!: Drawer;
  @ViewChild('op') op!: Popover;

  toggleMobile() {
    this.isMobileMode = !this.isMobileMode;
    setTimeout(() => {
      this.visible = !this.visible;
    }, 300);
  }

  closeCallback(e: any): void {
    this.drawerRef.close(e);
    this.menu = [];
    this.currentStep = 0;
    this.selectedSection = null;
    this.selectedMenu = null;
  }

  aoClicarFora() {
    this.isMobileMode = !this.isMobileMode;
    this.menu = [];
    this.currentStep = 0;
    this.selectedSection = null;
    this.selectedMenu = null;

  }

  ngOnInit(): void { }

  selectMember() {
    this.op.hide();
  }

  steep = [
    {
      title: 'Mais',
      key: 'plus-preferences',
      component: null,
      section: [
        {
          name: 'Configurações e Preferências',
          description: 'Personalize suas preferências e configurações de conta',
          routerLink: null,
          component: null,
          menu: [
            {
              icon: 'admin_panel_settings',
              name: 'Informações da conta',
              description: 'Veja as informações da sua conta, como seu número de telefone e endereço de e-mail.',
              routerLink: null,
              component: null,
            },
            {
              icon: 'brightness_4',
              name: 'Modo Escuro',
              description: 'Alterar o modo de exibição do site para escuro ou claro',
              routerLink: null,
              component: LightDarkToggleComponent
            },
            {
              icon: 'translate',
              name: 'Idioma',
              description: 'Alterar o idioma do site para português ou inglês',
              routerLink: null,
              component: LanguageToggleComponent,
            },
            {
              icon: 'gpp_bad',
              name: 'Desative sua conta',
              description: 'Descubra como você pode desativar sua conta',
              routerLink: null,
              component: null,
            }
          ]
        },
        {
          name: 'Acesso e Segurança',
          description: 'Centralize os controles de proteção da sua conta, gerenciamento de senha e dispositivos conectados',
          routerLink: null,
          component: null,
          menu: [
            {
              icon: 'notification_settings',
              name: 'Notificações',
              description: 'Escolher quais tipos de notificações deseja receber (e-mail, push etc.) e com que frequência',
              routerLink: null,
              component: null,
            },
            {
              icon: 'shield_lock',
              name: 'Alterar senha',
              description: 'Altere sua senha de forma segura sempre que necessario',
              routerLink: null,
              component: null,
            },
            {
              icon: 'do_not_disturb_on',
              name: 'Encerrar sessões ativas',
              description: 'Encerre sessões ativas em outros dispositivos',
              routerLink: null,
              component: null,
            },
            {
              icon: 'shield',
              name: 'Gerenciar consentimento',
              description: 'Permite ajustar suas preferências sobre coleta e uso de dados pela plataforma',
              routerLink: null,
              component: null,
            },
            {
              icon: 'download',
              name: 'Baixar seus dados',
              description: 'Solicite um arquivo com todas as informações armazenadas sobre sua conta',
              routerLink: null,
              component: null,
            },
            {
              icon: 'multimodal_hand_eye',
              name: 'Controlar visibilidade de atividades',
              description: 'Gerencie quem pode ver suas ações, como candidaturas, interações e atualizações no perfil',
              routerLink: null,
              component: null,
            },
            {
              icon: 'history',
              name: 'Limpar histórico de atividades',
              description: 'Apague registros de visualizações, candidaturas ou buscas feitas na plataforma',
              routerLink: null,
              component: null,
            },
            {
              icon: 'delete',
              name: 'Encerrar conta',
              description: 'Remova sua conta permanentemente. Essa ação excluirá seus dados e histórico da plataforma',
              routerLink: null,
              component: null,
            },
          ]
        },
        {
          name: 'Feedback, Ajuda e Sobre',
          description: 'Coletar sugestões e opiniões, acessar a central de ajuda e obter informações sobre a empresa',
          routerLink: null,
          component: null,
          menu: [
            {
              icon: 'comment',
              name: 'Enviar Feedback',
              description: 'Compartilhe suas ideias, sugestões ou reporte problemas diretamente à nossa equipe de produto',
              routerLink: null,
              component: null,
            },
            {
              icon: 'contact_support',
              name: 'Central de Ajuda',
              description: 'Acesse artigos e tutoriais detalhados sobre funcionalidades, fluxos e melhores práticas',
              routerLink: null,
              component: null,
            },
            {
              icon: 'support_agent',
              name: 'Contratar Suporte',
              description: 'Abra um chamado ou inicie um chat ao vivo para resolver dúvidas específicas ou reportar incidentes',
              routerLink: null,
              component: null,
            },
            {
              icon: 'contract',
              name: 'Termos e Políticas',
              description: 'Leia nossos Termos de Uso, Política de Privacidade e outras diretrizes legais',
              routerLink: null,
              component: null,
            },
            {
              icon: 'sdk',
              name: 'Sobre o App',
              description: 'Confira a versão atual da plataforma, data da última atualização e informações de Copyright',
              routerLink: {
                label: 'Demonstração de componentes, funcionalidades ou páginas',
                link: '/showcase',
                target: '_blank',
              },
              component: null,
            },
            {
              icon: 'sentiment_satisfied',
              name: 'Sobre o azjob.info',
              description: 'Saiba mais sobre a empresa, equipe e história por trás do azjob.info',
              routerLink: null,
              component: null,
            },
          ]
        },
        {
          name: 'Logout',
          description: 'Sair da conta',
          routerLink: {
            label: 'Log out @mcchelsom98268',
            link: '/logout',
            target: '_blank',
          },
          component: null,
          menu: null
        }
      ]
    },
    {
      title: 'Pesquisar',
      key: 'search',
      component: InputSearchComponent,
      section: null,
    }
  ];

  goToToggle(toggle: string) {
    this.isMobileMode = !this.isMobileMode;
    setTimeout(() => {
      this.visible = !this.visible;
    }, 300);

    this.menu = this.steep.find(
      (item) => item.key === toggle
    );

    if (this.menu.component !== null) {
      this.renderComponent(this.menu.component);
      this.currentStep = 4;
      return
    }
  }

  goToSection(section: any) {
    this.selectedSection = section;

    if (section.menu !== null) {
      this.currentStep = 1;
      return
    }

    if (section.component !== null) {
      this.currentStep = 2;
      this.renderComponent(section.component);
      return
    }

    if (section.routerLink !== null) {
      this.currentStep = 3;
      return
    }
  }

  goToMenu(menu: any) {
    this.selectedMenu = menu;
    this.currentStep = 2;
    if (menu.component !== null) {
      this.renderComponent(menu.component);
      return;
    }

    if (menu.routerLink !== null) {
      return;
    }
  }

  goBack() {
    if (this.currentStep === 3) {
      this.currentStep = 0;
      return
    }

    const estou_no_primeiro_node = this.selectedMenu === null;
    if (this.currentStep === 2 && estou_no_primeiro_node) {
      this.currentStep = 0;
      return
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
    const componentRef = this.createComponent(component);
    this.componentRef = componentRef;

    return componentRef;
  }

  public createComponent<T>(component: Type<T>): ComponentRef<T> {
    const componentRef: any = this.container.createComponent(component);

    componentRef.changeDetectorRef.detectChanges();
    return componentRef;
  }
}
