import { environment } from "@env/environment";
const { ROUTES } = environment;

export const rootRouterLink = `/${ROUTES.ROOT}`;
export const panelSignInRouterLink = `/${ROUTES.AUTH.ROOT}/${ROUTES.AUTH.PANEL_SIGN_IN}`;
export const panelSignUpRouterLink = `/${ROUTES.AUTH.ROOT}/${ROUTES.AUTH.PANEL_SIGN_UP}`;
export const signUpRouterLink = `/${ROUTES.AUTH.ROOT}/${ROUTES.AUTH.SIGN_UP}`;
export const signInRouterLink = `/${ROUTES.AUTH.ROOT}/${ROUTES.AUTH.SIGN_IN}`;
export const confirmSignUpRouterLink = `/${ROUTES.AUTH.ROOT}/${ROUTES.AUTH.CONFIRM_EMAIL}`;
export const resetPasswordRouterLink = `/${ROUTES.AUTH.ROOT}/${ROUTES.AUTH.RESET_PASSWORD}`;