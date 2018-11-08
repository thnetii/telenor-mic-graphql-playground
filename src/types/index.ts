import { RouterState } from 'connected-react-router';

import { CounterState } from './counter.types';

export interface GlobalState {
  counter: CounterState;
  router: RouterState;
}
