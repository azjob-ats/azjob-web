import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output, type OnInit } from '@angular/core';
import { SideFeedbakHelpComponent } from '../../component/side-feedbak-help/side-feedbak-help.component';
import { InputSearchComponent } from '@widget/components/input-search/input-search.component';
import { ISideNavigationMenu } from '../../interfaces';
import { LanguageService } from '@domain/change-language/services/language.service';
import { LanguageTranslatorService } from '@domain/change-language/services/language-translator.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { LanguageToggleComponent } from '@widget/components/language-toggle/language-toggle.component';
import { LightDarkToggleComponent } from '@widget/components/light-dark-toggle/light-dark-toggle.component';
import { environment } from '@env/environment';

@Component({
  selector: 'app-side-feedbak-help-container',
  imports: [SideFeedbakHelpComponent],
  templateUrl: './side-feedbak-help-container.component.html',
  styleUrl: './side-feedbak-help-container.component.scss'
})
export class SideFeedbakHelpContainerComponent implements OnInit {
  private translationService: LanguageTranslatorService = inject(LanguageTranslatorService);
  private translate: TranslateService = inject(TranslateService);
  private lang: LanguageService = inject(LanguageService);
  public steep: ISideNavigationMenu[] = [];
  @Output() public onClose = new EventEmitter<boolean>();
  public constructor(private router: Router) { }

  close($event: any) {
    this.onClose.emit(true);
  }

  ngOnInit(): void {

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
                  target: '_blank',
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
              label: this.translate.instant('sidebar.banner.logout', { nameId: '@mcchelsom98268' }),
              link: '/logout',
              target: '_blank',
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
  }
}
