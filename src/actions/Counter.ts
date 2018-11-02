import { Action, ActionCreatorsMapObject } from 'redux';
import * as constants from '../constants/Counter';

export interface IncrementCounterAction extends Action {
  type: constants.INCREMENT_COUNTER;
}

export interface DecrementCounterAction extends Action {
  type: constants.DECREMENT_COUNTER;
}

export interface ResetCounterAction extends Action {
  type: constants.RESET_COUNTER;
}

export type CounterAction = (
  IncrementCounterAction |
  DecrementCounterAction |
  ResetCounterAction
);

export function onIncrement(): IncrementCounterAction {
  return { type: constants.INCREMENT_COUNTER };
}

export function onDecrement(): DecrementCounterAction {
  return { type: constants.DECREMENT_COUNTER };
}

export function onReset(): ResetCounterAction {
  return { type: constants.RESET_COUNTER };
}

export const counterActionCreators: ActionCreatorsMapObject<CounterAction> = {
  onIncrement,
  onDecrement,
  onReset
};
