import { ConnectedRouterProps, RouterState, RouterAction } from 'connected-react-router';

import { CounterState } from './Counter';
import { CounterAnyAction } from '../actions/Counter';
import { AppNavBarState } from './AppNavBar';
import { AppNavBarAnyAction } from '../actions/AppNavBar';
import { MicHostinfoState } from './MicHostinfo';
import { MicHostinfoAnyAction } from 'src/actions/MicHostinfo';

export interface GlobalAppState {
  counter: CounterState;
  appNavBar: AppNavBarState;
  hostinfo: MicHostinfoState;
}

export interface GlobalState extends GlobalAppState {
  router: ConnectedRouterProps & RouterState;
}

export type GlobalAppAction = (
  CounterAnyAction |
  AppNavBarAnyAction |
  MicHostinfoAnyAction
);

export type GlobalAction = GlobalAppAction | RouterAction;
