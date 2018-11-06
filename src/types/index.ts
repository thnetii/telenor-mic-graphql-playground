import { ConnectedRouterProps, RouterState, RouterAction } from 'connected-react-router';

import { CounterState } from './Counter';
import { CounterAnyAction } from '../actions/Counter';
import { AppNavBarState } from './AppNavBar';
import { AppNavBarAnyAction } from '../actions/AppNavBar';

export interface AppProps {
  'route-name': string;
};

export interface GlobalAppState {
  counter: CounterState;
  appNavBar: AppNavBarState;
}

export interface GlobalState extends GlobalAppState {
  router: ConnectedRouterProps & RouterState;
}

export type GlobalAppAction = (
  CounterAnyAction |
  AppNavBarAnyAction
);

export type GlobalAction = GlobalAppAction | RouterAction;
