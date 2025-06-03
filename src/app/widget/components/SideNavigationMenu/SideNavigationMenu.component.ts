import { CommonModule } from '@angular/common';
import { Component, ViewChild, type OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { FormControl } from '@angular/forms';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-side-navigation-menu',
  imports: [
    CommonModule,
    RouterModule,
    TooltipModule,
    DrawerModule,
    ButtonModule
  ],
  templateUrl: './SideNavigationMenu.component.html',
  styleUrl: './SideNavigationMenu.component.scss',
})
export class SideNavigationMenuComponent implements OnInit {
  formControl = new FormControl('');
  texty = 'Copyright © 2025 azjob. All rights reserved'
  isMobileMode = false;
  visible: boolean = false;
  preferencesMenuVisible: any = null;
  nodeSectionPositionCurrent: number = 0;
  titleNodeMenu: string = '';
  toggleMobile() {
    this.isMobileMode = !this.isMobileMode;
    setTimeout(() => {
      this.visible = !this.visible;
    }, 300);
  }

  menuPlustoggle() {
    this.isMobileMode = !this.isMobileMode;
    setTimeout(() => {
      this.visible = !this.visible;
    }, 300);

    this.preferencesMenuVisible = this.steep.find(
      (item) => item.key === 'plus-preferences'
    );
  }

  chageNodeSection(node: number) {
    this.nodeSectionPositionCurrent = node;
  }

  backSectionPrevious() {
    this.nodeSectionPositionCurrent = 0;
  }

  @ViewChild('drawerRef') drawerRef!: Drawer;

  closeCallback(e: any): void {
    this.preferencesMenuVisible = null;
    this.nodeSectionPositionCurrent = 0;
    this.drawerRef.close(e);
  }

  aoClicarFora() {
    this.isMobileMode = !this.isMobileMode;
    this.preferencesMenuVisible = null;
    this.nodeSectionPositionCurrent = 0;
  }

  get title() {
    const preferences = this.steep.find((item) => item.key === this.preferencesMenuVisible.key);

    if (this.nodeSectionPositionCurrent == 0) {
      return preferences?.title;
    }

    return preferences?.section[this.nodeSectionPositionCurrent - 1].name;
  }

  ngOnInit(): void { }

  steep = [
    {
      title: 'Mais',
      key: 'plus-preferences',
      component: null,
      section: [
        {
          name: 'Informações da conta',
          description: 'Atualizar dados como nome, e-mail e preferências básicas',
          routerLink: null,
          component: null,
          menu: [
            {
              name: 'Modo Escuro',
              description: 'Alterar o modo de exibição do site para escuro ou claro',
              routerLink: null,
              component: null,
            },
            {
              name: 'Idioma',
              description: 'Alterar o idioma do site para português ou inglês',
              routerLink: null,
              component: null,
            },
            {
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
              name: 'Alterar senha',
              description: 'Altere sua senha de forma segura sempre que necessario',
              routerLink: null,
              component: null,
            },
            {
              name: 'Encerrar sessões ativas',
              description: 'Encerre sessões ativas em outros dispositivos',
              routerLink: null,
              component: null,
            },
            {
              name: 'Gerenciar consentimento',
              description: 'Permite ajustar suas preferências sobre coleta e uso de dados pela plataforma',
              routerLink: null,
              component: null,
            },
            {
              name: 'Baixar seus dados',
              description: 'Solicite um arquivo com todas as informações armazenadas sobre sua conta',
              routerLink: null,
              component: null,
            },
            {
              name: 'Controlar visibilidade de atividades',
              description: 'Gerencie quem pode ver suas ações, como candidaturas, interações e atualizações no perfil',
              routerLink: null,
              component: null,
            },
            {
              name: 'Limpar histórico de atividades',
              description: 'Apague registros de visualizações, candidaturas ou buscas feitas na plataforma',
              routerLink: null,
              component: null,
            },
            {
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
              name: 'Enviar Feedback',
              description: 'Compartilhe suas ideias, sugestões ou reporte problemas diretamente à nossa equipe de produto',
              routerLink: null,
              component: null,
            },
            {
              name: 'Central de Ajuda',
              description: 'Acesse artigos e tutoriais detalhados sobre funcionalidades, fluxos e melhores práticas',
              routerLink: null,
              component: null,
            },
            {
              name: 'Contatar Suporte',
              description: 'Abra um chamado ou inicie um chat ao vivo para resolver dúvidas específicas ou reportar incidentes',
              routerLink: null,
              component: null,
            },
            {
              name: 'Termos e Políticas',
              description: 'Leia nossos Termos de Uso, Política de Privacidade e outras diretrizes legais',
              routerLink: null,
              component: null,
            },
            {
              name: 'Sobre o App',
              description: 'Confira a versão atual da plataforma, data da última atualização e informações de Copyright',
              routerLink: null,
              component: null,
            },
            {
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
          routerLink: null,
          component: null,
          menu: []
        }
      ]
    }
  ]
}
