import { Reducer } from 'redux';
import { UserLoginState, initialState } from '../types/UserLogin';
import { UserLoginAnyAction } from '../actions/UserLogin';
import { USERLOGIN_USERNAME_ONBLUR_EVENT, USERLOGIN_PASSWORD_ONBLUR_EVENT } from 'src/constants/UserLogin';

export const UserLoginReducer: Reducer<UserLoginState, UserLoginAnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case USERLOGIN_USERNAME_ONBLUR_EVENT:
      return !action.payload ? state : {
        ...state,
        requestedUsername: action.payload
      };
    case USERLOGIN_PASSWORD_ONBLUR_EVENT:
      return !action.payload ? state : {
        ...state,
        requestedPassword: action.payload
      };
    default:
      return state;
  }
};
