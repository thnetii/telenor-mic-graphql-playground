import * as React from 'react';

import { FSAAuto } from '../helpers/flux-standard-action';
import {
  COUNTER_ADD,
  COUNTER_RESET,
} from '../constants/counter.constants';

export type CounterAddAction = FSAAuto<number, undefined, COUNTER_ADD>;
export type CounterResetAction = FSAAuto<undefined, undefined, COUNTER_RESET>;

export type CounterAnyAction = (
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

export const counterActions = {
  onClick,
  reset
};
