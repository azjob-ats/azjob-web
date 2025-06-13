interface IRouterLink {
    label: string;
    link: string;
    target?: string;
    closeMenu?: boolean;
}

interface IMenu {
    icon: string;
    name: string;
    description: string;
    routerLink: IRouterLink | null;
    component: any | null;
    text: string | null;
}

interface ISection {
    name: string;
    description: string;
    routerLink: IRouterLink | null;
    component: any | null;
    text: string | null;
    menu: IMenu[] | null;
}

export interface ISideNavigationMenu {
    name: string;
    key: string;
    component: any | null;
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
    show: boolean,
    menu: IMenu[]
}