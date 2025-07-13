import { eIndex, eProvider, eRole } from '../enums/index.enum';

export interface iIndex {
  index: eIndex;
}

export interface UserRegisterWithEmailAndPassword {
  email: string;
  password: string;
  name: string;
  providers: eProvider;
  role: eRole;
  timeZone: string;
}

export interface CreateUserGoogleProvider {
  uid: string;
  name: string;
  email: string;
  password: string;
  providers: eProvider;
}

export interface UserToken {
  accessToken: string;
  refreshToken: RefreshToken;
}

export interface PayloadToken {
  token: string;
  expiresIn: string;
}

export interface RefreshToken {
  token: string;
  expiresIn: string;
  timestamp: string;
  userId: number;
}

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  lastname: string;
  username: string;
  phone: string;
  birthdate: string | null;
  gender: string | null;
  address: string | null;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  avatar: string;
  bio: string | null;
  role: eRole;
  providers: eProvider;
  timeZone: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  isActive: boolean;
  isAdmin: boolean;
  isVerified: boolean;
  isBlocked: boolean;
  isDeleted: boolean;
  isLoggedIn: boolean;
}
