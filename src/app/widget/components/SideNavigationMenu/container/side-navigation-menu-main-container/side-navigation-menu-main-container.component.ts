import { CommonModule } from '@angular/common';
import { Component, inject, type OnInit } from '@angular/core';
import { InputSearchComponent } from '@widget/components/input-search/input-search.component';
import { LanguageToggleComponent } from '@widget/components/language-toggle/language-toggle.component';
import { LightDarkToggleComponent } from '@widget/components/light-dark-toggle/light-dark-toggle.component';
import { SideNavigationMenuComponent } from '@widget/components/SideNavigationMenu/component/SideNavigationMenu.component';
import { ISidebarBanner, ISidebarExtraLinks, ISidebarLinks, ISidebarSearch, ISideNavigationMenu } from '../../interfaces';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LanguageTranslatorService } from '@domain/change-language/services/language-translator.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@domain/change-language/services/language.service';

@Component({
  selector: 'app-side-navigation-menu-main-container',
  imports: [SideNavigationMenuComponent, CommonModule, TranslateModule, ReactiveFormsModule, RouterModule],
  providers: [LanguageTranslatorService, TranslateService, LanguageService],
  templateUrl: './side-navigation-menu-main-container.component.html',
  styleUrl: './side-navigation-menu-main-container.component.scss',
})
export class SideNavigationMenuMainContainerComponent implements OnInit {
  private translationService: LanguageTranslatorService = inject(LanguageTranslatorService);
  private translate: TranslateService = inject(TranslateService);
  private lang: LanguageService = inject(LanguageService);
  public steep: ISideNavigationMenu[] = [];
  public search!: ISidebarSearch;
  public banner!: ISidebarBanner;
  public sidebarLinks: ISidebarLinks[] = [];
  public extraLinks: ISidebarExtraLinks[] = [];

  public ngOnInit(): void {
    this.languageChanged();
    this.startTranslation();
  }

  private languageChanged() {
    this.lang.getStreamOnLanguage().subscribe((lang) => {
      this.translate.setDefaultLang(lang.prefix);
      this.setDate();
    });
  }

  private startTranslation() {
    this.translate.get('app').subscribe(() => {
      this.setDate();
    });
  }

