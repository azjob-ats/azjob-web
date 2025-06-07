import { CommonModule } from '@angular/common';
import { Component, ComponentRef, Type, ViewChild, ViewContainerRef, type OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
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
  toggle: any = [];
  currentStep = 0;
  selectedSection: any = null;
  selectedMenu: any = null;

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
    this.toggle = [];
    this.currentStep = 0;
    this.selectedSection = null;
    this.selectedMenu = null;
    this.container.clear();
  }

  aoClicarFora() {
    this.isMobileMode = !this.isMobileMode;
    this.toggle = [];
    this.currentStep = 0;
    this.selectedSection = null;
    this.selectedMenu = null;
    this.container.clear();

  }

  ngOnInit(): void { }

  selectMember() {
    this.op.hide();
  }

  constructor(private router: Router) { }

  steep = [
    {
      name: 'Mais',
      key: 'plus-preferences',
      component: null,
      text: null,
      routerLink: null,
      section: [
        {
          name: 'Configurações e Preferências',
          description: 'Personalize suas preferências e configurações de conta',
          routerLink: null,
          component: null,
          text: null,
          menu: [
            {
              icon: 'admin_panel_settings',
              name: 'Informações da conta',
              description: 'Veja as informações da sua conta, como seu número de telefone e endereço de e-mail.',
              routerLink: null,
              component: null,
              text: null
            },
            {
              icon: 'brightness_4',
              name: 'Modo Escuro',
              description: 'Alterar o modo de exibição do site para escuro ou claro',
              routerLink: null,
              component: LightDarkToggleComponent,
              text: null
            },
            {
              icon: 'translate',
              name: 'Idioma',
              description: 'Alterar o idioma do site para português ou inglês',
              routerLink: null,
              component: LanguageToggleComponent,
              text: null
            },
            {
              icon: 'gpp_bad',
              name: 'Desative sua conta',
              description: 'Descubra como você pode desativar sua conta',
              routerLink: null,
              component: null,
              text: null
            }
          ]
        },
        {
          name: 'Acesso e Segurança',
          description: 'Centralize os controles de proteção da sua conta, gerenciamento de senha e dispositivos conectados',
          routerLink: null,
          component: null,
          text: null,
          menu: [
            {
              icon: 'notification_settings',
              name: 'Notificações',
              description: 'Escolher quais tipos de notificações deseja receber (e-mail, push etc.) e com que frequência',
              routerLink: null,
              component: null,
              text: null
            },
            {
              icon: 'shield_lock',
              name: 'Alterar senha',
              description: 'Altere sua senha de forma segura sempre que necessario',
              routerLink: null,
              component: null,
              text: null
            },
            {
              icon: 'do_not_disturb_on',
              name: 'Encerrar sessões ativas',
              description: 'Encerre sessões ativas em outros dispositivos',
              routerLink: null,
              component: null,
              text: null
            },
            {
              icon: 'shield',
              name: 'Gerenciar consentimento',
              description: 'Permite ajustar suas preferências sobre coleta e uso de dados pela plataforma',
              routerLink: null,
              component: null,
              text: null
            },
            {
              icon: 'download',
              name: 'Baixar seus dados',
              description: 'Solicite um arquivo com todas as informações armazenadas sobre sua conta',
              routerLink: null,
              component: null,
              text: null
            },
            {
              icon: 'multimodal_hand_eye',
              name: 'Controlar visibilidade de atividades',
              description: 'Gerencie quem pode ver suas ações, como candidaturas, interações e atualizações no perfil',
              routerLink: null,
              component: null,
              text: null
            },
            {
              icon: 'history',
              name: 'Limpar histórico de atividades',
              description: 'Apague registros de visualizações, candidaturas ou buscas feitas na plataforma',
              routerLink: null,
              component: null,
              text: null
            },
            {
              icon: 'delete',
              name: 'Encerrar conta',
              description: 'Remova sua conta permanentemente. Essa ação excluirá seus dados e histórico da plataforma',
              routerLink: null,
              component: null,
              text: null
            },
          ]
        },
        {
          name: 'Feedback, Ajuda e Sobre',
          description: 'Coletar sugestões e opiniões, acessar a central de ajuda e obter informações sobre a empresa',
          routerLink: null,
          text: null,
          component: null,
          menu: [
            {
              icon: 'comment',
              name: 'Enviar Feedback',
              description: 'Compartilhe suas ideias, sugestões ou reporte problemas diretamente à nossa equipe de produto',
              routerLink: null,
              component: null,
              text: null
            },
            {
              icon: 'contact_support',
              name: 'Central de Ajuda',
              description: 'Acesse artigos e tutoriais detalhados sobre funcionalidades, fluxos e melhores práticas',
              routerLink: null,
              component: null,
              text: null
            },
            {
              icon: 'support_agent',
              name: 'Contratar Suporte',
              description: 'Abra um chamado ou inicie um chat ao vivo para resolver dúvidas específicas ou reportar incidentes',
              routerLink: null,
              component: null,
              text: null
            },
            {
              icon: 'contract',
              name: 'Termos e Políticas',
              description: 'Leia nossos Termos de Uso, Política de Privacidade e outras diretrizes legais',
              routerLink: null,
              component: null,
              text: null
            },
            {
              icon: 'sdk',
              name: 'Sobre o App',
              description: 'Confira a versão atual da plataforma, data da última atualização e informações de Copyright',
              routerLink: {
                label: 'Demonstração de componentes, funcionalidades e páginas',
                link: '/showcase',
                target: '_blank',
                closeMenu: false
              },
              component: null,
              text: null
            },
            {
              icon: 'sentiment_satisfied',
              name: 'Sobre o azjob.info',
              description: 'Saiba mais sobre a empresa, equipe e história por trás do azjob.info',
              routerLink: null,
              component: null,
              text: null
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
            closeMenu: false
          },
          component: null,
          menu: null,
          text: null
        }
      ]
    },
    {
      name: 'Pesquisar',
      key: 'search',
      component: InputSearchComponent,
      section: null,
      text: null,
      routerLink: null,
    }
  ];

  goToToggle(toggle: string) {
    this.isMobileMode = !this.isMobileMode;
    setTimeout(() => {
      this.visible = !this.visible;
    }, 300);

    this.toggle = this.steep.find(
      (item) => item.key === toggle
    );
    console.log('Toggle', this.toggle);

    if (this.toggle.component !== null) {
      this.renderComponent(this.toggle.component);
      this.currentStep = -1;
      return
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
  goToSection(section: any) {
    this.selectedSection = section;
    console.log('Section', section);
    const isMenu = section.menu !== null;
    if (isMenu) {
      /**
       * Deve fechar a seção e abrir o menu
       * o step 0 é a seção
       * o step 1 é o menu
       */
      this.currentStep = 1;// abrir o menu de itens
      return
    }

    const isComponent = section.component !== null;
    if (isComponent) {
      this.currentStep = 2;
      this.renderComponent(section.component);
      return
    }

    const isLink = section.routerLink !== null;
    if (isLink) {
      this.currentStep = 2;
      return
    }

    const isText = section.text !== null;
    if (isText) {
      this.currentStep = 2;
      return
    }
  }

  goToMenu(menu: any) {
    this.selectedMenu = menu;
    this.currentStep = 2;
    console.log('Menu', menu);
    if (menu.component !== null) {
      this.renderComponent(menu.component);
      return;
    }
  }

  goBack() {
    this.container.clear();

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
