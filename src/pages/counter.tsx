import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, ButtonGroup, Button } from 'reactstrap';

import { GlobalState } from '../types';
import { CounterState, CounterProps } from '../types/counter.types';

import { CounterAnyAction, counterActions } from '../actions/counter.actions';

import PageHeader from '../components/pageheader';

const CounterPage = ({ count, onClick, reset }: CounterProps) =>
  <div>
    <PageHeader />
    <Container className={'text-center'}>
      <h2>Counter</h2>
      <p>This is an example counter component using React, Redux and TypeScript.</p>
      <p>Current Count: <strong>{count}</strong></p>
      <ButtonGroup>
        <Button onClick={onClick} data-amount="10">+10</Button>
        <Button onClick={onClick} data-amount="1">Increment</Button>
        <Button onClick={reset}>Reset</Button>
        <Button onClick={onClick} data-amount="-1">Decrement</Button>
        <Button onClick={onClick} data-amount="-10">-10</Button>
      </ButtonGroup>
    </Container>
  </div>;

export default connect(
  (state: GlobalState): CounterState => state.counter,
  (dispatch: Dispatch<CounterAnyAction>) => bindActionCreators(counterActions, dispatch)
)(CounterPage);
