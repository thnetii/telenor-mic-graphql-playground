import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, ButtonGroup, Button } from 'reactstrap';
import AppPageHeader from './AppPageHeader';

import { GlobalState } from '../types';

import { CounterAnyAction, CounterActionCreators } from '../actions/Counter';
import { CounterProps } from '../types/Counter';

const Counter = ({ count, onIncrement, onReset, onDecrement }: CounterProps) =>
  <div>
    <AppPageHeader />
    <Container className={'text-center'}>
      <h2>Counter</h2>
      <p>This is an example counter component using React, Redux and TypeScript.</p>
      <p>Current Count: <strong>{count}</strong></p>
      <ButtonGroup>
        <Button onClick={onIncrement}>Increment</Button>
        <Button onClick={onReset}>Reset</Button>
        <Button onClick={onDecrement}>Decrement</Button>
      </ButtonGroup>
    </Container>
  </div>;

export default connect(
  (state: GlobalState) => state.counter,
  (dispatch: Dispatch<CounterAnyAction>) => bindActionCreators(CounterActionCreators, dispatch)
)(Counter);

