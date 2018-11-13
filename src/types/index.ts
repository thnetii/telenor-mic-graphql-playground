import { RouterState } from 'connected-react-router';

import { CounterState } from './counter.types';
import { MicApiState } from './micapi.types';
import { MicStackState } from './micstack.types';

export interface GlobalState {
  counter: CounterState;
  micapi: MicApiState,
  micstack: MicStackState
  router: RouterState;
}
