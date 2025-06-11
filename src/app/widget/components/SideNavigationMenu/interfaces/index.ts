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