import { Reducer } from 'redux';
import { CounterAction } from '../actions/Counter';
import { CounterState, initialState } from '../types/Counter';
import { INCREMENT_COUNTER, DECREMENT_COUNTER, RESET_COUNTER } from '../constants/Counter';

export const counterReducer: Reducer<CounterState, CounterAction> =
  (state: CounterState = initialState, action: CounterAction): CounterState => {
    switch (action.type) {
      case INCREMENT_COUNTER:
        return { ...state, count: state.count + 1 };
      case DECREMENT_COUNTER:
        return { ...state, count: state.count - 1 };
      case RESET_COUNTER:
        return { ...state, count: initialState.count };
      default:
        return state;
    }
  };
