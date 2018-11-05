import { Action } from 'redux';
import * as constants from '../constants/Counter';
import { CounterAnyActionType } from '../constants/Counter';

export interface CounterAction<T extends CounterAnyActionType> extends Action {
  type: T;
}
export type IncrementCounterAction = CounterAction<constants.INCREMENT_COUNTER>;
export type DecrementCounterAction = CounterAction<constants.DECREMENT_COUNTER>;
export type ResetCounterAction = CounterAction<constants.RESET_COUNTER>;

export type CounterAnyAction = (
  IncrementCounterAction |
  DecrementCounterAction |
  ResetCounterAction
);

function onIncrement(): IncrementCounterAction {
  return { type: constants.INCREMENT_COUNTER };
}

function onDecrement(): DecrementCounterAction {
  return { type: constants.DECREMENT_COUNTER };
}

function onReset(): ResetCounterAction {
  return { type: constants.RESET_COUNTER };
}

export const CounterActionCreators = {
  onIncrement,
  onDecrement,
  onReset
};

export type CounterActionCreatorMap = typeof CounterActionCreators;
