import { Action, Dispatch } from 'redux';
import * as Constants from '../constants/MicHostinfo';
import { MicHostinfoAnyActionType } from '../constants/MicHostinfo';

export interface MicHostinfoBaseAction<T extends MicHostinfoAnyActionType> extends Action {
  type: T;
}

export interface MicHostinfoRequestHostnameChangeAction extends MicHostinfoBaseAction<Constants.REQUEST_HOSTNAME_CHANGE> {
  payload: {
    hostname: string;
  }
};

export type MicHostinfoAnyAction = (
  MicHostinfoRequestHostnameChangeAction
);

const onRequestHostnameChange = () => {
  return async (dispatch: Dispatch<MicHostinfoAnyAction>) => {
    dispatch({
      type: Constants.REQUEST_HOSTNAME_CHANGE,
      payload: { hostname: '' }
    });
  };
};

export const MicHostinfoActionCreators = {
  onRequestHostnameChange
};
