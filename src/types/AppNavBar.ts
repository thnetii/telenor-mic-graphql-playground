import { RouterState, ConnectedRouterProps } from 'connected-react-router';
import { AppNavBarActionCreators } from '../actions/AppNavBar';

export interface AppNavBarState {
  isOpen: boolean;
}

export const initialState: AppNavBarState = {
  isOpen: false
};

export type AppNavBarRouterState = AppNavBarState & ConnectedRouterProps & RouterState;

export type AppNavBarProps = AppNavBarRouterState & typeof AppNavBarActionCreators;
