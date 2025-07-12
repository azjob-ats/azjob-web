import { Type } from '@angular/core';

export interface IRouterLink {
  label: string;
  link: string;
  target?: string;
  closeMenu?: boolean;
}

export interface IMenu {
  icon: string;
  name: string;
  description: string;
  routerLink: IRouterLink | null;
  component: Type<unknown> | null;
  text: string | null;
}

export interface ISection {
  name: string;
  description: string;
  routerLink: IRouterLink | null;
  component: Type<unknown> | null;
  text: string | null;
  menu: IMenu[] | null;
}

export interface ISideNavigationMenu {
  name: string;
  key: string;
  component: Type<unknown> | null;
  text: string | null;
  routerLink: IRouterLink | null;
  section: ISection[] | null;
}

export interface ISidebarSearch {
  value: string;
  placeholder: string;
}

export interface ISidebarLinks {
  label: string;
  routerLink: string;
  icon: string;
  iconClass: string;
  liClass: string;
  toggle: string;
  active: boolean;
}

export interface ISidebarExtraLinks {
  label: string;
  icon: string;
  iconClass: string;
  liClass: string;
  activeKey: string;
  toggle: string;
}

export interface ISidebarBanner {
  nameId: string;
  nameUser: string;
  avatar: string;
  alt: string;
  show: boolean;
  menu: IMenu[];
}

export interface ISidevarLogo {
  routerLink: string;
}
