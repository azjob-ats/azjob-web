import { CommonModule } from '@angular/common';
import { Component, inject, type OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IndexService as AuthService } from '@domain/auth/services/index.service';
import { LanguageTranslatorService } from '@domain/change-language/services/language-translator.service';
import { LanguageService } from '@domain/change-language/services/language.service';
import { environment } from '@env/environment';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { InputSearchComponent } from '@widget/components/input-search/input-search.component';
import { LanguageToggleComponent } from '@widget/components/language-toggle/language-toggle.component';
import { LightDarkToggleComponent } from '@widget/components/light-dark-toggle/light-dark-toggle.component';
import { SideNavigationMenuComponent } from '@widget/components/SideNavigationMenu/component/SideNavigationMenu.component';
import {
  ISidebarBanner,
  ISidebarExtraLinks,
  ISidebarLinks,
  ISidebarSearch,
  ISideNavigationMenu,
  ISidevarLogo,
} from '../../interfaces';
import { Subject, takeUntil } from 'rxjs';
const { ROUTES } = environment;

@Component({
  selector: 'app-side-navigation-menu-main-container',
  imports: [
    SideNavigationMenuComponent,
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [LanguageTranslatorService, TranslateService],
  templateUrl: './side-navigation-menu-main-container.component.html',
  styleUrl: './side-navigation-menu-main-container.component.scss',
})
export class SideNavigationMenuMainContainerComponent implements OnInit {
  private translationService: LanguageTranslatorService = inject(LanguageTranslatorService);
  private translate: TranslateService = inject(TranslateService);
  private lang: LanguageService = inject(LanguageService);
  public auth: AuthService = inject(AuthService);

  public steep: ISideNavigationMenu[] = [];
  public search!: ISidebarSearch;
  public banner!: ISidebarBanner;
  public sidebarLinks: ISidebarLinks[] = [];
  public extraLinks: ISidebarExtraLinks[] = [];
  public sidebarLogo!: ISidevarLogo;
  public isLogged: boolean = false;
  private destroy$ = new Subject<void>();
  public currentUser = {
    username: '',
    name: '',
    avatar: '',
  };

  public ngOnInit(): void {
    this.languageChanged();
    this.startTranslation();

    this.auth
      .getCurrentUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        if (!res) {
          return;
        }

        this.currentUser.username = res.username;
        this.currentUser.name = res.name;
        this.currentUser.avatar = res.avatar;
        this.setDate();
      });
  }

  private languageChanged() {
    this.lang
      .getStreamOnLanguage()
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => {
        this.translate.setDefaultLang(lang.prefix);
        this.setDate();
      });
  }

  private startTranslation() {
    this.translate
      .get('app')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.setDate();
      });
  }

  private setDate() {
    this.auth
      .isLogged()
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        if (res) {
          this.setDateIsLogged();
        } else {
          this.setDateIsNotLogged();
        }
      });
  }

  private setDateIsNotLogged() {
    this.steep = [
      {
        name: 'sidebar.more',
        key: 'plus-preferences',
        component: null,
        text: null,
        routerLink: null,
        section: [
          {
            name: 'sidebar.MORE.settings.title',
            description: 'sidebar.MORE.settings.description',
            routerLink: null,
            component: null,
            text: null,
            menu: [
              {
                icon: 'brightness_4',
                name: 'sidebar.MORE.settings.darkMode',
                description: 'sidebar.MORE.settings.darkModeDesc',
                routerLink: null,
                component: LightDarkToggleComponent,
                text: null,
              },
              {
                icon: 'translate',
                name: 'sidebar.MORE.settings.language',
                description: 'sidebar.MORE.settings.languageDesc',
                routerLink: null,
                component: LanguageToggleComponent,
                text: null,
              },
            ],
          },
          {
            name: 'sidebar.MORE.help.title',
            description: 'sidebar.MORE.help.description',
            routerLink: null,
            text: null,
            component: null,
            menu: [
              {
                icon: 'comment',
                name: 'sidebar.MORE.help.feedback',
                description: 'sidebar.MORE.help.feedbackDesc',
                routerLink: null,
                component: null,
                text: 'Sorry, this is not available yet',
              },
              {
                icon: 'contact_support',
                name: 'sidebar.MORE.help.supportCenter',
                description: 'sidebar.MORE.help.supportCenterDesc',
                routerLink: null,
                component: null,
                text: 'Sorry, this is not available yet',
              },
              {
                icon: 'support_agent',
                name: 'sidebar.MORE.help.contactSupport',
                description: 'sidebar.MORE.help.contactSupportDesc',
                routerLink: null,
                component: null,
                text: 'Sorry, this is not available yet',
              },
              {
                icon: 'contract',
                name: 'sidebar.MORE.help.terms',
                description: 'sidebar.MORE.help.termsDesc',
                routerLink: null,
                component: null,
                text: 'Sorry, this is not available yet',
              },
              {
                icon: 'sdk',
                name: 'sidebar.MORE.help.aboutApp',
                description: 'sidebar.MORE.help.aboutAppDesc',
                routerLink: {
                  label: 'sidebar.MORE.help.aboutApp',
                  link: `/${environment.ROUTES.SHOWCASE.ROOT}`,
                  target: undefined,
                  closeMenu: true,
                },
                component: null,
                text: null,
              },
              {
                icon: 'sentiment_satisfied',
                name: 'sidebar.MORE.help.aboutAzjob',
                description: 'sidebar.MORE.help.aboutAzjobDesc',
                routerLink: null,
                component: null,
                text: null,
              },
            ],
          },
        ],
      },
      {
        name: 'sidebar.search.title',
        key: 'search',
        component: InputSearchComponent,
        section: null,
        text: null,
        routerLink: null,
      },
    ];

    this.search = {
      value: '',
      placeholder: 'sidebar.search.placeholder',
    };

    this.banner = {
      nameId: '',
      nameUser: '',
      avatar: '',
      alt: '',
      show: false,
      menu: [],
    };

    this.sidebarLinks = [
      {
        label: 'sidebar.login',
        routerLink: `/${environment.ROUTES.AUTH.ROOT}`,
        icon: 'lock',
        iconClass: 'rounded-icon',
        liClass: 'bg-login-sidebar',
        toggle: 'empyty',
        active: false,
      },
      {
        label: 'sidebar.forYou',
        routerLink: environment.ROUTES.FOR_YOU.ROOT,
        icon: 'home',
        iconClass: 'rounded-icon text-3xl',
        liClass: '',
        toggle: 'empyty',
        active: true,
      },
    ];

    this.extraLinks = [
      {
        label: 'sidebar.more',
        icon: 'more_horiz',
        iconClass: 'outlined-icon text-3xl',
        liClass: 'cursor-pointer',
        activeKey: 'plus-preferences',
        toggle: 'plus-preferences',
      },
    ];

    this.sidebarLogo = {
      routerLink: environment.ROUTES.FOR_YOU.ROOT,
    };
  }

  private setDateIsLogged() {
    this.steep = [
      {
        name: 'sidebar.more',
        key: 'plus-preferences',
        component: null,
        text: null,
        routerLink: null,
        section: [
          {
            name: 'sidebar.MORE.settings.title',
            description: 'sidebar.MORE.settings.description',
            routerLink: null,
            component: null,
            text: null,
            menu: [
              {
                icon: 'account_circle',
                name: 'sidebar.MORE.settings.accountInfo',
                description: 'sidebar.MORE.settings.accountInfoDesc',
                routerLink: null,
                component: null,
                text: 'Sorry, this is not available yet',
              },
              {
                icon: 'brightness_4',
                name: 'sidebar.MORE.settings.darkMode',
                description: 'sidebar.MORE.settings.darkModeDesc',
                routerLink: null,
                component: LightDarkToggleComponent,
                text: null,
              },
              {
                icon: 'translate',
                name: 'sidebar.MORE.settings.language',
                description: 'sidebar.MORE.settings.languageDesc',
                routerLink: null,
                component: LanguageToggleComponent,
                text: null,
              },
              {
                icon: 'lock',
                name: 'sidebar.MORE.settings.changePassword',
                description: 'sidebar.MORE.settings.changePasswordDesc',
                routerLink: null,
                component: null,
                text: 'Sorry, this is not available yet',
              },
            ],
          },
          {
            name: 'sidebar.MORE.security.title',
            description: 'sidebar.MORE.security.description',
            routerLink: null,
            component: null,
            text: null,
            menu: [
              {
                icon: 'notification_settings',
                name: 'sidebar.MORE.security.notifications',
                description: 'sidebar.MORE.security.notificationsDesc',
                routerLink: null,
                component: null,
                text: 'Sorry, this is not available yet',
              },
              {
                icon: 'laptop_chromebook',
                name: 'sidebar.MORE.security.devices',
                description: 'sidebar.MORE.security.devicesDesc',
                routerLink: null,
                component: null,
                text: 'Sorry, this is not available yet',
              },
              {
                icon: 'do_not_disturb_on',
                name: 'sidebar.MORE.security.endSessions',
                description: 'sidebar.MORE.security.endSessionsDesc',
                routerLink: null,
                component: null,
                text: 'Sorry, this is not available yet',
              },
              {
                icon: 'shield',
                name: 'sidebar.MORE.security.consent',
                description: 'sidebar.MORE.security.consentDesc',
                routerLink: null,
                component: null,
                text: 'Sorry, this is not available yet',
              },
              {
                icon: 'gpp_bad',
                name: 'sidebar.MORE.security.deactivate',
                description: 'sidebar.MORE.security.deactivateDesc',
                routerLink: null,
                component: null,
                text: 'Sorry, this is not available yet',
              },
              {
                icon: 'download',
                name: 'sidebar.MORE.security.downloadData',
                description: 'sidebar.MORE.security.downloadDataDesc',
                routerLink: null,
                component: null,
                text: 'Sorry, this is not available yet',
              },
              {
                icon: 'multimodal_hand_eye',
                name: 'sidebar.MORE.security.visibility',
                description: 'sidebar.MORE.security.visibilityDesc',
                routerLink: null,
                component: null,
                text: 'Sorry, this is not available yet',
              },
              {
                icon: 'history',
                name: 'sidebar.MORE.security.clearHistory',
                description: 'sidebar.MORE.security.clearHistoryDesc',
                routerLink: null,
                component: null,
                text: 'Sorry, this is not available yet',
              },
              {
                icon: 'delete',
                name: 'sidebar.MORE.security.deleteAccount',
                description: 'sidebar.MORE.security.deleteAccountDesc',
                routerLink: null,
                component: null,
                text: 'Sorry, this is not available yet',
              },
            ],
          },
          {
            name: 'sidebar.MORE.help.title',
            description: 'sidebar.MORE.help.description',
            routerLink: null,
            text: null,
            component: null,
            menu: [
              {
                icon: 'comment',
                name: 'sidebar.MORE.help.feedback',
                description: 'sidebar.MORE.help.feedbackDesc',
                routerLink: null,
                component: null,
                text: 'Sorry, this is not available yet',
              },
              {
                icon: 'contact_support',
                name: 'sidebar.MORE.help.supportCenter',
                description: 'sidebar.MORE.help.supportCenterDesc',
                routerLink: null,
                component: null,
                text: 'Sorry, this is not available yet',
              },
              {
                icon: 'support_agent',
                name: 'sidebar.MORE.help.contactSupport',
                description: 'sidebar.MORE.help.contactSupportDesc',
                routerLink: null,
                component: null,
                text: 'Sorry, this is not available yet',
              },
              {
                icon: 'contract',
                name: 'sidebar.MORE.help.terms',
                description: 'sidebar.MORE.help.termsDesc',
                routerLink: null,
                component: null,
                text: 'Sorry, this is not available yet',
              },
              {
                icon: 'sdk',
                name: 'sidebar.MORE.help.aboutApp',
                description: 'sidebar.MORE.help.aboutAppDesc',
                routerLink: {
                  label: 'sidebar.MORE.help.aboutApp',
                  link: `/${environment.ROUTES.SHOWCASE.ROOT}`,
                  target: undefined,
                  closeMenu: true,
                },
                component: null,
                text: null,
              },
              {
                icon: 'sentiment_satisfied',
                name: 'sidebar.MORE.help.aboutAzjob',
                description: 'sidebar.MORE.help.aboutAzjobDesc',
                routerLink: null,
                component: null,
                text: null,
              },
            ],
          },
          {
            name: 'sidebar.MORE.logout.title',
            description: 'sidebar.MORE.logout.description',
            routerLink: {
              label: this.translate.instant('sidebar.banner.logout', {
                nameId: `@${this.currentUser.username}`,
              }),
              link: `/${ROUTES.AUTH.ROOT}/${ROUTES.AUTH.LOGOUT}`,
              target: '',
              closeMenu: false,
            },
            component: null,
            menu: null,
            text: null,
          },
        ],
      },
      {
        name: 'sidebar.search.title',
        key: 'search',
        component: InputSearchComponent,
        section: null,
        text: null,
        routerLink: null,
      },
    ];

    this.search = {
      value: '',
      placeholder: 'sidebar.search.placeholder',
    };

    this.banner = {
      nameId: `@${this.currentUser.username}`,
      nameUser: `${this.currentUser.name}`,
      avatar: this.currentUser.avatar,
      alt: 'sidebar.banner.alt',
      show: true,
      menu: [
        {
          icon: '',
          name: this.translate.instant('sidebar.banner.accountInfo'),
          description: '',
          routerLink: {
            label: '',
            link: '/user/info',
            target: '',
            closeMenu: true,
          },
          component: null,
          text: null,
        },
        {
          icon: '',
          name: this.translate.instant('sidebar.banner.logout', {
            nameId: `@${this.currentUser.username}`,
          }),
          description: '',
          routerLink: {
            label: '',
            link: `/${ROUTES.AUTH.ROOT}/${ROUTES.AUTH.LOGOUT}`,
            target: '',
            closeMenu: true,
          },
          component: null,
          text: null,
        },
      ],
    };

    this.sidebarLinks = [
      {
        label: 'sidebar.forYou',
        routerLink: environment.ROUTES.FOR_YOU.ROOT,
        icon: 'home',
        iconClass: 'rounded-icon text-3xl',
        liClass: '',
        toggle: 'empyty',
        active: true,
      },
      {
        label: 'sidebar.applications',
        routerLink: environment.ROUTES.APPLICATION.ROOT,
        icon: 'radio_button_checked',
        iconClass: 'outlined-icon text-3xl',
        liClass: 'cursor-pointer',
        toggle: 'empyty',
        active: true,
      },
      {
        label: 'sidebar.myCompany',
        routerLink: environment.ROUTES.MY_COMPANY.ROOT,
        icon: 'rocket_launch',
        iconClass: 'outlined-icon text-3xl',
        liClass: '',
        toggle: 'empyty',
        active: true,
      },
      {
        label: 'sidebar.resume',
        routerLink: environment.ROUTES.RESUME.ROOT,
        icon: 'rewarded_ads',
        iconClass: 'outlined-icon text-3xl',
        liClass: '',
        toggle: 'empyty',
        active: true,
      },
      {
        label: 'sidebar.notifications',
        routerLink: environment.ROUTES.NOTIFICATION.ROOT,
        icon: 'notifications',
        iconClass: 'outlined-icon text-3xl',
        liClass: '',
        toggle: 'empyty',
        active: true,
      },
    ];

    this.extraLinks = [
      {
        label: 'sidebar.more',
        icon: 'more_horiz',
        iconClass: 'outlined-icon text-3xl',
        liClass: 'cursor-pointer',
        activeKey: 'plus-preferences',
        toggle: 'plus-preferences',
      },
    ];

    this.sidebarLogo = {
      routerLink: environment.ROUTES.FOR_YOU.ROOT,
    };
  }

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
