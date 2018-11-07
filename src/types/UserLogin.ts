import { UserLoginActionCreators } from '../actions/UserLogin';

export interface UserLoginState {
  requestedUsername?: string;
  requestedPassword?: string;
}

export const initialState: UserLoginState = {};

export type UserLoginProps = UserLoginState & typeof UserLoginActionCreators;
