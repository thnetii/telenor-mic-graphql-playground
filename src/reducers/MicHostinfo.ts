import { Reducer } from 'redux';
import { MicHostinfoAnyAction } from '../actions/MicHostinfo';
import { REQUEST_HOSTNAME_CHANGE } from '../constants/MicHostinfo';
import { MicHostinfoState, initialState } from '../types/MicHostinfo';

export const MicHostinfoReducer: Reducer<MicHostinfoState, MicHostinfoAnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_HOSTNAME_CHANGE:
    default:
      return state;
  }
};
