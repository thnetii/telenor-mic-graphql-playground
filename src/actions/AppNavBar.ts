import { Action, ActionCreator } from 'redux';
import * as Constants from '../constants/AppNavBar';
import { AppNavBarAnyActionType } from '../constants/AppNavBar';

export interface AppNavBarAction<T extends AppNavBarAnyActionType> extends Action {
  type: T;
}

export type AppNavBarToggleAction = AppNavBarAction<Constants.TOGGLE_NAVBAR>;

export type AppNavBarAnyAction = (
  AppNavBarToggleAction
);

const onToggle: ActionCreator<AppNavBarToggleAction> = () => ({
  type: Constants.TOGGLE_NAVBAR
});

export const AppNavBarActionCreators = {
  onToggle
}
