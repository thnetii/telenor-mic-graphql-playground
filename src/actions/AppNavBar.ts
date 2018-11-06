import { ActionCreator } from 'redux';
import { FluxStandardAction } from '../types/FluxStandardAction';
import * as Constants from '../constants/AppNavBar';
import { AppNavBarAnyActionType } from '../constants/AppNavBar';

export type AppNavBarAction<T extends AppNavBarAnyActionType> = FluxStandardAction<T>;
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
