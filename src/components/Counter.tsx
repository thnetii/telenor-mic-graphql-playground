import * as React from 'react';
import { Grid, ButtonGroup, Button } from 'react-bootstrap';
import AppPageHeader from './AppPageHeader';
import { CounterProps } from 'src/types/Counter';

const Counter = ({ count, onIncrement, onReset, onDecrement }: CounterProps) =>
  <div>
    <AppPageHeader />
    <Grid className={'text-center'}>
      <h2>Counter</h2>
      <p>This is an example counter component using React, Redux and TypeScript.</p>
      <p>Current Count: <strong>{count}</strong></p>
      <ButtonGroup>
        <Button onClick={onIncrement}>Increment</Button>
        <Button onClick={onReset}>Reset</Button>
        <Button onClick={onDecrement}>Decrement</Button>
      </ButtonGroup>
    </Grid>
  </div>;

export default Counter;
