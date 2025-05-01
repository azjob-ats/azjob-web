import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const customPreset = definePreset(Aura, {
  components: {
    megamenu: {
      colorScheme: {
        light: {
          item: {
            color: '{purple.700}',
            focus: {
              background: '{purple.50}',
              color: '{purple.700}',
            },
          },
          dark: {
            item: {
              color: '{purple.700}',
            },
          },
        },
      },
    },
    card: {
      colorScheme: {
        light: {
          root: {
            background: '{surface.0}',
            color: '{surface.700}',
          },
          subtitle: {
            color: '{surface.500}',
          },
        },
        dark: {
          root: {
            background: '{surface.900}',
            color: '{surface.0}',
          },
          subtitle: {
            color: '{surface.400}',
          },
        },
      },
    },
  },
  semantic: {
    primary: {
      50: '{zinc.50}',
      100: '{zinc.100}',
      200: '{zinc.200}',
      300: '{zinc.300}',
      400: '{zinc.400}',
      500: '{zinc.500}',
      600: '{zinc.600}',
      700: '{zinc.700}',
      800: '{zinc.800}',
      900: '{zinc.900}',
      950: '{zinc.950}',
    },
    colorScheme: {
      focusRing: {
        width: '2px',
        style: 'dashed',
        color: '{primary.color}',
        offset: '1px',
      },
      light: {
        primary: {
          color: '{zinc.950}',
          inverseColor: '#ffffff',
          hoverColor: '{zinc.900}',
          activeColor: '{zinc.800}',
        },
        highlight: {
          background: '{zinc.950}',
          focusBackground: '{zinc.700}',
          color: '#ffffff',
          focusColor: '#ffffff',
        },
        formField: {
          hoverBorderColor: '{primary.color}',
        },
      },
      dark: {
        primary: {
          color: '{zinc.50}',
          inverseColor: '{zinc.950}',
          hoverColor: '{zinc.100}',
          activeColor: '{zinc.200}',
        },
        highlight: {
          background: 'rgba(250, 250, 250, .16)',
          focusBackground: 'rgba(250, 250, 250, .24)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)',
        },
        formField: {
          hoverBorderColor: '{primary.color}',
        },
      },
    },
  },
});
