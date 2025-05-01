import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { customPreset } from './custom.preset';
import { FilterMatchMode } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: customPreset,
        options: {
          prefix: 'p',
          darkModeSelector: '.my-app-dark',
          cssLayer: false,
        },
      },
      zIndex: {
        modal: 1100, // dialog, sidebar
        overlay: 1000, // dropdown, overlaypanel
        menu: 1000, // overlay menus
        tooltip: 1100, // tooltip
      },
      filterMatchModeOptions: {
        text: [
          FilterMatchMode.STARTS_WITH,
          FilterMatchMode.CONTAINS,
          FilterMatchMode.NOT_CONTAINS,
          FilterMatchMode.ENDS_WITH,
          FilterMatchMode.EQUALS,
          FilterMatchMode.NOT_EQUALS,
        ],
        numeric: [
          FilterMatchMode.EQUALS,
          FilterMatchMode.NOT_EQUALS,
          FilterMatchMode.LESS_THAN,
          FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
          FilterMatchMode.GREATER_THAN,
          FilterMatchMode.GREATER_THAN_OR_EQUAL_TO,
        ],
        date: [
          FilterMatchMode.DATE_IS,
          FilterMatchMode.DATE_IS_NOT,
          FilterMatchMode.DATE_BEFORE,
          FilterMatchMode.DATE_AFTER,
        ],
      },
      translation: {
        accept: 'Aceptar',
        reject: 'Rechazar',
        //translations
      },
      inputVariant: 'filled',
      ripple: true, //Ripple é uma animação opcional para os componentes suportados, como botões. Ela está desabilitada por padrão.
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
};
