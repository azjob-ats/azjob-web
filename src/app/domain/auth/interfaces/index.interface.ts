import { eIndex, eProvider, eRole } from '../enums/index.enum';

export interface iIndex {
  index: eIndex;
}

export interface UserRegisterWithEmailAndPassword {
  email: string;
  password: string;
  name: string;
  providers: eProvider
  role: eRole,
  timeZone: string
}

export interface CreateUserGoogleProvider {
  uid: string
  name: string
  email: string
  password: string
  providers: eProvider
}

export interface UserToken {
  access_token: string
  refresh_token: RefreshToken
}

export interface RefreshToken {
  token: string
  expires_in: string
  timestamp: string
  user_id: number
}