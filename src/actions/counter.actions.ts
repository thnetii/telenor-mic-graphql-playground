import * as React from 'react';

import { FSAAuto } from '../helpers/flux-standard-action';
import { COUNTER_INCREMENT, COUNTER_DECREMENT, COUNTER_RESET, COUNTER_ADD } from '../constants/counter.constants';

export type CounterIncrementAction = FSAAuto<number, undefined, COUNTER_INCREMENT>;
export type CounterDecrementAction = FSAAuto<number, undefined, COUNTER_DECREMENT>;
export type CounterAddAction = FSAAuto<number, undefined, COUNTER_ADD>;
export type CounterResetAction = FSAAuto<undefined, undefined, COUNTER_RESET>;

export type CounterAnyAction = (
  CounterIncrementAction |
  CounterDecrementAction |
  CounterAddAction |
  CounterResetAction
);

const add = (amount: number): CounterAddAction => ({
  type: COUNTER_ADD,
  payload: amount
});

const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  const amount = parseInt(event.currentTarget.getAttribute('data-amount') || '0', undefined);
  return add(amount);
};

const reset = (): CounterResetAction => ({
  type: COUNTER_RESET
});

export const counterActions = { onClick, reset };
