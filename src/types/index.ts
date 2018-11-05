import { ConnectedRouterProps, RouterState, RouterAction } from 'connected-react-router';

import { CounterState } from './Counter';
import { CounterAnyAction } from '../actions/Counter';

export interface AppProps {
  'route-name': string;
};

export interface GlobalAppState {
  counter: CounterState;
}

export interface GlobalState extends GlobalAppState {
  router: ConnectedRouterProps & RouterState;
}

export type GlobalAppAction = (
  CounterAnyAction
);

export type GlobalAction = GlobalAppAction | RouterAction;
