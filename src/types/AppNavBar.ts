import { AppNavBarActionCreators } from '../actions/AppNavBar';
import { RouterState, ConnectedRouterProps } from 'connected-react-router';

export interface AppNavBarState {
  isOpen: boolean;
}

export const initialState: AppNavBarState = {
  isOpen: false
};

export type AppNavBarRouterState = AppNavBarState & ConnectedRouterProps & RouterState;

export type AppNavBarProps = AppNavBarState & typeof AppNavBarActionCreators & ConnectedRouterProps & RouterState;
