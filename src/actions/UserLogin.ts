import { Dispatch } from 'redux';
import { FluxStandardAction, ErrorFluxStandardAction } from '../types/FluxStandardAction';

import { GlobalState } from '../types';
import { MicAuthLoginRequest, MicAuthLoginResponse, MicErrorMessage } from '../types/MicApi';
import { UserLoginAnyActionType, USERLOGIN_FORM_ONSUBMIT_EVENT, USERLOGIN_SUBMIT_FAILED, USERLOGIN_FETCH_LOGIN, USERLOGIN_RECEIVE_LOGIN, USERLOGIN_SUBMIT_SUCCEEDED, USERLOGIN_USERNAME_ONBLUR_EVENT, USERLOGIN_PASSWORD_ONBLUR_EVENT } from '../constants/UserLogin';
import { AssertionError } from 'assert';

export type UserLoginBaseAction<
  Type extends UserLoginAnyActionType,
  Payload = undefined,
  Meta = undefined
  > = FluxStandardAction<Type, Payload, Meta>;

export type UserLoginOnSubmitAction = UserLoginBaseAction<USERLOGIN_FORM_ONSUBMIT_EVENT, undefined, MicAuthLoginRequest>;

export type UserLoginUsernameOnBlurAction = UserLoginBaseAction<USERLOGIN_USERNAME_ONBLUR_EVENT, string, React.FocusEvent<HTMLInputElement>>;
export type UserLoginPasswordOnBlurAction = UserLoginBaseAction<USERLOGIN_PASSWORD_ONBLUR_EVENT, string, React.FocusEvent<HTMLInputElement>>;

export type UserLoginFetchLoginAction = UserLoginBaseAction<USERLOGIN_FETCH_LOGIN, undefined, { url: RequestInfo } & RequestInit>;
export type UserLoginReceiveLoginAction = UserLoginBaseAction<USERLOGIN_RECEIVE_LOGIN, undefined, { response: Response; body: any }>;

export type UserLoginSubmitSucceeded = UserLoginBaseAction<USERLOGIN_SUBMIT_SUCCEEDED, MicAuthLoginResponse>;
export type UserLoginSubmitFailedAction = ErrorFluxStandardAction<USERLOGIN_SUBMIT_FAILED, Error>;

export type UserLoginAnyAction = (
  UserLoginOnSubmitAction |
  UserLoginUsernameOnBlurAction |
  UserLoginPasswordOnBlurAction |
  UserLoginFetchLoginAction |
  UserLoginReceiveLoginAction |
  UserLoginSubmitSucceeded |
  UserLoginSubmitFailedAction
);

const usernameOnBlur = (event: React.FocusEvent<HTMLInputElement>): UserLoginUsernameOnBlurAction => ({
  type: USERLOGIN_USERNAME_ONBLUR_EVENT,
  payload: event.target.value,
  meta: event
});

const passwordOnBlur = (event: React.FocusEvent<HTMLInputElement>): UserLoginPasswordOnBlurAction => ({
  type: USERLOGIN_PASSWORD_ONBLUR_EVENT,
  payload: event.target.value,
  meta: event
});

const onSubmit = () => {
  return async (dispatch: Dispatch<UserLoginAnyAction>, getGlobalState: () => GlobalState) => {
    const state = getGlobalState();
    const { requestedUsername, requestedPassword } = state.userLogin;
    const loginRequest: MicAuthLoginRequest = {
      userName: requestedUsername as string,
      password: requestedPassword as string
    };
    dispatch({
      type: USERLOGIN_FORM_ONSUBMIT_EVENT,
      meta: loginRequest
    });
    const { apiRootUrl, apiKey } = state.hostinfo;
    if (typeof apiRootUrl === 'undefined') {
      dispatch({
        type: USERLOGIN_SUBMIT_FAILED,
        payload: new AssertionError({ message: 'typeof apiRootUrl', expected: 'string', actual: 'undefined', operator: 'typeof' }),
        error: true
      });
      return;
    }
    if (typeof apiKey === 'undefined') {
      dispatch({
        type: USERLOGIN_SUBMIT_FAILED,
        payload: new AssertionError({ message: 'typeof apiKey', expected: 'string', actual: 'undefined', operator: 'typeof' }),
        error: true
      });
      return;
    }
    const loginUrl = `${apiRootUrl}/auth/login`;
    const loginParams = {
      method: 'post',
      headers: {
        'x-api-key': apiKey,
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(loginRequest)
    };
    try {
      dispatch({
        type: USERLOGIN_FETCH_LOGIN,
        meta: {
          url: loginUrl,
          ...loginParams
        }
      });
      const responseFetch = await fetch(loginUrl, loginParams);
      const responseRaw = await responseFetch.json() as any;
      dispatch({
        type: USERLOGIN_RECEIVE_LOGIN,
        meta: { response: responseFetch, body: responseRaw }
      });
      if (typeof responseRaw.message !== 'undefined') {
        throw responseRaw.message as MicErrorMessage;
      }
      const responseLogin = responseRaw as MicAuthLoginResponse;
      dispatch({
        type: USERLOGIN_SUBMIT_SUCCEEDED,
        payload: responseLogin
      });
    }
    catch (error) {
      dispatch({
        type: USERLOGIN_SUBMIT_FAILED,
        payload: error,
        error: true
      });
      return;
    }
  };
}

export const UserLoginActionCreators = {
  usernameOnBlur,
  passwordOnBlur,
  onSubmit
};
