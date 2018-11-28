import { counterActions } from '../actions/counter.actions';

export interface CounterState {
  count: number;
}

export const initialState: CounterState = {
  count: 0
};
 export type CounterProps = CounterState & typeof counterActions;
