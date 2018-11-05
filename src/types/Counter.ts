import { CounterActionCreators } from '../actions/Counter';

export interface CounterState {
  count: number;
}

export const initialState: CounterState = {
  count: 0
};

export type CounterProps = CounterState & typeof CounterActionCreators;