  private setDate() {
    this.steep = [
      {
        name: 'sidebar.more',
        key: 'plus-preferences',
        component: null,
        text: null,
        routerLink: null,
        section: [
          {
            name: 'settings.title',
            description: 'settings.description',
            routerLink: null,
            component: null,
            text: null,
            menu: [
              {
                icon: 'account_circle',
                name: 'settings.accountInfo',
                description: 'settings.accountInfoDesc',
                routerLink: null,
                component: null,
                text: 'Sorry, this is not available yet'
              },
              {
                icon: 'brightness_4',
                name: 'settings.darkMode',
                description: 'settings.darkModeDesc',
                routerLink: null,
                component: LightDarkToggleComponent,
                text: null
              },
              {
                icon: 'translate',
                name: 'settings.language',
                description: 'settings.languageDesc',
                routerLink: null,
                component: LanguageToggleComponent,
                text: null
              },
              {
                icon: 'lock',
                name: 'settings.changePassword',
                description: 'settings.changePasswordDesc',
                routerLink: null,
                component: null,
                text: 'Sorry, this is not available yet'
              }
            ]
          },
          {
            name: 'security.title',
            description: 'security.description',
            routerLink: null,
            component: null,
            text: null,
            menu: [
              {
                icon: 'notification_settings',
                name: 'security.notifications',
                description: 'security.notificationsDesc',
                routerLink: null,
                component: null,
                text: 'Sorry, this is not available yet'
              },
              {
                icon: 'laptop_chromebook',
                name: 'security.devices',
                description: 'security.devicesDesc',
                routerLink: null,
                component: null,
                text: 'Sorry, this is not available yet'
              },
              {
                icon: 'do_not_disturb_on',
                name: 'security.endSessions',
                description: 'security.endSessionsDesc',
                routerLink: null,
                component: null,
                text: 'Sorry, this is not available yet'
              },
              {
                icon: 'shield',
                name: 'security.consent',
                description: 'security.consentDesc',
                routerLink: null,
                component: null,
                text: 'Sorry, this is not available yet'
              },
              {
                icon: 'gpp_bad',
                name: 'security.deactivate',
                description: 'security.deactivateDesc',
                routerLink: null,
                component: null,
                text: 'Sorry, this is not available yet'
              },
              {
                icon: 'download',
                name: 'security.downloadData',
                description: 'security.downloadDataDesc',
                routerLink: null,
                component: null,
                text: 'Sorry, this is not available yet'
              },
              {
                icon: 'multimodal_hand_eye',
                name: 'security.visibility',
                description: 'security.visibilityDesc',
                routerLink: null,
                component: null,
                text: 'Sorry, this is not available yet'
              },
              {
                icon: 'history',
                name: 'security.clearHistory',
                description: 'security.clearHistoryDesc',
                routerLink: null,
                component: null,
                text: 'Sorry, this is not available yet'
              },
              {
                icon: 'delete',
                name: 'security.deleteAccount',
                description: 'security.deleteAccountDesc',
                routerLink: null,
                component: null,
                text: 'Sorry, this is not available yet'
              }
            ]
          },
          {
            name: 'help.title',
            description: 'help.description',
            routerLink: null,
            text: null,
            component: null,
            menu: [
              {
                icon: 'comment',
                name: 'help.feedback',
                description: 'help.feedbackDesc',
                routerLink: null,
                component: null,
                text: 'Sorry, this is not available yet'
              },
              {
                icon: 'contact_support',
                name: 'help.supportCenter',
                description: 'help.supportCenterDesc',
                routerLink: null,
                component: null,
                text: 'Sorry, this is not available yet'
              },
              {
                icon: 'support_agent',
                name: 'help.contactSupport',
                description: 'help.contactSupportDesc',
                routerLink: null,
                component: null,
                text: 'Sorry, this is not available yet'
              },
              {
                icon: 'contract',
                name: 'help.terms',
                description: 'help.termsDesc',
                routerLink: null,
                component: null,
                text: 'Sorry, this is not available yet'
              },
              {
                icon: 'sdk',
                name: 'help.aboutApp',
                description: 'help.aboutAppDesc',
                routerLink: {
                  label: 'help.aboutApp',
                  link: '/showcase',
                  target: undefined,
                  closeMenu: true
                },
                component: null,
                text: null
              },
              {
                icon: 'sentiment_satisfied',
                name: 'help.aboutAzjob',
                description: 'help.aboutAzjobDesc',
                routerLink: null,
                component: null,
                text: null
              }
            ]
          },
          {
            name: 'logout.title',
            description: 'logout.description',
            routerLink: {
              label: this.translate.instant('banner.logout', { nameId: '@mcchelsom98268' }),
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
        name: 'search.title',
        key: 'search',
        component: InputSearchComponent,
        section: null,
        text: null,
        routerLink: null
      }
    ];

    this.search = {
      value: '',
      placeholder: 'search.placeholder'
    }

    this.banner = {
      nameId: '@mcchelsom272033',
      nameUser: 'Saulo McChelsom',
      avatar: 'image/user-default.png',
      alt: 'banner.alt',
      show: true,
      menu: [
        {
          icon: '',
          name: this.translate.instant('banner.accountInfo'),
          description: '',
          routerLink: {
            label: '',
            link: '/user/info',
            target: '_blank',
            closeMenu: true
          },
          component: null,
          text: null,
        },
        {
          icon: '',
          name: this.translate.instant('banner.logout', { nameId: '@mcchelsom98268' }),
          description: '',
          routerLink: {
            label: '',
            link: '/user/logout',
            target: '_blank',
            closeMenu: true
          },
          component: null,
          text: null,
        },
      ]
    }

    this.sidebarLinks = [
      {
        label: 'sidebar.forYou',
        routerLink: '/for-you',
        icon: 'home',
        iconClass: 'rounded-icon text-3xl',
        liClass: '',
        toggle: 'empyty'
      },
      {
        label: 'sidebar.applications',
        routerLink: '/application',
        icon: 'radio_button_checked',
        iconClass: 'outlined-icon text-3xl',
        liClass: 'cursor-pointer',
        toggle: 'empyty'
      },
      {
        label: 'sidebar.myCompany',
        routerLink: '/my-company',
        icon: 'rocket_launch',
        iconClass: 'outlined-icon text-3xl',
        liClass: '',
        toggle: 'empyty'
      },
      {
        label: 'sidebar.resume',
        routerLink: '/resume',
        icon: 'rewarded_ads',
        iconClass: 'outlined-icon text-3xl',
        liClass: '',
        toggle: 'empyty'
      },
      {
        label: 'sidebar.notifications',
        routerLink: '/notification',
        icon: 'notifications',
        iconClass: 'outlined-icon text-3xl',
        liClass: '',
        toggle: 'empyty'
      }
    ];

    this.extraLinks = [
      {
        label: 'sidebar.more',
        icon: 'more_horiz',
        iconClass: 'outlined-icon text-3xl',
        liClass: 'cursor-pointer',
        activeKey: 'plus-preferences',
        toggle: 'plus-preferences'
      }
    ];
  }
}
