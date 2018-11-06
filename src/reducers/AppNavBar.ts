import { Reducer } from 'redux';
import { AppNavBarAnyAction } from '../actions/AppNavBar';
import { AppNavBarState, initialState } from '../types/AppNavBar';
import { TOGGLE_NAVBAR } from '../constants/AppNavBar';

export const AppNavBarReducer: Reducer<AppNavBarState, AppNavBarAnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_NAVBAR:
      return { ...state, isOpen: !state.isOpen };
    default:
      return state;
  }
};
