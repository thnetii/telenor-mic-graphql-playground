import { AppNavBarActionCreators } from '../actions/AppNavBar';

export interface AppNavBarState {
  isOpen: boolean;
}

export const initialState: AppNavBarState = {
  isOpen: false
};

export type AppNavBarProps = AppNavBarState & typeof AppNavBarActionCreators;
