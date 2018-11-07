export const USERLOGIN_USERNAME_ONBLUR_EVENT = 'USERLOGIN_USERNAME_ONBLUR_EVENT';
export type USERLOGIN_USERNAME_ONBLUR_EVENT = typeof USERLOGIN_USERNAME_ONBLUR_EVENT;

export const USERLOGIN_PASSWORD_ONBLUR_EVENT = 'USERLOGIN_PASSWORD_ONBLUR_EVENT';
export type USERLOGIN_PASSWORD_ONBLUR_EVENT = typeof USERLOGIN_PASSWORD_ONBLUR_EVENT;

export const USERLOGIN_FORM_ONSUBMIT_EVENT = 'USERLOGIN_FORM_ONSUBMIT_EVENT';
export type USERLOGIN_FORM_ONSUBMIT_EVENT = typeof USERLOGIN_FORM_ONSUBMIT_EVENT;

export const USERLOGIN_FETCH_LOGIN = 'USERLOGIN_FETCH_LOGIN';
export type USERLOGIN_FETCH_LOGIN = typeof USERLOGIN_FETCH_LOGIN;

export const USERLOGIN_RECEIVE_LOGIN = 'USERLOGIN_RECEIVE_LOGIN';
export type USERLOGIN_RECEIVE_LOGIN = typeof USERLOGIN_RECEIVE_LOGIN;

export const USERLOGIN_SUBMIT_SUCCEEDED = 'USERLOGIN_SUBMIT_SUCCEEDED';
export type USERLOGIN_SUBMIT_SUCCEEDED = typeof USERLOGIN_SUBMIT_SUCCEEDED;

export const USERLOGIN_SUBMIT_FAILED = 'USERLOGIN_SUBMIT_FAILED';
export type USERLOGIN_SUBMIT_FAILED = typeof USERLOGIN_SUBMIT_FAILED;

export type UserLoginAnyActionType = (
  USERLOGIN_USERNAME_ONBLUR_EVENT |
  USERLOGIN_PASSWORD_ONBLUR_EVENT |
  USERLOGIN_FORM_ONSUBMIT_EVENT |
  USERLOGIN_FETCH_LOGIN |
  USERLOGIN_RECEIVE_LOGIN |
  USERLOGIN_SUBMIT_SUCCEEDED |
  USERLOGIN_SUBMIT_FAILED
);
